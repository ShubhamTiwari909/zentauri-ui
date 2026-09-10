---
name: add-component
description: Use when adding a brand-new UI component to the Zentauri UI library (@zentauri-ui/zentauri-components) and its docs app — including phrasings like "add/create/scaffold a new component/primitive", "wire up a new component end-to-end", or naming a specific new component to build. Provides the full ordered file-by-file plan from design tokens (--zui-* contract) and variants through static/animated entries, tests, generated registry/props, and every docs-app registration surface (route, SEO, sidebar, search, install commands). Use this whenever a new component is being introduced even if the user does not say the word "skill" or list the files. Do NOT use for modifying, fixing, or restyling existing components.
---

# New Component Plan (reusable)

A copy-paste, end-to-end plan for adding a new UI component to Zentauri UI. Derived
from [PR #109 — Typing Indicator](https://github.com/ShubhamTiwari909/zentauri-ui/pull/109),
which is the canonical "add a component" change. Follow the steps in order; every file
touched in that PR is represented here so **nothing is missed**.

## How to use this doc

Replace these placeholders throughout, then work top to bottom:

| Placeholder      | Meaning                               | Typing-indicator example |
| ---------------- | ------------------------------------- | ------------------------ |
| `<name>`         | folder / kebab slug                   | `typing-indicator`       |
| `<Name>`         | PascalCase component name             | `TypingIndicator`        |
| `<Title>`        | human title (sidebar, SEO)            | `Typing indicator`       |
| `<camelName>`    | camelCase token prefix (`zui<Name>`)  | `typingIndicator`        |
| `<Category>`     | docs badge / SEO category             | `Feedback`               |
| `<has-animated>` | does it ship a framer-motion variant? | yes                      |

> **Architecture recap (read bottom-up):** `design-system/<name>.ts` (pure token
> strings) → `variants.ts` (cva, no raw Tailwind) → `types.ts` → `<name>-base.tsx`
> (real impl) → `<name>.tsx` (static entry, **no framer-motion**) → optional
> `animated/` entry → `index.ts` (`"use client"` + re-exports). Motion must never
> leak into the static entry.

---

## Phase A — Library package (`packages/components`)

Create the component folder `src/ui/<name>/` with this fixed layering.

### A1. Design tokens — `src/design-system/<name>.ts` (NEW)

Pure string constants only. Export `zui<Name>...` consts. **Every themeable value is a
CSS variable with a hardcoded fallback and a paired `dark:` class in the same string.**
Pattern: `--zui-<name>-<role>` with a fallback chain to a shared token, e.g.

```ts
// bg-[var(--zui-<name>-blue-dot-bg,var(--zui-color-blue,#2563eb))]
//   dark:bg-[var(--zui-<name>-blue-dot-bg-dark,var(--zui-color-blue-dark,#3b82f6))]
```

House style: ~15+ color "appearance" palettes plus `gradient-*` (and `glass` where it
fits). Also export base/size/label string maps as needed
(`zui<Name>Base`, `zui<Name>Sizes`, `zui<Name>Appearances`, …).

### A2. Register the token file — `src/design-system/index.ts` (EDIT)

Add `export * from "./<name>";` (keep the existing — slightly inconsistent —
alphabetical-ish ordering).

### A3. Variants — `src/ui/<name>/variants.ts` (NEW)

Wire the token strings into `cva()` maps. **No raw Tailwind here** — import only from
`../../design-system/<name>`. Export each `...Variants` (and re-export any constant the
base/animated files need, e.g. dot-delay arrays).

### A4. Types — `src/ui/<name>/types.ts` (NEW)

`VariantProps<typeof ...Variants>` + component-specific fields. Prefer
`ComponentPropsWithRef<"span">` (or the right element) over a hand-rolled `ref`. Export
`<Name>BaseProps`, `<Name>Props`, `<Name>VariantProps`, plus any value types.

### A5. Base implementation — `src/ui/<name>/<name>-base.tsx` (NEW)

Starts with `"use client"`. The real impl. Stamp `data-slot="<name>"` on the root and
on sub-parts (`<name>-dots`, `<name>-label`, …). Compound components use a React context

- `data-slot` + sub-component exports. Set `displayName`. Forward `ref`. No framer-motion.

### A6. Static entry — `src/ui/<name>/<name>.tsx` (NEW)

Two lines — re-export the base, nothing else:

```ts
// <name>.tsx — default static entry (no framer-motion)
export { <Name>Base as <Name> } from "./<name>-base";
```

### A7. Animated entry (only if `<has-animated>`) — `src/ui/<name>/animated/` (NEW)

- `animations.ts` — transition presets + the animation union type
  (`export type <Name>Animation = "none" | ...`).
- `types.ts` — `<Name>AnimatedProps = <Name>BaseProps & { animation?: ...; ref?: ... }`.
- `<name>-animated.tsx` — `"use client"`, `import { motion } from "framer-motion"`,
  reuses the base's variants and any shared sub-components (e.g. the Label). Set
  `displayName`.
- `index.ts` — `"use client"` + re-export component, prop types, animation type, presets.

### A8. Barrel — `src/ui/<name>/index.ts` (NEW)

Starts with `"use client"`. Re-export the component, its prop/variant types, and the
variant utilities.

### A9. Test — `src/ui/<name>/<name>.test.tsx` (NEW)

Vitest + Testing Library (jsdom). Cover at minimum: `displayName`, root `data-slot`,
default render, key props (counts/labels/positions), `ref` forwarding, `className`
passthrough. (Typing indicator shipped 9 tests + 1 peer-isolation assertion.)

### A10. Build/registry wiring — `tsup.config.ts` (EDIT)

Add `"<name>"` to **`uiComponentNames`**, and to **`uiAnimatedComponentNames`** if
`<has-animated>`. This one list drives both build entries and the generated CLI registry.
(`package.json` `exports` use wildcards `./ui/*` and `./ui/*/animated` — **no per-component
export edit needed**.)

### A11. Version bump — `packages/components/package.json` (EDIT)

Bump `version` (typing indicator: `2.1.9` → `2.2.0`, i.e. a new component = minor bump).

---

## Phase B — Generated artifacts (run scripts, do NOT hand-edit)

These files are machine-generated. Run the scripts; commit the output. **Never edit by
hand:** `cli/registry.json`, `cli/props.json`, `package-health-data.ts`, and the test
tables in both `README.md` files (they carry "Do not edit by hand" headers and live in
`.prettierignore`).

```sh
# from packages/components
pnpm --filter @zentauri-ui/zentauri-components run generate:registry   # cli/registry.json (+ peerHints, e.g. framer-motion)
pnpm --filter @zentauri-ui/zentauri-components exec node scripts/generate-props.mjs   # cli/props.json
pnpm --filter @zentauri-ui/zentauri-components run update:test-health  # runs vitest --reporter=json, rewrites package-health-data.ts + both README test tables
```

> `prepack` also runs `generate-registry` + `generate-props` + the `check-*` guards, so
> the registry/props will be regenerated at publish time — but generate locally so the
> diff is reviewable. `prepend-use-client.mjs` runs inside `tsup` `onSuccess`; nothing to
> do by hand.

Verify the generated registry picked up the component (and `framer-motion` under
`peerHints` if animated), and that test counts moved.

---

## Phase C — Docs app (`apps/component-library`)

### C1. Route — `app/preview/components/<name>/page.tsx` (NEW)

Imports the preview page + `getPreviewSeo("<name>")`, exports
`metadata = previewSeoDocumentToMetadata(seo)`, renders `<<Name>PreviewPage seo={seo} />`.

### C2. Preview page shell — `components/preview/<name>/index.tsx` (NEW)

`PreviewPageShell` wrapping `<<Name>HeroSection>`, the code-examples section,
`<PreviewApiSection slug="<name>" />`, and `<PreviewSeoDoc doc={seo} />`.

### C3. Sections — `components/preview/<name>/sections/` (NEW)

- `hero.tsx` — `Section variant="hero"` + `PreviewHeroSeoBlock` + a few live examples.
- `snippet-sections.tsx` — `Section` with an `<h2>`, intro `<p>`, and the playground.
- `components/data.ts` — appearance/size/animation arrays typed
  `as const satisfies readonly NonNullable<<Name>Props["appearance"]>[]`.
- `components/types.ts` — local demo prop types derived from the library types.
- `components/demo.tsx` — renders static vs animated based on the `animation` prop.
- `components/snippets.ts` — `<name>Snippet(opts)` builds the code string (uses
  `variantLeadComment`; omits default-valued attrs).
- `components/playground.tsx` — `"use client"`; `Select`-driven controls +
  `PreviewCodeShowcase` (Show output / Show code) + appearance gallery.

> Code-example section labels use `<p>` tags above each showcase row — see
> `components/preview/accordion/sections/accordion-code-examples-section.tsx`.

### C4. SEO document — `content/seo/preview/components/<name>.json` (NEW)

`category`, `title`, `description`, `keywords`, `og`, `twitter`, `canonicalPath`,
`headings` (single `h1` + `h2[]`), `intro`, `useCases`, `faqs`, `sections`,
`useCasesSectionHeading`. Keep exactly one `h1` (in the hero).

### C5. SEO registry — `lib/preview-seo-registry.ts` (EDIT)

`import <camelName> from "@/content/seo/preview/components/<name>.json";` and add
`"<name>": <camelName> as PreviewSeoDocument,` to `previewSeoRegistry`.

### C6. CSS-variable reference (if the component adds `--zui-*` tokens)

- `components/css-variables/data/<name>.ts` (NEW) — `defineCssVariableReference({...})`
  with `lightVariables`, `darkExamples`, and `darkVariableCount` (must equal the number
  of dark entries).
- `components/css-variables/reference-data.ts` (EDIT) — import + add to
  `cssVariableReferences`.

### C7. Sidebar nav — `components/sidebar/sidebar-data.ts` (EDIT)

Add `{ title: "<Title>", href: "/preview/components/<name>" }` to the right group.

### C8. Introduction grid — `components/introduction/data.ts` (EDIT)

Append `{ id, name, description, href, badge: "<Category>" }` to `componentsData`.

### C9. In-site search — `lib/site-search-entries.ts` (NO EDIT)

**Do not edit this file.** It auto-derives its entries from the `sidebar*Data`
arrays (see `buildSiteSearchEntries()`), so the sidebar entry you added in C7 is
all that's needed — CLAUDE.md: "so you do not edit it separately."

### C10. ⚠️ Homepage install commands — `lib/home-install-commands.ts` (EDIT)

Add an install entry **if** the component should appear in homepage install lists.
**PR #109 forgot this too** — decide consciously rather than by omission.

---

## Phase D — Verify

```sh
pnpm --filter @zentauri-ui/zentauri-components test          # new test file passes
pnpm --filter @zentauri-ui/zentauri-components build         # tsup builds the new entries
pnpm check-types                                             # tsc --noEmit across the repo
pnpm lint
pnpm format                                                  # not routed through Turbo
```

Then run the docs app and eyeball the preview (`/preview/components/<name>`) in **light
and dark**, toggle Show output / Show code, and confirm the sidebar link, search entry,
and CSS-variable reference render. Use the `verify` skill / preview tools rather than
asking the user to check manually.

> Node quirk: the default shell Node is v14 — use nvm v20.13.1 for pnpm/turbo/vitest.

---

## Phase E — Maintenance surfaces (track-list)

- `phase-3-plan.md` — flip the component's checkbox from `[ ]` to `[x]`.
- Re-confirm Phase B generated files are committed (registry, props, health, READMEs).

## Quick file checklist

**Package (hand-written):**
`design-system/<name>.ts` · `design-system/index.ts` · `ui/<name>/variants.ts` ·
`types.ts` · `<name>-base.tsx` · `<name>.tsx` · `<name>.test.tsx` · `index.ts` ·
(`animated/animations.ts` · `animated/types.ts` · `animated/<name>-animated.tsx` ·
`animated/index.ts`) · `tsup.config.ts` · `package.json`

**Package (generated — run scripts):**
`cli/registry.json` · `cli/props.json` · `package-health-data.ts` ·
`packages/components/README.md` · `apps/component-library/README.md`

**Docs app (hand-written):**
`app/preview/components/<name>/page.tsx` · `preview/<name>/index.tsx` +
`sections/**` · `content/seo/preview/components/<name>.json` ·
`lib/preview-seo-registry.ts` · `css-variables/data/<name>.ts` +
`css-variables/reference-data.ts` · `sidebar/sidebar-data.ts` ·
`introduction/data.ts` · **`lib/home-install-commands.ts`**

**Docs app (auto-derived — do NOT edit):**
`lib/site-search-entries.ts` (derives from `sidebar*Data`)
