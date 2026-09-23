---
name: add-component
description: Add a complete public component to Zentauri UI and its component-library preview.
---

# Add a Zentauri UI component

Follow the canonical repository workflow in
[`../../.claude/skills/add-component/SKILL.md`](../../.claude/skills/add-component/SKILL.md)
and use [`../../docs/component-creation-guide.md`](../../docs/component-creation-guide.md)
as the concise delivery checklist. Read [`../../AGENTS.md`](../../AGENTS.md) and
[`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) first.

## Required outcome

Deliver the component end-to-end—not only a demo:

1. Add design-system tokens, variants, types, static base/entry/barrel, tests, and
   optional isolated animation entry under `packages/components`.
2. Export the token module, add the slug to `src/lib/facade.ts`'s `componentSlugs`, and
   extend facade coverage.
3. Register the static/animated entries in `tsup.config.ts` and regenerate the CLI,
   props, and test-health outputs using their scripts.
4. Create a **minor Changeset**. Do not hand-edit the package version, changelog, or
   generated registry/health files.
5. Add the docs route, preview, typed demos/snippets, SEO record/registry, navigation,
   CSS-variable reference, and a playground that includes all appearances.

## Review guards

- Every `--zui-*` token used in the design-system strings needs a fallback, dark pair,
  and matching CSS-variable inventory entry. List all tokens for a new manageable
  reference; `darkVariableCount` is the total supported dark variables, not merely the
  number of examples displayed.
- Preserve valid `ReactNode` content such as `0`: check optional node values for nullish
  absence rather than truthiness.
- The static entry must not import Framer Motion.
- Appearance selector cards must be keyboard accessible and must not nest interactive
  content in a native button.
- Site search derives from sidebar data; do not add a separate search entry.

Use targeted tests and checks first, then inspect the preview in light/dark mode and
every appearance before handoff.
