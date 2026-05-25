import { createServerFn } from "@tanstack/react-start";
import * as z from "zod";

/**
 * Quote lead capture — server-only.
 *
 * Behaviour:
 *  1. Validates payload with Zod
 *  2. ALWAYS logs to server console (so leads are never silently dropped)
 *  3. If process.env.RESEND_API_KEY is set → sends 2 emails via Resend:
 *       - confirmation to the lead
 *       - notification to LEAD_NOTIFICATION_EMAIL (or default integra.cc@outlook.com)
 *  4. If process.env.LEAD_WEBHOOK_URL is set → POSTs the lead to that URL
 *       (use for Make / Zapier / n8n / Slack / Discord / your CRM)
 *  5. Stores in in-memory ring (last 100) so the /admin page can display recent leads
 *     during dev. NOT persistent across server restarts — that's by design until you
 *     wire a real datastore (Cloudflare D1 / KV / external CRM).
 *
 * Environment variables (server-only, never prefixed with VITE_):
 *   RESEND_API_KEY              — re_xxx... from resend.com
 *   RESEND_FROM_EMAIL           — e.g. "Integra <devis@integracc.fr>" (must be a verified domain)
 *   LEAD_NOTIFICATION_EMAIL     — where to receive new-lead notifications (default: integra.cc@outlook.com)
 *   LEAD_WEBHOOK_URL            — optional webhook (Make / Zapier / Slack incoming hook)
 */

const quoteSchema = z.object({
  insuranceType: z.string().min(1).max(50),
  profile: z.string().min(1).max(100),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().min(6).max(30),
  email: z.string().email().max(200),
});

export type Lead = z.infer<typeof quoteSchema> & {
  id: string;
  createdAt: string;
};

// ────────────────────────────────────────────────────────────
// In-memory store (ring buffer, last 100)
// ────────────────────────────────────────────────────────────
const MAX_LEADS = 100;
const leadsStore: Lead[] = [];

function pushLead(lead: Lead) {
  leadsStore.unshift(lead);
  if (leadsStore.length > MAX_LEADS) leadsStore.length = MAX_LEADS;
}

// ────────────────────────────────────────────────────────────
// Side effects (best-effort, never throw)
// ────────────────────────────────────────────────────────────

function readEnv(name: string): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  const val = process.env[name];
  return typeof val === "string" && val.length > 0 ? val : undefined;
}

async function sendResendEmails(lead: Lead): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) return { ok: false, reason: "RESEND_API_KEY not set" };

  const from = readEnv("RESEND_FROM_EMAIL") ?? "Integra Assurance <devis@integracc.fr>";
  const to = readEnv("LEAD_NOTIFICATION_EMAIL") ?? "integra.cc@outlook.com";

  const teamEmail = {
    from,
    to: [to],
    reply_to: [lead.email],
    subject: `🆕 Nouveau lead ${lead.insuranceType} — ${lead.firstName} ${lead.lastName}`,
    html: `
      <h2 style="font-family:system-ui,sans-serif;color:#0A2C4A">Nouveau lead reçu</h2>
      <table style="font-family:system-ui,sans-serif;border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Type</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.insuranceType)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Profil</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.profile)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Nom</b></td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Téléphone</b></td><td style="padding:8px;border-bottom:1px solid #eee"><a href="tel:${encodeURIComponent(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${encodeURIComponent(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding:8px"><b>ID</b></td><td style="padding:8px;font-family:monospace;font-size:12px">${escapeHtml(lead.id)}</td></tr>
      </table>
      <p style="font-family:system-ui,sans-serif;color:#5B6470;font-size:13px;margin-top:24px">
        Envoyé via integra-assurance.com — ${new Date(lead.createdAt).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
      </p>
    `,
  };

  const clientEmail = {
    from,
    to: [lead.email],
    subject: "Votre demande de devis Integra Assurance",
    html: `
      <div style="font-family:system-ui,sans-serif;color:#111827;max-width:560px">
        <h2 style="color:#0A2C4A">Bonjour ${escapeHtml(lead.firstName)},</h2>
        <p>Nous avons bien reçu votre demande de devis <b>${escapeHtml(lead.insuranceType)}</b>.</p>
        <p>Un conseiller Integra va étudier votre profil et vous recontacter <b>sous 1 heure</b> (jours ouvrés, 8h30–20h30) au <b>${escapeHtml(lead.phone)}</b> ou par email.</p>
        <p style="margin-top:24px;padding:16px;background:#E8FAEF;border-left:3px solid #22C97A;border-radius:8px">
          <b style="color:#0A2C4A">Référence dossier :</b> ${escapeHtml(lead.id)}<br/>
          Conservez ce numéro, il accélère le traitement si vous nous rappelez.
        </p>
        <p style="margin-top:24px">Pour toute question urgente, vous pouvez aussi nous joindre directement :</p>
        <ul>
          <li>📞 <a href="tel:+33187663942">01 87 66 39 42</a></li>
          <li>💬 <a href="https://wa.me/33755533466">WhatsApp</a></li>
          <li>📧 <a href="mailto:contact@integracc.fr">contact@integracc.fr</a></li>
        </ul>
        <p style="color:#5B6470;font-size:12px;margin-top:32px">
          Integra CC — Courtier en assurance indépendant<br/>
          ORIAS n°25 002 890 — Supervisé par l'ACPR<br/>
          60 Rue François 1er, 75008 Paris
        </p>
      </div>
    `,
  };

  try {
    const res = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(teamEmail),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(clientEmail),
      }),
    ]);
    const teamOk = res[0].ok;
    const clientOk = res[1].ok;
    if (!teamOk || !clientOk) {
      return { ok: false, reason: `Resend HTTP team=${res[0].status} client=${res[1].status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Resend fetch failed" };
  }
}

async function postToWebhook(lead: Lead): Promise<{ ok: boolean; reason?: string }> {
  const url = readEnv("LEAD_WEBHOOK_URL");
  if (!url) return { ok: false, reason: "LEAD_WEBHOOK_URL not set" };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "new_lead", lead }),
    });
    if (!res.ok) return { ok: false, reason: `Webhook HTTP ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : "Webhook fetch failed" };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ────────────────────────────────────────────────────────────
// Public server functions (called from QuoteFunnel / admin)
// ────────────────────────────────────────────────────────────

export const submitQuoteFn = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: unknown }) => {
    const validData = quoteSchema.parse(data);

    const newLead: Lead = {
      ...validData,
      id: `ld_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };

    pushLead(newLead);
    console.log("📥 Nouveau lead :", newLead.id, newLead.insuranceType, newLead.email);

    // Fire side effects in parallel — never block the response
    const [resendResult, webhookResult] = await Promise.all([
      sendResendEmails(newLead),
      postToWebhook(newLead),
    ]);

    if (resendResult.ok) console.log(`✅ Emails Resend envoyés (lead ${newLead.id})`);
    else console.log(`⚠ Resend skipped: ${resendResult.reason}`);

    if (webhookResult.ok) console.log(`✅ Webhook POSTé (lead ${newLead.id})`);
    else console.log(`⚠ Webhook skipped: ${webhookResult.reason}`);

    return {
      success: true,
      leadId: newLead.id,
      message: "Devis enregistré avec succès — un conseiller vous recontacte sous 1 h.",
    };
  }
);

export const getLeadsFn = createServerFn({ method: "GET" }).handler(async () => {
  return leadsStore;
});
