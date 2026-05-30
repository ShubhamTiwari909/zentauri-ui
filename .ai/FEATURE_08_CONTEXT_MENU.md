# Feature 08 - ContextMenu

## Scope

- Add a static `@zentauri-ui/zentauri-components/ui/context-menu` package entry.
- Share Dropdown menu variants and `--zui-dropdown-*` styling tokens for visual consistency.
- Support right-click triggers, pointer-positioned content, labels, separators, disabled items, close-on-select behavior, Escape/outside dismissal, and nested submenus.
- Add preview route, SEO document, examples, variant code examples, sidebar/search discoverability, CLI registry coverage, and README/package health counts.

## Implementation Notes

- Package source lives in `packages/components/src/ui/context-menu`.
- Design-system aliases live in `packages/components/src/design-system/context-menu.ts` and intentionally reference dropdown variables.
- Preview route is `/preview/components/context-menu`.
- Code-example labels use `p` tags, matching the accordion preview label pattern.

## Verification

- `pnpm --filter @zentauri-ui/zentauri-components build:types` passes.
- `pnpm --filter @zentauri-ui/zentauri-components build:js` passes.
- `pnpm --filter component-library check-types` passes.
- `pnpm --filter component-library lint` passes with one existing warning in `home-component-showcase.tsx`.
- `pnpm --filter @zentauri-ui/zentauri-components test -- src/ui/context-menu/context-menu.test.tsx` is blocked by the local Vitest startup issue: Node 20 cannot require `std-env/dist/index.mjs` through Vitest 4's CommonJS config loader.
- `pnpm --filter component-library build` is blocked in the sandbox by a Turbopack helper-process port binding error; rerun outside the sandbox was not approved.
