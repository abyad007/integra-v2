<?php
/**
 * Integra Assurance — Lead capture endpoint (Hostinger shared hosting)
 *
 * Receives a POST with JSON body {insuranceType, profile, firstName, lastName, phone, email}
 * Validates, then sends 2 emails via Hostinger SMTP (PHPMailer):
 *   1. Notification to the broker team
 *   2. Confirmation to the lead
 *
 * SETUP ON HOSTINGER (one-time, ~5 min) :
 *   1. Upload this file + lib/ to public_html/api/
 *   2. Create an email account in hPanel:
 *      - hPanel → Emails → Email Accounts → Create
 *      - Email: devis@integra-assurance.com
 *      - Set a strong password
 *   3. Create public_html/api/.env with:
 *        SMTP_HOST=smtp.hostinger.com
 *        SMTP_PORT=465
 *        SMTP_USER=devis@integra-assurance.com
 *        SMTP_PASS=<le password créé à l étape 2>
 *        SMTP_FROM_NAME=Integra Assurance
 *        LEAD_NOTIFICATION_EMAIL=integra.cc@outlook.com
 *   4. Chmod .env to 600
 */

require_once __DIR__ . '/lib/PHPMailer/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

// ──────────────────────────────────────────────────────────────
// CORS
// ──────────────────────────────────────────────────────────────
$ALLOWED_ORIGINS = [
    'https://integra-assurance.com',
    'https://www.integra-assurance.com',
    'http://localhost:5180',
    'http://localhost:5173',
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

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ──────────────────────────────────────────────────────────────
// Parse + validate payload
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
if (!filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$leadId = 'ld_' . substr(uniqid('', true), -10);
$payload['id'] = $leadId;
$payload['createdAt'] = gmdate('c');

// ──────────────────────────────────────────────────────────────
// Load .env
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

$smtpHost = $env['SMTP_HOST'] ?? 'smtp.hostinger.com';
$smtpPort = (int)($env['SMTP_PORT'] ?? 465);
$smtpUser = $env['SMTP_USER'] ?? '';
$smtpPass = $env['SMTP_PASS'] ?? '';
$smtpFromName = $env['SMTP_FROM_NAME'] ?? 'Integra Assurance';
$notifyEmail = $env['LEAD_NOTIFICATION_EMAIL'] ?? 'integra.cc@outlook.com';

// ──────────────────────────────────────────────────────────────
// Build email bodies (HTML)
// ──────────────────────────────────────────────────────────────
function h(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

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
// Send via PHPMailer SMTP
// ──────────────────────────────────────────────────────────────
function send_smtp(string $to, string $toName, string $subject, string $html, array $cfg, ?string $replyTo = null): array {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $cfg['host'];
        $mail->Port = $cfg['port'];
        $mail->SMTPAuth = true;
        $mail->Username = $cfg['user'];
        $mail->Password = $cfg['pass'];
        $mail->SMTPSecure = $cfg['port'] === 465
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet = 'UTF-8';
        $mail->Timeout = 15;

        $mail->setFrom($cfg['user'], $cfg['fromName']);
        $mail->addAddress($to, $toName);
        if ($replyTo) $mail->addReplyTo($replyTo);

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $html;
        $mail->AltBody = strip_tags(str_replace(["<br>", "<br/>", "<br />"], "\n", $html));

        $mail->send();
        return ['ok' => true];
    } catch (MailException $e) {
        return ['ok' => false, 'reason' => $mail->ErrorInfo ?: $e->getMessage()];
    }
}

$smtpCfg = [
    'host' => $smtpHost,
    'port' => $smtpPort,
    'user' => $smtpUser,
    'pass' => $smtpPass,
    'fromName' => $smtpFromName,
];

$emailsSent = false;
$emailErrors = [];

if ($smtpUser !== '' && $smtpPass !== '') {
    $clientName = $payload['firstName'] . ' ' . $payload['lastName'];
    $teamRes = send_smtp(
        $notifyEmail,
        'Équipe Integra',
        '🆕 Nouveau lead ' . $payload['insuranceType'] . ' — ' . $clientName,
        $teamHtml,
        $smtpCfg,
        $payload['email']
    );
    $clientRes = send_smtp(
        $payload['email'],
        $clientName,
        'Votre demande de devis Integra Assurance',
        $clientHtml,
        $smtpCfg
    );
    $emailsSent = $teamRes['ok'] && $clientRes['ok'];
    if (!$teamRes['ok']) $emailErrors[] = 'team: ' . substr($teamRes['reason'] ?? 'unknown', 0, 200);
    if (!$clientRes['ok']) $emailErrors[] = 'client: ' . substr($clientRes['reason'] ?? 'unknown', 0, 200);
} else {
    $emailErrors[] = 'SMTP_USER or SMTP_PASS not set in api/.env';
}

// ──────────────────────────────────────────────────────────────
// Log to file (audit trail)
// ──────────────────────────────────────────────────────────────
$logPath = __DIR__ . '/leads.log';
$logLine = gmdate('c') . "\t" . $leadId . "\t" . $payload['insuranceType']
    . "\t" . $payload['email'] . "\t" . $payload['phone']
    . "\t" . str_replace("\t", ' ', $payload['firstName'] . ' ' . $payload['lastName'])
    . "\t" . ($emailsSent ? 'sent' : 'failed')
    . "\n";
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
