# DataTable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a typed, batteries-included `DataTable` UI entry with sorting, filtering, pagination, selection, column visibility, loading, empty, bulk actions, and optional virtualization.

**Architecture:** Keep `Table` as the primitive and add `ui/data-table` as a composed static entry. Use existing hooks for sort, filter, pagination, and virtual list, and reuse Button/Input/Checkbox/Pagination/Table primitives for controls and markup.

**Tech Stack:** React, TypeScript, class-variance-authority, Tailwind utility strings, Vitest, Testing Library, tsup registry generation, Next.js docs app.

---

### Task 1: Package Entry And Behavior

**Files:**

- Create: `packages/components/src/design-system/data-table.ts`
- Modify: `packages/components/src/design-system/index.ts`
- Create: `packages/components/src/ui/data-table/data-table-base.tsx`
- Create: `packages/components/src/ui/data-table/data-table.tsx`
- Create: `packages/components/src/ui/data-table/index.ts`
- Create: `packages/components/src/ui/data-table/types.ts`
- Create: `packages/components/src/ui/data-table/variants.ts`
- Create: `packages/components/src/ui/data-table/data-table.test.tsx`

- [ ] Write failing tests for rendering, sort, filter, selection, visibility, pagination, loading, and empty states.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/data-table/data-table.test.tsx` and confirm the missing module failure.
- [ ] Implement the minimal typed component and helpers to pass tests.
- [ ] Re-run the focused test command and confirm the DataTable tests pass.

### Task 2: Build And Registry Surfaces

**Files:**

- Modify: `packages/components/tsup.config.ts`
- Modify generated after command: `packages/components/cli/registry.json`
- Modify generated after command: `packages/components/cli/props.json`

- [ ] Add `data-table` to `uiComponentNames`.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components generate:registry`.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components generate:props`.
- [ ] Run focused export/prop checks if the generated manifests change unexpectedly.

### Task 3: Docs Preview Surface

**Files:**

- Create: `apps/component-library/components/preview/data-table/index.tsx`
- Create: `apps/component-library/components/preview/data-table/sections/data-table-code-examples-section.tsx`
- Create: `apps/component-library/components/preview/data-table/components/data-table-code-examples.data.ts`
- Create: `apps/component-library/components/preview/data-table/components/data-table-code-examples.snippets.ts`
- Create: `apps/component-library/components/preview/data-table/components/data-table-demo.tsx`
- Create: `apps/component-library/app/preview/components/data-table/page.tsx`
- Create: `apps/component-library/content/seo/preview/components/data-table.json`
- Modify: `apps/component-library/lib/preview-seo-registry.ts`
- Modify: `apps/component-library/components/sidebar/sidebar-data.ts`
- Modify: `apps/component-library/lib/site-search-entries.ts` if needed.
- Modify: `apps/component-library/lib/home-install-commands.ts` if component install lists are explicit.

- [ ] Add a live docs page that demonstrates searching, selection, visibility, pagination, and bulk actions.
- [ ] Register the route, SEO document, sidebar item, and homepage install/search surfaces following existing docs patterns.

### Task 4: Verification

**Files:**

- Modify generated health docs only if new tests change counts.

- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/ui/data-table/data-table.test.tsx`.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components check:props`.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components check:exports` if build artifacts are available; otherwise report that a package build is required first.
- [ ] Run `pnpm --filter @zentauri-ui/zentauri-components update:test-health` if test health data needs refreshing.
