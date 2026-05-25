<?php
/**
 * Integra Assurance — Lead capture endpoint (Hostinger shared hosting)
 *
 * Receives a POST with JSON body {insuranceType, profile, firstName, lastName, phone, email}
 * Validates, then dispatches 2 emails via Resend API:
 *   1. Notification to the broker team
 *   2. Confirmation to the lead
 *
 * Setup on Hostinger:
 *   1. Upload this file to public_html/api/submit-lead.php
 *   2. Create a Resend account (resend.com — free 100 emails/day)
 *   3. Verify your domain (integra-assurance.com or integracc.fr)
 *   4. Create file public_html/api/.env with:
 *        RESEND_API_KEY=re_xxxxxxxxxxxx
 *        RESEND_FROM_EMAIL=Integra <devis@integra-assurance.com>
 *        LEAD_NOTIFICATION_EMAIL=integra.cc@outlook.com
 *   5. Chmod .env to 600 (owner-only read)
 *
 * Security:
 *   - CORS restricted to your production domain
 *   - JSON body validation
 *   - Rate limited by Hostinger PHP limits (no extra needed for a contact form)
 *   - .env never exposed (protected by .htaccess)
 */

// ──────────────────────────────────────────────────────────────
// CORS — adjust ALLOWED_ORIGINS for prod
// ──────────────────────────────────────────────────────────────
$ALLOWED_ORIGINS = [
    'https://integra-assurance.com',
    'https://www.integra-assurance.com',
    'http://localhost:5180', // dev only — remove in prod or keep for testing
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=utf-8');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Method guard
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ──────────────────────────────────────────────────────────────
// Parse + validate JSON body
// ──────────────────────────────────────────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

$required = ['insuranceType', 'profile', 'firstName', 'lastName', 'phone', 'email'];
$missing = [];
$payload = [];
foreach ($required as $key) {
    $val = trim((string)($data[$key] ?? ''));
    if ($val === '') $missing[] = $key;
    // basic length guard against abusive payloads
    if (strlen($val) > 300) {
        http_response_code(400);
        echo json_encode(['error' => "Field $key too long"]);
        exit;
    }
    $payload[$key] = $val;
}
if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields', 'fields' => $missing]);
    exit;
}

// Validate email
if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// Generate lead ID
$leadId = 'ld_' . substr(uniqid('', true), -10);
$payload['id'] = $leadId;
$payload['createdAt'] = gmdate('c'); // ISO 8601 UTC

// ──────────────────────────────────────────────────────────────
// Load .env (simple parser — no Composer needed)
// ──────────────────────────────────────────────────────────────
$envPath = __DIR__ . '/.env';
$env = [];
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $env[trim($parts[0])] = trim($parts[1]);
        }
    }
}

$resendKey = $env['RESEND_API_KEY'] ?? '';
$fromEmail = $env['RESEND_FROM_EMAIL'] ?? 'Integra <onboarding@resend.dev>';
$notifyEmail = $env['LEAD_NOTIFICATION_EMAIL'] ?? 'integra.cc@outlook.com';

// ──────────────────────────────────────────────────────────────
// Helper: send via Resend API
// ──────────────────────────────────────────────────────────────
function send_resend(string $apiKey, array $email): array {
    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => [
            "Authorization: Bearer $apiKey",
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($email),
    ]);
    $res = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);
    return ['ok' => $code >= 200 && $code < 300, 'code' => $code, 'body' => $res, 'curlErr' => $err];
}

function h(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// ──────────────────────────────────────────────────────────────
// Build emails
// ──────────────────────────────────────────────────────────────
$teamHtml = '
  <h2 style="font-family:system-ui,sans-serif;color:#0A2C4A">Nouveau lead reçu</h2>
  <table style="font-family:system-ui,sans-serif;border-collapse:collapse;width:100%;max-width:560px">
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Type</b></td><td style="padding:8px;border-bottom:1px solid #eee">' . h($payload['insuranceType']) . '</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Profil</b></td><td style="padding:8px;border-bottom:1px solid #eee">' . h($payload['profile']) . '</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Nom</b></td><td style="padding:8px;border-bottom:1px solid #eee">' . h($payload['firstName']) . ' ' . h($payload['lastName']) . '</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Téléphone</b></td><td style="padding:8px;border-bottom:1px solid #eee"><a href="tel:' . rawurlencode($payload['phone']) . '">' . h($payload['phone']) . '</a></td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee"><b>Email</b></td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:' . rawurlencode($payload['email']) . '">' . h($payload['email']) . '</a></td></tr>
    <tr><td style="padding:8px"><b>ID</b></td><td style="padding:8px;font-family:monospace;font-size:12px">' . h($leadId) . '</td></tr>
  </table>
  <p style="font-family:system-ui,sans-serif;color:#5B6470;font-size:13px;margin-top:24px">
    Envoyé via integra-assurance.com — ' . gmdate('d/m/Y H:i') . ' UTC
  </p>';

$clientHtml = '
  <div style="font-family:system-ui,sans-serif;color:#111827;max-width:560px">
    <h2 style="color:#0A2C4A">Bonjour ' . h($payload['firstName']) . ',</h2>
    <p>Nous avons bien reçu votre demande de devis <b>' . h($payload['insuranceType']) . '</b>.</p>
    <p>Un conseiller Integra va étudier votre profil et vous recontacter <b>sous 1 heure</b> (jours ouvrés, 8h30–20h30) au <b>' . h($payload['phone']) . '</b> ou par email.</p>
    <p style="margin-top:24px;padding:16px;background:#E8FAEF;border-left:3px solid #22C97A;border-radius:8px">
      <b style="color:#0A2C4A">Référence dossier :</b> ' . h($leadId) . '<br/>
      Conservez ce numéro, il accélère le traitement si vous nous rappelez.
    </p>
    <p style="margin-top:24px">Pour toute question urgente :</p>
    <ul>
      <li>📞 <a href="tel:+33187663942">01 87 66 39 42</a></li>
      <li>💬 <a href="https://wa.me/33755533466">WhatsApp</a></li>
      <li>📧 <a href="mailto:contact@integracc.fr">contact@integracc.fr</a></li>
    </ul>
    <p style="color:#5B6470;font-size:12px;margin-top:32px">
      Integra CC — Courtier en assurance indépendant<br/>
      ORIAS n°25 002 890 — Supervisé par l\'ACPR<br/>
      60 Rue François 1er, 75008 Paris
    </p>
  </div>';

// ──────────────────────────────────────────────────────────────
// Dispatch
// ──────────────────────────────────────────────────────────────
$emailsSent = false;
$emailErrors = [];

if ($resendKey !== '') {
    $teamRes = send_resend($resendKey, [
        'from' => $fromEmail,
        'to' => [$notifyEmail],
        'reply_to' => [$payload['email']],
        'subject' => '🆕 Nouveau lead ' . $payload['insuranceType'] . ' — ' . $payload['firstName'] . ' ' . $payload['lastName'],
        'html' => $teamHtml,
    ]);
    $clientRes = send_resend($resendKey, [
        'from' => $fromEmail,
        'to' => [$payload['email']],
        'subject' => 'Votre demande de devis Integra Assurance',
        'html' => $clientHtml,
    ]);
    $emailsSent = $teamRes['ok'] && $clientRes['ok'];
    if (!$teamRes['ok']) $emailErrors[] = "team:HTTP{$teamRes['code']}";
    if (!$clientRes['ok']) $emailErrors[] = "client:HTTP{$clientRes['code']}";
} else {
    $emailErrors[] = 'RESEND_API_KEY not configured';
}

// ──────────────────────────────────────────────────────────────
// Log lead to file (fallback if emails fail or for audit trail)
// ──────────────────────────────────────────────────────────────
$logPath = __DIR__ . '/leads.log';
$logLine = gmdate('c') . "\t" . $leadId . "\t" . $payload['insuranceType'] . "\t" . $payload['email'] . "\t" . $payload['phone'] . "\t" . str_replace("\t", ' ', $payload['firstName'] . ' ' . $payload['lastName']) . "\n";
@file_put_contents($logPath, $logLine, FILE_APPEND | LOCK_EX);

// ──────────────────────────────────────────────────────────────
// Respond
// ──────────────────────────────────────────────────────────────
http_response_code(200);
echo json_encode([
    'success' => true,
    'leadId' => $leadId,
    'emailsSent' => $emailsSent,
    'errors' => $emailErrors,
    'message' => 'Devis enregistré avec succès — un conseiller vous recontacte sous 1 h.',
]);
