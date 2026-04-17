---
name: zentauri-component-planner
description: Plan and implement new Zentauri UI components in packages/components (React, Tailwind, CVA, Framer Motion), wire them into @zentauri-ui/zentauri-components builds (tsup), and add preview routes, SEO JSON, sidebar nav, and preview sections in apps/component-library. Use when adding a component end-to-end.
---

# Zentauri UI — new component skill

## Overview

Ship a component in the **published package** (`packages/components`) and surface it in the **Next.js catalog** (`apps/component-library`): metadata, sidebar, and composed preview sections.

Authoritative patterns:

- Library: `packages/components/src/ui/<segment>/` (copy shape from `accordion`, `buttons`, or `inputs`)
- Catalog: `apps/component-library/app/preview/<segment>/` + `apps/component-library/components/preview/<segment>/`
- Conventions: `.ai/zentauri-ui-conventions.md` (supplementary; this file is the checklist of **paths to touch**)

---

## 0) Choose a stable `<segment>`

Pick one URL-safe folder name used **everywhere** (examples: `buttons`, `inputs`, `empty-state`):

| Concern | Rule |
|--------|------|
| Route + imports | `apps/component-library/app/preview/<segment>/page.tsx` → `/preview/<segment>` |
| Preview UI folder | `apps/component-library/components/preview/<segment>/` |
| Package folder | `packages/components/src/ui/<segment>/` |
| tsup entry name | Same string as `<segment>` in `uiComponentNames` → `@zentauri-ui/zentauri-components/ui/<segment>` |
| SEO slug | Registry key in `getPreviewSeo("<segment>")` must match `previewSeoRegistry` (e.g. `"empty-state"`) |
| SEO JSON file | `apps/component-library/content/seo/preview/<segment>.json` (filename = segment) |

Display title in the sidebar (e.g. “Empty state”) is separate and lives only in `sidebar-data.ts`.

---

## 1) Implementation checklist (do in order)

### A. Library (`packages/components`)

1. **`packages/components/src/ui/<segment>/`**
   - `index.ts` — `"use client"` at top; re-export public components, types, variants/animations as needed (see `src/ui/accordion/index.ts`).
   - Main implementation file(s), `types.ts`, `variants.ts`, optional `animations.ts`.
   - **Contract test** `*.test.tsx` next to sources (`vitest` picks up `src/**/*.{test,spec}.{ts,tsx}`).

2. **`packages/components/tsup.config.ts`**
   - Append `<segment>` to `uiComponentNames` (same spelling as the folder under `src/ui/`).

3. **Build / client boundary**
   - Entry `index.ts` files include `"use client"`; `tsup` `onSuccess` runs `scripts/prepend-use-client.mjs` on built UI entries — no extra step for a new segment once it is in `uiComponentNames`.

4. **`@zentauri-ui/zentauri-components` exports**
   - `package.json` uses `"./ui/*"` — **no** `exports` edit for a new subpath.

### B. SEO + metadata (`apps/component-library`)

5. **`apps/component-library/content/seo/preview/<segment>.json`**
   - Structured doc for title, description, keywords, `og` / `twitter`, `canonicalPath` (`/preview/<segment>`), `headings`, `intro`, `useCases`, `faqs`, `sections`, optional `useCasesSectionHeading`.
   - Invariants are documented in `apps/component-library/lib/preview-seo.ts` on `PreviewSeoDocument` (e.g. `headings.h2` length, last h2 = FAQ, `sections.length` vs h2).

6. **`apps/component-library/lib/preview-seo-registry.ts`**
   - `import` the new JSON.
   - Add a key to `previewSeoRegistry` (must match `PreviewSeoSlug` / `getPreviewSeo` argument).

### C. App route (`apps/component-library`)

7. **`apps/component-library/app/preview/<segment>/page.tsx`**
   - Import the preview page default from `@/components/preview/<segment>`.
   - `const seo = getPreviewSeo("<segment>");`
   - `export const metadata = previewSeoDocumentToMetadata(seo);`
   - Render `<YourPreviewPage seo={seo} />` (same pattern as `app/preview/accordion/page.tsx`).

### D. Preview UI (`apps/component-library`)

8. **`apps/component-library/components/preview/<segment>/index.tsx`**
   - Wrap in `PreviewPageShell`.
   - Typical stack: **hero** (receives `seo`, uses `PreviewHeroSeoBlock`), **examples** section(s), **code examples** section, then `<PreviewSeoDoc doc={seo} />` (see `components/preview/accordion/index.tsx`).

9. **`components/preview/<segment>/sections/`**
   - Hero: `PreviewHeroSeoBlock` + live demo; import primitives from `@zentauri-ui/zentauri-components/ui/<segment>`.
   - Optional `variants.ts` for demo lists.
   - Code examples: mirror `accordion` / `select` (`*-code-examples-section.tsx`, `components/*-code-examples-demo.tsx`, `.data.ts`, `.types.ts`, `.snippets.ts`).

### E. Navigation

10. **`apps/component-library/components/sidebar/sidebar-data.ts`**
    - Add `{ title: "…", href: "/preview/<segment>" }` under **Components**, alphabetically with peers.

### F. Verify

11. **Commands**
    - `pnpm --filter @zentauri-ui/zentauri-components build` (or `dev` / watch) so `dist/ui/<segment>.*` exists.
    - `pnpm --filter @zentauri-ui/zentauri-components test`
    - `pnpm -C apps/component-library check-types` and `pnpm -C apps/component-library lint` as needed.
    - `pnpm -C apps/component-library build` before release.

---

## 2) Things you do **not** need (unless you change tooling)

- **No** extra `package.json` export line per component (wildcard `./ui/*`).
- **No** change to `prepend-use-client.mjs` for each component.
- **No** Vitest `include` change in `packages/components` for normal colocated tests.
- **No** dedicated sitemap file in-repo today; SEO is driven by per-route `metadata` + JSON-LD from the SEO doc.

---

## 3) Optional gaps to consider (not always required)

- **Peers / tsup `external`**: only if the component imports a new runtime dependency — align with `packages/components/tsup.config.ts` `external` and `package.json` `peerDependencies`.
- **Tailwind in consumer apps**: installation docs mention `@source` for scanning the package; new classes in `packages/components` are covered when consumers point at the package (see `packages/components/README.md`).
- **Root / turbo**: no per-component turbo entry; workspace filters use package names.

---

## 4) Planning output (when the user wants a plan first)

Short Markdown plan sections:

1. Goal and non-goals  
2. Public API (props, defaults, controlled/uncontrolled, `as` if any)  
3. `data-slot` and any sub-slots  
4. CVA variants (`variants.ts`)  
5. Motion presets (`animations.ts`) if applicable  
6. Accessibility (roles, keyboard, labels)  
7. Files to create under `packages/components/src/ui/<segment>/`  
8. Preview + SEO + sidebar + tsup touch list (this checklist)  
9. Contract tests to write  
10. Validation commands (section 1F)

Mirror **Accordion** (simple) or **Select** (rich code examples) for preview depth.

---

## Resource pointers

- Checklist and workflow: this file (`.ai/SKILL.md`)
- Style and patterns: `.ai/zentauri-ui-conventions.md`
- SEO shape and metadata helpers: `apps/component-library/lib/preview-seo.ts`
- Next.js constraints: `apps/component-library/AGENTS.md`
