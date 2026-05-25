/**
 * Analytics scaffold — Plausible-ready, consent-gated, RGPD-compliant.
 *
 * Activation:
 *   1. Create a free Plausible account at plausible.io (or self-host)
 *   2. Add the domain (e.g. integra-assurance.com) in the Plausible dashboard
 *   3. Set VITE_PLAUSIBLE_DOMAIN in .env.local — the value is the domain you registered
 *      (Plausible's tracking script uses it to attribute traffic — it's PUBLIC, safe in VITE_*)
 *   4. (Optional) VITE_PLAUSIBLE_HOST to override the API host (for self-hosted)
 *
 * Without VITE_PLAUSIBLE_DOMAIN, this module is a no-op — no script loaded, no tracking.
 *
 * Behaviour:
 *  - Loads the Plausible script lazily ONCE the user has granted analytics consent
 *  - Tracks pageviews automatically (Plausible default)
 *  - Reacts to `integra:consent-change` event — destroys tracker if user revokes consent
 *  - Exposes `track(eventName, props?)` for custom events (CTA clicks, form submits, etc.)
 */

import { hasConsent } from "./consent";

const DOMAIN = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined) ?? "";
const HOST = (import.meta.env.VITE_PLAUSIBLE_HOST as string | undefined) ?? "https://plausible.io";

const SCRIPT_ID = "integra-plausible";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

function loadPlausible() {
  if (typeof window === "undefined") return;
  if (!DOMAIN) return;
  if (document.getElementById(SCRIPT_ID)) return; // already loaded

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.defer = true;
  script.dataset.domain = DOMAIN;
  script.src = `${HOST}/js/script.js`;
  document.head.appendChild(script);

  // Minimal queue shim until script loads — lets `track()` calls before init enqueue
  if (!window.plausible) {
    window.plausible = function (...args: unknown[]) {
      (window.plausible as unknown as { q?: unknown[] }).q =
        (window.plausible as unknown as { q?: unknown[] }).q || [];
      (window.plausible as unknown as { q: unknown[] }).q.push(args);
    } as typeof window.plausible;
  }
}

function unloadPlausible() {
  if (typeof window === "undefined") return;
  const script = document.getElementById(SCRIPT_ID);
  if (script) script.remove();
  delete window.plausible;
}

/**
 * Initialize analytics. Call once at app start (e.g. from RootComponent).
 * Safe to call when DOMAIN is unset — no-op.
 */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (!DOMAIN) return;

  // Initial decision: honor the current consent
  if (hasConsent("analytics")) {
    loadPlausible();
  }

  // React to consent changes (user opens "Gérer mes cookies" and toggles analytics)
  const onChange = () => {
    if (hasConsent("analytics")) loadPlausible();
    else unloadPlausible();
  };
  window.addEventListener("integra:consent-change", onChange);
  // No cleanup — analytics is a global side-effect for the app lifecycle
}

/**
 * Track a custom event (Plausible goal). Silently no-op if analytics not loaded.
 *
 * @example track("CTA Click", { props: { location: "hero" } })
 * @example track("Quote Submitted", { props: { type: "auto" } })
 */
export function track(
  event: string,
  opts?: { props?: Record<string, string | number | boolean> }
) {
  if (typeof window === "undefined") return;
  if (typeof window.plausible !== "function") return;
  try {
    window.plausible(event, opts);
  } catch {
    // Plausible errors are silent by design — never break the UX
  }
}

/** True if analytics is wired up (env var set). Useful for conditional UI like a "settings" badge. */
export const ANALYTICS_ENABLED = DOMAIN.length > 0;
