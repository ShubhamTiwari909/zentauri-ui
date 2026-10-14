#!/usr/bin/env bash
set -euo pipefail

if [[ "$(node -p 'process.platform + "/" + process.arch')" != linux/arm64 ]]; then
  echo 'Canonical references require the pinned Linux ARM64 container.' >&2
  exit 2
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
