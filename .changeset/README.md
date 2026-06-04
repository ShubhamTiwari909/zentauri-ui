# Changesets

This repo uses Changesets for the published component package:

- `@zentauri-ui/zentauri-components`

Add a changeset when a PR changes the package API, behavior, generated output, CLI behavior, peer dependencies, or published docs that should be reflected in the npm changelog.

```sh
pnpm changeset
```

Choose the semver bump for `@zentauri-ui/zentauri-components`:

- `patch` for bug fixes, documentation corrections that ship with the package, and small non-breaking behavior fixes.
- `minor` for new components, hooks, variants, CLI capabilities, or other backwards-compatible features.
- `major` for breaking prop, export, styling token, peer dependency, or CLI behavior changes.

Do not add a changeset for docs-site-only changes, tests-only changes, CI-only changes, or internal refactors that do not affect the published package.
