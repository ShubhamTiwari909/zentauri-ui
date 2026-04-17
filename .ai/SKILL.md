---
name: zentauri-component-planner
description: Plan, scaffold, and review new Zentauri UI components (React + Tailwind + Framer Motion) in the zentauri-ui repo, including CVA variant recipes, animation presets, accessibility + tests, and wiring into the component preview app (routes + sidebar). Use when adding a new component under apps/component-library/components/ui and/or a matching preview page under apps/component-library/app/preview.
---

# Zentauri UI Component Planner

## Overview

Create a consistent, project-aligned plan (and optionally a scaffold checklist) for new UI primitives and their preview pages in this repo.

Keep outputs aligned with existing patterns in:

- `apps/component-library/components/ui/*`
- `apps/component-library/components/preview/*`
- `apps/component-library/app/preview/*`
- `apps/component-library/components/sidebar/sidebar-data.ts`

For detailed conventions, load `references/zentauri-ui-conventions.md`.

## Workflow (planning-first)

### 0) Confirm scope and naming

Decide:

- Component display name (PascalCase), e.g. `Button`, `Input`, `Tabs`
- Route/group segment (lowercase, usually plural), e.g. `buttons`, `inputs`, `tabs`
- Primitive vs composite (does it wrap native elements? does it compose other primitives?)

If this component needs a preview page, ensure the route segment is stable because it becomes:

- `apps/component-library/app/preview/<segment>/page.tsx`
- `apps/component-library/components/preview/<segment>/...`
- an entry in `apps/component-library/components/sidebar/sidebar-data.ts`

### 1) Read the current conventions (fast)

Before proposing API/structure, inspect at least:

- `apps/component-library/components/ui/buttons/*` (variants + motion + test style)
- `apps/component-library/components/ui/inputs/*` (polymorphic `as`, error handling, a11y)
- `apps/component-library/components/preview/buttons/*` (preview structure + sections)
- `apps/component-library/components/sidebar/sidebar-data.ts` (navigation wiring)

If you are going to edit any Next.js app code, heed `apps/component-library/AGENTS.md` (this repo’s Next.js may differ from your prior assumptions).

### 2) Produce the “Component Plan” output

Output a single Markdown plan with these sections (keep it short but concrete):

1. **Goal & non-goals**
2. **Public API contract**
   - props (types + defaults), events, controlled/uncontrolled decisions
   - polymorphism (`as`) if needed, and which HTML elements are supported
3. **Slots & stable selectors**
   - define `data-slot="<component>"` on the root (or documented slot strategy)
4. **Variants (CVA)**
   - list variant dimensions (`appearance`, `size`, `state`, etc.)
   - note any compoundVariants and why
5. **Motion (Framer Motion)**
   - list animation preset names and behavioral intent
   - define which motion props presets are allowed to touch
6. **Accessibility**
   - roles/aria, focus states, error messaging linkage, keyboard behavior
7. **Files & exports**
   - where the component lives and what files get created
8. **Preview page wiring**
   - route, sidebar entry, preview sections, code examples
9. **Tests**
   - contract tests (data-slot, displayName, defaults, variant classes, a11y hooks)
10. **Validation commands**

- `pnpm -C apps/component-library test`
- `pnpm -C apps/component-library lint` (if applicable)

Use the existing `Button` and `Input` tests as the contract bar: validate the stable selectors and explicit defaults.

### 3) (Optional) Generate a plan skeleton with the bundled script

Run:

- `python3 codex-skills/zentauri-component-planner/scripts/generate_component_plan.py --name "Tabs" --segment "tabs"`

Then edit the generated plan to match actual component needs.

### 4) (Optional) Proceed from plan → implementation

If the user asks to implement (not just plan), follow the plan and keep the implementation consistent with existing patterns:

- `components/ui/<segment>/` should include `types.ts`, `variants.ts`, `animations.ts` (if animated), `index.ts`, and a contract test.
- Preview wiring should include route + sidebar data update + `components/preview/<segment>/`.

## Resource pointers

- Conventions and “what good looks like”: `references/zentauri-ui-conventions.md`
- Plan generator script: `scripts/generate_component_plan.py`
