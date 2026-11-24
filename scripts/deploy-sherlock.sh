#!/usr/bin/env bash
# Deploy dist/ to SherlockHost over SSH. Credentials are NOT stored here:
#   export DEPLOY_HOST=... DEPLOY_PORT=... DEPLOY_USER=...   (key-based auth via ssh-agent)
set -euo pipefail
: "${DEPLOY_HOST:?}" "${DEPLOY_PORT:?}" "${DEPLOY_USER:?}"
cd "$(dirname "$0")/.."
python3 -I scripts/gen-seo.py
npm run build
# --delete removes stale pages, but must never touch server-only files: ACME challenges (certificate renewal),
# search-engine verification files, hosting/panel files. "P" = protect from deletion.
# Preview first with: DRY_RUN=1 scripts/deploy-sherlock.sh
rsync -avz --delete ${DRY_RUN:+--dry-run} \
  --filter='P .well-known/' \
  --filter='P google*.html' --filter='P yandex_*.html' --filter='P BingSiteAuth.xml' \
  --filter='P cgi-bin/' --filter='P .user.ini' --filter='P php.ini' \
  -e "ssh -p ${DEPLOY_PORT}" dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:public_html/adfoto.com.ua/"
