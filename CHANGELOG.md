# Changelog

This monorepo uses Changesets for release notes and npm versioning.

The published package changelog lives at [`packages/components/CHANGELOG.md`](packages/components/CHANGELOG.md).
GitHub release history is available at <https://github.com/ShubhamTiwari909/zentauri-ui/releases>.

## Release Process

1. Add a changeset for user-facing package changes with `pnpm changeset`.
2. Merge changes to `main` after CI passes.
3. Run `pnpm version-packages` to apply pending changesets to package versions and changelogs.
4. Review the generated version/changelog diff.
5. Run `pnpm release` to build and publish through Changesets.

Local publishing is supported with a properly configured npm account or npm
automation token. The GitHub Actions release workflow remains available for
future automation.
