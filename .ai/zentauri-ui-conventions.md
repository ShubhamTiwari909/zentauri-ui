# Zentauri UI conventions (repo-specific)

Use this as a quick reference when planning or implementing new components in `zentauri-ui`.

## Project map (high-signal paths)

- Preview app entrypoints
  - `apps/component-library/app/layout.tsx` (global shell + metadata)
  - `apps/component-library/app/globals.css` (Tailwind v4 import + base theme)
  - `apps/component-library/app/preview/components/layout.tsx` (preview shell under `/preview/components`)
  - `apps/component-library/app/preview/components/page.tsx` (preview hub / introduction; SEO from `index.json`)
  - `apps/component-library/app/preview/components/<segment>/page.tsx` (one route per component group)
  - `apps/component-library/app/preview/components/hooks/page.tsx` and `hooks/[slug]/page.tsx` (hooks hub and per-hook previews)
- Preview SEO documents (JSON → `metadata` + on-page sections)
  - `apps/component-library/content/seo/preview/components/<slug>.json` (components, installation, and preview index)
  - `apps/component-library/content/seo/preview/hooks/hooks.json` (hooks gallery hub)
  - `apps/component-library/lib/preview-seo-registry.ts` (imports the JSON files above into a slug → document map)
  - `apps/component-library/lib/hook-preview-seo.ts` (builds `PreviewSeoDocument` for each hook preview slug; not a per-hook JSON file)
- Navigation wiring
  - `apps/component-library/components/sidebar/sidebar-data.ts` (sidebar route list)
- UI primitives (the library)
  - `apps/component-library/components/ui/<segment>/`
    - `index.ts` exports the public surface
    - `<primitive>.tsx` component implementation (lowercase filename)
    - `types.ts` component + preset type definitions
    - `variants.ts` Tailwind recipes via `class-variance-authority` (`cva`)
    - `animations.ts` Framer Motion preset map (when applicable)
    - `<primitive>.test.tsx` contract tests (Vitest + Testing Library)
- Preview content (docs/playground)
  - `apps/component-library/components/preview/<segment>/index.tsx` (page composition)
  - `apps/component-library/components/preview/<segment>/sections/*` (content blocks)
  - `apps/component-library/components/preview/<segment>/variants.ts` (demo data lists)
- Shared utilities
  - `apps/component-library/lib/utils.ts` exports `cn()` (`clsx` + `tailwind-merge`)

## Component architecture patterns

### Variants: CVA + Tailwind utilities

- Define base styles + variant dimensions in `variants.ts` using `cva(...)`.
- Prefer “variant dimensions” that mirror real design decisions:
  - `appearance` (surface/intent colors)
  - `size` (spacing + typography)
  - `state`/`ring`/`as` (behavioral toggles)
- Use `compoundVariants` for cross-cutting overrides (see `Input`).

### Motion: preset map (Framer Motion)

- Use `framer-motion` `motion.*` primitives.
- Centralize animation behaviors in `animations.ts`:
  - export a `Record<PresetName, Pick<HTMLMotionProps<...>, ...>>` map
  - keep the preset surface intentionally small (e.g. `whileHover`, `whileTap`, `transition`, `style`)
- Pass `initial={false}` on the motion root to avoid SSR → client “initial animation” surprises.

### Stable targeting: `data-slot`

- Stamp `data-slot="<component>"` on the primitive root (see `Button`, `Input`).
- Treat the slot as part of the public contract (tests should enforce it).

### Display name

- Set `Component.displayName = "<Component>"` for devtools and documentation consumers.

### Polymorphism (`as`)

If the primitive supports multiple HTML elements:

- model `as` in `types.ts` and reflect it in `variants.ts` if styling differs per element type
- omit native prop name collisions (example: omit native `size` for design-system `size`)

## Preview page wiring (what to update)

For a new component group `<segment>` (typically plural, like `buttons`):

1. Add route: `apps/component-library/app/preview/components/<segment>/page.tsx`
2. Add preview page component: `apps/component-library/components/preview/<segment>/index.tsx`
3. Add any demo data: `apps/component-library/components/preview/<segment>/variants.ts`
4. Add SEO document: `apps/component-library/content/seo/preview/components/<segment>.json`, then register it in `apps/component-library/lib/preview-seo-registry.ts`
5. Add sidebar item: `apps/component-library/components/sidebar/sidebar-data.ts`

For a new hook preview, append an entry to `HOOK_PREVIEW_REGISTRY` in `apps/component-library/lib/constants.ts` (consumed by `hook-preview-registry.ts` and the `app/preview/components/hooks/[slug]/page.tsx` dynamic route). Per-hook metadata is built in `apps/component-library/lib/hook-preview-seo.ts`; the hooks hub copy stays in `content/seo/preview/hooks/hooks.json`.

Keep preview pages composed of “sections” under:

- `apps/component-library/components/preview/<segment>/sections/*`

## Testing conventions (contract-first)

Tests live alongside primitives and focus on public contracts:

- `data-slot` presence and uniqueness
- `displayName` set and stable
- default props (e.g. `type="button"` for buttons)
- variant application (classes change with `appearance`/`size` etc.)
- basic accessibility expectations (role, name, aria wiring for errors)

Test runner:

- `apps/component-library/vitest.config.ts` (jsdom, Testing Library, `@` alias)

## Next.js note (important)

Before editing `apps/component-library/app/**` files, read:

- `apps/component-library/AGENTS.md`

It states this Next.js build may include breaking changes; consult `node_modules/next/dist/docs/` when unsure.
