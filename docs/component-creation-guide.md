# Creating a Zentauri UI component

This is the complete delivery checklist for a new public component in Zentauri UI.
Use it with the repository's [`AGENTS.md`](../AGENTS.md),
[`CONTRIBUTING.md`](../CONTRIBUTING.md), and the
[`add-component` skill](../.claude/skills/add-component/SKILL.md).

## 1. Define the contract

Before writing files, decide the component's public props, slots, supported
appearances/sizes, accessible behavior, empty state, and whether animation belongs in
an optional entry point. List every themeable color and surface the component will
read; CSS tokens are part of the public API.

## 2. Add the package component

Create the following under `packages/components`.

| Surface                         | Required work                                                                                                                                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/design-system/<name>.ts`   | Create pure token strings. Every themeable value needs a `--zui-<name>-*` variable, fallback, and matching `dark:` variable in the same utility string. Include tokens used only by `subtle`, `contrast`, gradient, or glass appearances. |
| `src/design-system/index.ts`    | Export the new token module.                                                                                                                                                                                                              |
| `src/lib/facade.ts`             | Add the slug to `componentSlugs`; this makes it discoverable by `DesignSystem.getComponent`, token docs, theme editor, and CLI validation.                                                                                                |
| `src/lib/facade.test.ts`        | Assert the component appears in `components()` and can be retrieved.                                                                                                                                                                      |
| `src/ui/<name>/variants.ts`     | Build `cva()` variants from the design-system strings only.                                                                                                                                                                               |
| `src/ui/<name>/types.ts`        | Export props based on `VariantProps` plus the component-specific contract.                                                                                                                                                                |
| `src/ui/<name>/<name>-base.tsx` | Implement semantic UI, stable `data-slot`s, refs, callbacks, and empty states. For optional `ReactNode` values use a nullish check (`value != null`), not truthiness—`0` is valid content.                                                |
| `src/ui/<name>/<name>.tsx`      | Static re-export of the base only; it must not import Framer Motion.                                                                                                                                                                      |
| `src/ui/<name>/animated/`       | Only when animated support is needed. Keep Framer Motion and reduced-motion handling here.                                                                                                                                                |
| `src/ui/<name>/index.ts`        | Start with `"use client"`; export the component, types, and variants.                                                                                                                                                                     |
| `src/ui/<name>/<name>.test.tsx` | Cover defaults, variants, callbacks, empty states, representative edge values, and compound behavior where applicable.                                                                                                                    |
| `tsup.config.ts`                | Add the static name to `uiComponentNames`, and the animated name only when an animated entry exists.                                                                                                                                      |

## 3. Release and generated metadata

For a new public component, run `pnpm changeset` and choose a **minor** change for
`@zentauri-ui/zentauri-components`. Do not edit `packages/components/package.json`'s
version or the changelog by hand; the release workflow owns both.

Then regenerate the derived files from the repo root:

```bash
pnpm --filter @zentauri-ui/zentauri-components generate:registry
pnpm --filter @zentauri-ui/zentauri-components generate:props
pnpm --filter @zentauri-ui/zentauri-components update:test-health
```

These commands update the CLI registry, props metadata, README test health, and
component-library package-health display. Review their diffs, but never hand-edit
their generated output.

## 4. Add the docs and preview

Under `apps/component-library`, add:

1. `app/preview/components/<slug>/page.tsx`, using `getPreviewSeo(slug)`.
2. A preview page under `components/preview/<name>/` with hero, code examples, props,
   installation, and CSS-variable sections as needed.
3. Typed live-demo data, code snippets, and a demo for `PreviewCodeShowcase`.
4. A playground with controls and a selectable gallery of every appearance. Selector
   cards must work with pointer, Enter, and Space. Do not nest interactive elements in
   a native button.
5. `content/seo/preview/components/<slug>.json` plus registration in
   `lib/preview-seo-registry.ts`.
6. CSS-variable reference data and its registration in
   `components/css-variables/reference-data.ts`.
7. Sidebar, introduction-grid, and homepage-install entries wherever the component
   should be exposed. Search entries are generated from sidebar data, so no manual
   search-index edit is needed.

The CSS-variable reference is a completeness contract: `lightVariables` must name
every token used in the shipped design-system strings, including foreground and
appearance-specific values. For a new, manageable reference, list every paired dark
token in `darkExamples` too. If an established reference intentionally uses
representative dark examples, include the new dark tokens there and make sure
`darkVariableCount` remains the total number of dark variables available—not only the
number displayed. For a one-to-one light/dark token set, that total should match the
light-variable total.

## 5. Validate in proportion to the change

Start with the smallest useful checks:

```bash
nvm use
pnpm --filter @zentauri-ui/zentauri-components exec vitest run \
  src/ui/<name>/<name>.test.tsx src/lib/facade.test.ts
pnpm --filter @zentauri-ui/zentauri-components check:tokens
pnpm --filter @zentauri-ui/zentauri-components check:props
pnpm --filter @zentauri-ui/zentauri-components build
pnpm --filter component-library check-types
git diff --check
```

Also inspect the preview in light and dark mode, try every appearance, and compare
the `--zui-<name>-*` names in the design-system file with the CSS-variable reference.
Run broader lint, test, and build commands when the PR workflow or the changed area
requires them.

## Final handoff checklist

- [ ] Static component, tokens, variants, types, base, index, and tests exist.
- [ ] Design-system export and facade slug/test are present.
- [ ] `tsup.config.ts` and generated CLI/props/test-health outputs are current.
- [ ] A minor Changeset exists; no manual version or changelog bump was made.
- [ ] The preview route, SEO, navigation, examples, playground, and appearance gallery work.
- [ ] CSS-variable docs cover all light/dark tokens and report their true total.
- [ ] Targeted tests, token/props checks, build/type checks, and visual review pass.
