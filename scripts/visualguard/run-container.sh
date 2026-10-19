#!/usr/bin/env bash
set -euo pipefail

# CI and local runs use the same ARM64 Linux browser/font/Node image.
image='mcr.microsoft.com/playwright:v1.58.2-jammy@sha256:4698a73749c5848d3f5fcd42a2174d172fcad2b2283e087843b115424303a565'
mode="${1:-compare}"
case "$mode" in
  compare|update) ;;
  *) echo 'Usage: bash scripts/visualguard/run-container.sh [compare|update]' >&2; exit 2 ;;
esac

repo_root="$(git rev-parse --show-toplevel)"
mkdir -p "$repo_root/.visualguard"
snapshot="$(mktemp -d "$repo_root/.visualguard/workspace.XXXXXX")"
trap 'rm -rf "$snapshot"' EXIT
cd "$repo_root"
# Include reviewable local changes, exclude ignored builds, credentials and caches.
git ls-files --cached --others --exclude-standard -z |
  while IFS= read -r -d '' file; do
    if [[ -e "$file" || -L "$file" ]]; then printf '%s\0' "$file"; fi
  done | tar --null -T - -cf - | tar -xf - -C "$snapshot"
# Baselines were removed from the current tree to keep generated images out of
# the checkout. Restore the reviewed sets from immutable Git history, never from
# the candidate under test. Shallow CI checkouts need this one historical commit.
baseline_revision="$(node -p 'require("./apps/component-library/visualguard/baseline-provenance.json").baselineRevision')"
if [[ ! "$baseline_revision" =~ ^[0-9a-f]{40}$ ]]; then
  echo 'baselineRevision must pin a full Git commit SHA.' >&2
  exit 2
fi
if ! git cat-file -e "$baseline_revision^{commit}" 2>/dev/null; then
  git fetch --no-tags --depth=1 origin "$baseline_revision"
fi
baseline_path='apps/component-library/visualguard/baselines'
# Discard any untracked host references copied by older checkouts as well.
rm -rf -- "$snapshot/$baseline_path"
git archive "$baseline_revision" "$baseline_path" | tar -xf - -C "$snapshot"
echo "Reviewed typography references: $baseline_revision"

results="$repo_root/apps/component-library/visualguard-results"
mkdir -p "$results"
git rev-parse HEAD > "$results/source-revision.txt"
printf '%s\n' "$baseline_revision" > "$results/baseline-revision.txt"

set +e
docker run --rm --platform linux/arm64 --ipc=host \
  --mount "type=bind,source=$snapshot,target=/workspace" \
  --mount "type=bind,source=$results,target=/workspace/apps/component-library/visualguard-results" \
  --mount "type=volume,source=zentauri-visualguard-pnpm-v9,target=/pnpm/store" \
  --mount type=volume,target=/workspace/node_modules \
  --mount type=volume,target=/workspace/apps/component-library/node_modules \
  --mount type=volume,target=/workspace/packages/components/node_modules \
  --mount type=volume,target=/workspace/packages/shared/node_modules \
  --mount type=volume,target=/workspace/apps/component-library/.next \
  --mount type=volume,target=/workspace/packages/components/dist \
  --workdir /workspace \
  --env CI=1 --env HUSKY=0 --env NEXT_TELEMETRY_DISABLED=1 \
  --env "VISUALGUARD_HOST_UID=$(id -u)" --env "VISUALGUARD_HOST_GID=$(id -g)" \
  --env "VISUALGUARD_RUN_MODE=$mode" \
  "$image" bash scripts/visualguard/run-suite.sh
result=$?
set -e

if [[ "$mode" == update && "$result" == 0 ]]; then
  # The suite exports complete references before its ownership cleanup.
  echo "Candidate references: $results/candidate-baselines"
  echo 'Inspect these before publishing a new pinned reference revision.'
fi
exit "$result"
