---
name: add-component
description: Add a complete component to the Zentauri UI package and component-library docs, including tokens, discovery, generated metadata, release notes, tests, and an interactive preview.
---

# Add a Zentauri UI Component

Use this workflow whenever a new public component is added to `packages/components`.
Its goal is a shippable component, not merely a rendered demo. Read
[`AGENTS.md`](../../../AGENTS.md), [`CONTRIBUTING.md`](../../../CONTRIBUTING.md), and
[`docs/component-creation-guide.md`](../../../docs/component-creation-guide.md) before
starting. That guide is the concise, user-facing companion to this checklist.

## Non-negotiables

- Treat every `--zui-*` value as public API: give it a fallback and paired dark token
  in the design-system string, then document it in the CSS-variable reference.
- Register the component in both `src/design-system/index.ts` **and**
  `src/lib/facade.ts`'s `componentSlugs`; the latter powers token discovery, the theme
  editor, and CLI validation.
- Add a **minor Changeset** for a new public component. Never hand-edit the component
  package version, changelog, `cli/registry.json`, generated props metadata, or package
  health totals.
- Static entries must never import Framer Motion. Animated support belongs in the
  separate `animated/` entry only.
- A preview playground needs controls and an appearance gallery. Make selectable cards
  keyboard accessible; never put interactive controls inside a native `<button>`.

## 1. Decide the public API first

Before creating files, choose:

1. The static component API, slots, variants, defaults, and whether it is compound.
2. Whether an optional animated entry is useful. If yes, define transitions separately.
3. The supported appearances, sizes, and every themeable token. Include default,
   `subtle`, `contrast`, gradient, and glass tokens whenever the implementation uses
   them.

Set the placeholders throughout this workflow:

```text
<name>          kebab-case: activity-feed
<Name>          PascalCase: ActivityFeed
<NAME>          camel case: activityFeed
<has-animated>  yes | no
```

## 2. Build the package surface

Create `packages/components/src/design-system/<name>.ts` first. Keep it pure string
constants and pair every themeable utility with light/dark CSS variables and fallbacks,
for example:

```ts
"text-[color:var(--zui-<name>-fg,#111827)] dark:text-[color:var(--zui-<name>-fg-dark,#f9fafb)]";
```

Then add the component in this order:

1. Export the token file from `src/design-system/index.ts`.
2. Add `"<name>"` to `componentSlugs` in `src/lib/facade.ts` in its established order,
   and extend `src/lib/facade.test.ts` to prove `components()` and `getComponent()` find
   it.
3. Create `src/ui/<name>/variants.ts` with `cva()` maps that only import the
   design-system strings. Do not write raw Tailwind palettes here.
4. Create `types.ts`. Base public props on `VariantProps<typeof <name>Variants>` and
   retain valid `ReactNode` values: use `value != null` when deciding whether to render
   optional node content, never a truthiness guard that drops `0` or an empty metadata
   row.
5. Create `<name>-base.tsx`: semantic markup, stable `data-slot` attributes, forwarded
   refs where appropriate, `cn()` class composition, useful empty states, and no
   animation dependency.
6. Create `<name>.tsx` as a static re-export of the base. Add `animated/` only when
   needed, keeping Framer Motion there and using its `useReducedMotion` support.
7. Create `index.ts`, starting with `"use client"`, and export component, types, and
   variants (plus animated exports from the dedicated path).
8. Add `<name>.test.tsx`. Cover defaults, every public variant/appearance, className
   merging, callbacks, empty data, and meaningful edge inputs such as `timestamp={0}`.
   Test nested/compound slot behavior where relevant.
9. Add `<name>` to `uiComponentNames` in `tsup.config.ts`; add it to
   `uiAnimatedComponentNames` only when an animated entry exists.
10. Run `pnpm changeset` and select a **minor** release for
    `@zentauri-ui/zentauri-components`.

## 3. Regenerate derived package metadata

Run these from the repository root after source and test files exist:

```bash
pnpm --filter @zentauri-ui/zentauri-components generate:registry
pnpm --filter @zentauri-ui/zentauri-components generate:props
pnpm --filter @zentauri-ui/zentauri-components update:test-health
```

The last command owns the package README test row/count and the component-library
package-health data. Inspect the generated diff, but do not hand-edit these outputs.

## 4. Add the component-library preview

Create the route, preview shell, and focused sections under
`apps/component-library`:

1. `app/preview/components/<name>/page.tsx` using `getPreviewSeo("<name>")`.
2. `components/preview/<name>/index.tsx` and sections for hero, examples, props,
   installation, and CSS variables as appropriate.
3. A live-demo/data/snippets trio for code showcases. Code-example labels are `<p>`
   elements above `PreviewCodeShowcase`, matching existing pages.
4. A playground with typed appearance/options data, controls such as `Select`, and a
   preview that updates from the chosen state. Show every supported appearance in a
   selectable gallery—not just one rendered sample. Cards acting as selectors need
   `role="button"`, `tabIndex={0}`, and Enter/Space support (or an equivalent semantic
   control); avoid nesting buttons, links, or selects in a button card.
5. `content/seo/preview/components/<name>.json` and registration in
   `lib/preview-seo-registry.ts`.
6. A CSS-variable reference data file plus its registration in
   `components/css-variables/reference-data.ts`. Inventory every light token actually
   read by the design-system source, including foreground and appearance-specific
   tokens. For a new, manageable reference, list every paired dark token too; if an
   established reference intentionally uses representative `darkExamples`, ensure it
   still exposes the new dark tokens and set `darkVariableCount` to the exact supported
   total, not merely the number of examples shown.
7. Sidebar navigation, the introduction grid, and homepage install commands when this
   component belongs in each surface. Site search is generated from the sidebar and
   needs no manual entry.

## 5. Review before declaring it complete

Use targeted checks first; source all supported Node settings with `nvm use`:

```bash
nvm use
pnpm --filter @zentauri-ui/zentauri-components exec vitest run \
  src/ui/<name>/<name>.test.tsx src/lib/facade.test.ts
pnpm --filter @zentauri-ui/zentauri-components check:tokens
pnpm --filter @zentauri-ui/zentauri-components check:props
pnpm --filter @zentauri-ui/zentauri-components build
pnpm --filter component-library check-types
```

Run broader repository commands only when required by the change or the normal PR
workflow. Visually inspect the preview in light/dark mode and every appearance,
especially `subtle`, `contrast`, and glass. Compare all `--zui-<name>-*` references in
the design-system file with the CSS-variable reference to catch omissions.

Finish with `git diff --check` and review the diff for these common misses:

- Missing facade slug or facade test.
- A manual package-version/changelog update instead of a Changeset.
- Tokens used by a shipped appearance but absent from the docs inventory.
- Truthiness checks around `ReactNode` fields that discard valid numeric content.
- A playground that exposes only a single appearance or inaccessible selector cards.
- A static entry that accidentally imports animation code.
