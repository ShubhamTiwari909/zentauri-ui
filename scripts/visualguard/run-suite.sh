#!/usr/bin/env bash
set -euo pipefail

if [[ "$(node -p 'process.platform + "/" + process.arch')" != linux/arm64 ]]; then
  echo 'Canonical references require the pinned Linux ARM64 container.' >&2
  exit 2
fi

# Linux bind mounts preserve root ownership from installs/builds. Return the
# snapshot and reports to the caller even when a test or build fails, so the
# host can inspect evidence and remove its temporary workspace.
restore_workspace_ownership() {
  local suite_status=$?
  trap - EXIT
  if ! chown -R "$VISUALGUARD_HOST_UID:$VISUALGUARD_HOST_GID" /workspace; then
    echo 'Could not return workspace ownership to the host.' >&2
    exit 1
  fi
  exit "$suite_status"
}
if [[ -n "${VISUALGUARD_HOST_UID:-}" && -n "${VISUALGUARD_HOST_GID:-}" ]]; then
  trap restore_workspace_ownership EXIT
fi

npm install --global pnpm@9.0.0
pnpm install --filter component-library... --frozen-lockfile --store-dir /pnpm/store
pnpm exec turbo run build --filter=component-library

if [[ "${VISUALGUARD_RUN_MODE:-compare}" == update ]]; then
  pnpm --filter component-library visual:update
else
  pnpm --filter component-library visual:test
fi

node scripts/visualguard/verify-evidence.mjs
