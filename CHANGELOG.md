# Changelog

This monorepo uses Changesets for release notes and npm versioning.

The published package changelog lives at [`packages/components/CHANGELOG.md`](packages/components/CHANGELOG.md).
GitHub release history is available at <https://github.com/ShubhamTiwari909/zentauri-ui/releases>.

## Release Process

1. Add a changeset for user-facing package changes with `pnpm changeset`.
2. Merge changes to `main` after CI passes.
3. The GitHub Actions release workflow opens a Changesets version PR.
4. Merge the version PR after CI passes.
5. The release workflow publishes to npm with provenance.

Do not run `pnpm release` locally for production publishing. The component
package has npm provenance enabled, so publishing must happen from the supported
GitHub Actions workflow with `id-token: write` and `NPM_TOKEN` configured.
