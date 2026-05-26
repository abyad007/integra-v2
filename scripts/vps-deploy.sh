#!/usr/bin/env bash
# ════════════════════════════════════════════════════════════
# Integra V2 — VPS deploy script (Scenario A)
#
# Runs on a Hostinger VPS. Pulls latest code from git, builds the
# static site, then rsyncs the result to Hostinger shared hosting.
#
# Place this script on your VPS at: ~/integra-v2/scripts/vps-deploy.sh
# Make it executable: chmod +x scripts/vps-deploy.sh
# Run it manually:    ./scripts/vps-deploy.sh
# Or via cron:        */15 * * * * /home/youruser/integra-v2/scripts/vps-deploy.sh >> /var/log/integra-deploy.log 2>&1
#
# Prerequisites on the VPS (one-time setup — see DEPLOY-VPS.md):
#   - Node.js 20+ installed
#   - Git installed
#   - SSH key authorized on Hostinger shared (rsync over SSH)
#   - Environment variables in ~/.integra-deploy.env (see below)
# ════════════════════════════════════════════════════════════

set -euo pipefail

# ── Config — adjust to your setup ───────────────────────────
PROJECT_DIR="${PROJECT_DIR:-$HOME/integra-v2}"

# Source the env file with deploy targets (NOT committed to git)
# Expected variables:
#   SHARED_SSH_USER      e.g. u1234567
#   SHARED_SSH_HOST      e.g. integra-assurance.com  or  46.x.x.x
#   SHARED_SSH_PORT      usually 65002 on Hostinger
#   SHARED_REMOTE_PATH   e.g. domains/integra-assurance.com/public_html
ENV_FILE="${ENV_FILE:-$HOME/.integra-deploy.env}"

# ── Logging helpers ─────────────────────────────────────────
log() { printf '[deploy] %s\n' "$*"; }
fail() { printf '[deploy] ✗ %s\n' "$*" >&2; exit 1; }

# ── Pre-flight checks ───────────────────────────────────────
[[ -f "$ENV_FILE" ]] || fail "Missing $ENV_FILE — see DEPLOY-VPS.md step 4"

# shellcheck disable=SC1090
source "$ENV_FILE"

: "${SHARED_SSH_USER:?SHARED_SSH_USER not set in $ENV_FILE}"
: "${SHARED_SSH_HOST:?SHARED_SSH_HOST not set in $ENV_FILE}"
: "${SHARED_SSH_PORT:?SHARED_SSH_PORT not set in $ENV_FILE}"
: "${SHARED_REMOTE_PATH:?SHARED_REMOTE_PATH not set in $ENV_FILE}"

[[ -d "$PROJECT_DIR" ]] || fail "Project dir not found: $PROJECT_DIR"
cd "$PROJECT_DIR"
[[ -f package.json ]] || fail "package.json not found in $PROJECT_DIR"

START_TIME=$(date +%s)
log "════════════════════════════════════════════════"
log "Integra V2 deploy started — $(date -u +%FT%TZ)"
log "════════════════════════════════════════════════"

# ── 1. Pull latest code ─────────────────────────────────────
log "1/4 — Pulling latest code from git…"
git fetch --quiet origin
LOCAL_REV=$(git rev-parse HEAD)
REMOTE_REV=$(git rev-parse @{u})
if [[ "$LOCAL_REV" == "$REMOTE_REV" ]]; then
    log "  Already up to date ($LOCAL_REV)"
    # Skip the rebuild + redeploy when nothing changed on GitHub.
    # Override with FORCE_BUILD=1 ./scripts/vps-deploy.sh to force a rebuild
    # (useful when only WordPress content changed, since the script can't detect that).
    if [[ "${FORCE_BUILD:-0}" != "1" ]]; then
        log "  Nothing new to deploy — exiting (use FORCE_BUILD=1 to override)"
        exit 0
    fi
    log "  FORCE_BUILD=1 — rebuilding anyway"
else
    log "  Updating: $LOCAL_REV → $REMOTE_REV"
    git reset --hard "$REMOTE_REV"
fi

# ── 2. Install deps (only if package.json or lockfile changed) ──
# Project uses bun.lock (not package-lock.json) so we use `npm install`
# instead of `npm ci`. Works equivalently for our use case.
if ! git diff --quiet "$LOCAL_REV" "$REMOTE_REV" -- package.json bun.lock package-lock.json 2>/dev/null; then
    log "2/4 — package.json/lockfile changed, installing dependencies…"
    npm install --no-audit --no-fund --silent
else
    log "2/4 — Deps unchanged, skipping npm install"
fi

# ── 3. Build static site ────────────────────────────────────
log "3/4 — Building static site (npm run build:static)…"
npm run build:static

[[ -d "$PROJECT_DIR/dist-static" ]] || fail "dist-static/ not produced by build"

ROUTE_COUNT=$(find "$PROJECT_DIR/dist-static" -name "index.html" | wc -l)
log "  $ROUTE_COUNT HTML pages generated"

# ── 4. Rsync to Hostinger shared ────────────────────────────
log "4/4 — Rsyncing to Hostinger shared ($SHARED_SSH_HOST:$SHARED_REMOTE_PATH)…"

# --delete removes orphaned files on the remote (old blog articles etc.)
# --exclude api/.env keeps the production .env intact (don't ship secrets from build)
# --exclude api/leads.log keeps the production audit log intact
rsync -avz --delete \
    --exclude='api/.env' \
    --exclude='api/leads.log' \
    -e "ssh -p $SHARED_SSH_PORT -o StrictHostKeyChecking=accept-new" \
    "$PROJECT_DIR/dist-static/" \
    "$SHARED_SSH_USER@$SHARED_SSH_HOST:$SHARED_REMOTE_PATH/"

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

log "════════════════════════════════════════════════"
log "✓ Deploy completed in ${DURATION}s — $(date -u +%FT%TZ)"
log "  Live at: https://integra-assurance.com/"
log "════════════════════════════════════════════════"
