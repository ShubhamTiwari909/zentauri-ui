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
results="$repo_root/apps/component-library/visualguard-results"
mkdir -p "$results"
git rev-parse HEAD > "$results/source-revision.txt"

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
  # Successful capture is necessary; reviewers still approve the image changes.
  rm -rf -- "$results/candidate-baselines"
  mkdir -p "$results/candidate-baselines"
  cp -R "$snapshot/apps/component-library/visualguard/baselines/." \
    "$results/candidate-baselines/"
  echo "Candidate references: $results/candidate-baselines"
  echo 'Inspect these before copying them into visualguard/baselines.'
fi
exit "$result"
