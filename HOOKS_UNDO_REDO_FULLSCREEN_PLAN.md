# Zentauri Hooks — `useUndoRedo` & `useFullscreen` Implementation Plan

**Two new zero-dependency hooks for `@zentauri-ui/zentauri-components`: a generic undo/redo history state manager and a cross-browser Fullscreen API wrapper.**

This document is a self-contained implementation spec. It embeds every repo convention needed, so it can be handed to any AI coding tool (or a human) and executed without reading the codebase first. Repo: pnpm 9 + Turborepo monorepo at `zentauri-ui/`, library at `packages/components`, docs app at `apps/component-library` (Next.js 16, App Router).

---

## 1. Why these two

- **`useUndoRedo`** — the library already ships editor-adjacent surfaces (`inputs`, `data-table`, `json-viewer`, `terminal-emulator`, `file-upload`) but no history-state primitive. Undo/redo is the classic "everyone reimplements it badly" hook: naive versions leak memory (unbounded history), record every keystroke as a separate entry, or lose the redo stack incorrectly. A correct, capped, transaction-grouping implementation is genuinely valuable and pairs with the existing `useHotkeys` for `⌘Z`/`⌘⇧Z` wiring.
- **`useFullscreen`** — natural companion to the media/dev-tool components (`audio-player`, `terminal-emulator`, `code-block`, `qr-scanner`, charts). The Fullscreen API has real cross-browser sharp edges (WebKit prefixes, iOS Safari limitations, Esc-key exits that bypass your state) that a hook should absorb once.

Both are client-only, dependency-free, and follow the exact structure of the existing 42 hooks.

---

## 2. Repo Conventions (embedded so this doc stands alone)

### 2.1 Hook folder structure — mirror `src/hooks/useCountdown/` exactly

Each hook lives at `packages/components/src/hooks/<hookName>/` with **three files**:

```
src/hooks/useUndoRedo/
├── useUndoRedo.ts        # implementation, fully JSDoc'd, exported types
├── useUndoRedo.test.ts   # Vitest + @testing-library/react renderHook (jsdom)
└── index.ts              # re-export: export { useUndoRedo, type ... } from "./useUndoRedo";
```

### 2.2 Library registration (per hook)

1. **`packages/components/tsup.config.ts`** — add the hook name to the `hooksEntryNames` array (keep alphabetical order; the existing list is `useBodyScrollLock` … `useWindowSize`). This drives both the build entry (`hooks/<name>` → `src/hooks/<name>/index.ts`) and the generated CLI registry.
2. **`packages/components/src/hooks/index.ts`** — add a named re-export including exported types, matching the existing style, e.g.:
   ```ts
   export {
     useUndoRedo,
     type UseUndoRedoOptions,
     type UseUndoRedoReturn,
   } from "./useUndoRedo";
   ```
3. **Never hand-edit `cli/registry.json`** — it regenerates from `tsup.config.ts` via `scripts/generate-registry.mjs` (`npm run generate:registry`, also on `prepack`).
4. `package.json` exports use wildcards (`./hooks/*`) — no per-hook export edit needed. Consumers import `@zentauri-ui/zentauri-components/hooks/useUndoRedo`.

### 2.3 Docs app registration (per hook) — hook pages are data-driven, no new route files

The hooks docs use a single dynamic route (`app/preview/hooks/[slug]/page.tsx`) fed by a registry. Register each hook in **four places** in `apps/component-library/`:

1. **`lib/constants.ts`** — add an entry to `HOOK_PREVIEW_REGISTRY` (keep alphabetical by slug):
   ```ts
   {
     slug: "use-undo-redo",
     module: "useUndoRedo",
     name: "useUndoRedo",
     description: "Undo/redo state history with bounded depth, transaction grouping, and jump-to-index.",
     intro: "Text editors, canvas tools, form builders, and any stateful UI where mistakes must be reversible.",
   },
   ```
   `generateStaticParams`, slug validation, and SEO metadata (`lib/hook-preview-seo.ts` builds the full SEO document from this entry) all derive from this registry — **no SEO JSON file is needed for hooks**.
2. **`components/preview/hooks/demo-router.tsx`** — import the hook from `@zentauri-ui/zentauri-components/hooks/<module>` and add a `case "<slug>":` rendering the live demo (see the `case "use-countdown":` block as the template; demos are defined in this file/its siblings).
3. **`components/preview/hooks/demo-full-sources.ts`** — add the demo's source-code string shown in the "Show code" toggle.
4. **`components/sidebar/sidebar-data.ts`** — add the hook to `sidebarHooksData` (this also feeds the in-site search index via `lib/site-search-entries.ts` — do not edit that separately).

### 2.4 Commands

```sh
# use Node 20 first (default shell Node may be v14): nvm use 20.13.1
pnpm --filter @zentauri-ui/zentauri-components test                      # all library tests
pnpm --filter @zentauri-ui/zentauri-components exec vitest run src/hooks/useUndoRedo/useUndoRedo.test.ts
pnpm check-types && pnpm lint
pnpm exec turbo run dev --filter=component-library                       # docs app + tsup --watch
pnpm --filter @zentauri-ui/zentauri-components update:test-health        # regenerate test-count surfaces (never hand-edit)
```

---

## 3. Hook Spec: `useUndoRedo`

### 3.1 API

```ts
export interface UseUndoRedoOptions<T> {
  /** Maximum number of past states retained. Oldest entries are dropped. Default 100. */
  maxHistory?: number;
  /**
   * Equality check used to skip no-op commits (set() with an equal value records
   * nothing). Default: Object.is.
   */
  isEqual?: (a: T, b: T) => boolean;
  /**
   * When > 0, set() calls arriving within this window are merged into ONE history
   * entry (transaction grouping — e.g. typing "hello" is one undo step, not five).
   * The present value always updates immediately; only history-entry creation is
   * grouped. Default 0 (every set() is its own entry).
   */
  groupWithinMs?: number;
  /** Called after every history-affecting operation with the new snapshot. */
  onChange?: (snapshot: UndoRedoSnapshot<T>, action: UndoRedoAction) => void;
}

export type UndoRedoAction =
  | "set"
  | "replace"
  | "undo"
  | "redo"
  | "jump"
  | "clear";

export interface UndoRedoSnapshot<T> {
  past: readonly T[];
  present: T;
  future: readonly T[];
}

export interface UseUndoRedoReturn<T> {
  /** Current value. */
  state: T;
  /** Commit a new value (or updater) as a history entry. Clears the redo stack. */
  set: (value: T | ((prev: T) => T)) => void;
  /**
   * Update the present value WITHOUT creating a history entry (e.g. transient
   * drag positions, live previews). Does not clear the redo stack.
   */
  replace: (value: T | ((prev: T) => T)) => void;
  /** Step back. No-op when canUndo is false. */
  undo: () => void;
  /** Step forward. No-op when canRedo is false. */
  redo: () => void;
  /**
   * Jump to an absolute point in the timeline. Index 0 = oldest past entry,
   * past.length = present, past.length + future.length = newest future entry.
   * Out-of-range indices clamp. */
  jumpTo: (index: number) => void;
  /** Reset history. With an argument, also resets the present value. */
  clear: (initialValue?: T) => void;
  canUndo: boolean;
  canRedo: boolean;
  /** Read-only view of the timeline (for history panels / debug UIs). */
  history: UndoRedoSnapshot<T>;
}

export function useUndoRedo<T>(
  initialValue: T | (() => T),
  options?: UseUndoRedoOptions<T>,
): UseUndoRedoReturn<T>;
```

### 3.2 Implementation notes

- **Core**: a single `useReducer` over `{ past: T[], present: T, future: T[] }`.
  - `set`: push `present` onto `past` (dropping the head when `past.length === maxHistory`), set new present, **empty `future`**. Skip entirely when `isEqual(present, next)`.
  - `undo`: pop last of `past` → present; old present unshifts onto `future`.
  - `redo`: shift first of `future` → present; old present pushes onto `past`.
  - `jumpTo(i)`: rebuild past/present/future by splitting the flat timeline `[...past, present, ...future]` at the clamped index — one splice, no loops over reducer dispatches.
  - `replace`: swap `present` only. Deliberately does **not** clear `future` (documented).
- **Transaction grouping** (`groupWithinMs`): keep a `useRef` timestamp of the last `set`. If the new `set` arrives within the window **and** the last action was also a grouped `set`, dispatch a `replace-present-keep-history` action instead of a push. Use `performance.now()` via a ref — no timers needed, so nothing to clean up, and jsdom fake timers still work in tests via `vi.spyOn(performance, "now")`.
- **Updater support**: `set`/`replace` accept `(prev: T) => T`; resolve inside the reducer so rapid calls compose correctly (no stale closures). Guard against the "function as value" ambiguity the same way React does — document that storing function values requires wrapping (`set(() => fn)`).
- **Stable identities**: `set`, `replace`, `undo`, `redo`, `jumpTo`, `clear` are all `useCallback`-stable with empty/ref-based deps so consumers can pass them to `useHotkeys` and memoized children safely.
- **No structural cloning**: history stores references. Document that `T` should be treated as immutable (same contract as React state).
- **SSR-safe by construction**: no browser APIs at all. This hook works in RSC-adjacent client components with zero guards.
- **Docs demo wiring** (not part of the hook): compose with the existing `useHotkeys` — `mod+z` → `undo`, `mod+shift+z` → `redo` — in the demo-router demo.

### 3.3 Tests (`useUndoRedo.test.ts`, `renderHook` + `act`)

1. Initial state: `state === initial`, `canUndo/canRedo` false, empty past/future.
2. Lazy initializer (`() => value`) called once.
3. `set` then `undo` restores; `redo` re-applies; `canUndo/canRedo` flags track correctly through a multi-step sequence.
4. New `set` after `undo` clears `future` (the classic branch-discard behavior).
5. Functional updater sees the latest present across two `set` calls in one `act`.
6. `isEqual` skip: `set` with an equal value adds no entry (default `Object.is` and a custom deep-ish comparator).
7. `maxHistory` cap: commit `maxHistory + 5` values → `past.length === maxHistory`, oldest dropped, undo chain ends at the right value.
8. `replace` changes `state` without adding a past entry and without touching `future`.
9. `groupWithinMs`: two `set` calls with mocked `performance.now()` inside the window produce ONE past entry; a third outside the window produces a second entry; `undo` after grouped typing restores the pre-group value.
10. `jumpTo`: to 0 (oldest), to end (newest future), out-of-range clamps; `history` snapshot shape matches after each jump.
11. `clear()` empties history keeping present; `clear(newValue)` resets present too.
12. `onChange` fires with the right `action` labels.
13. Callback identity stability across re-renders (capture refs, `expect(first).toBe(second)`).

---

## 4. Hook Spec: `useFullscreen`

### 4.1 API

```ts
export interface UseFullscreenOptions {
  /** Passed to requestFullscreen. Default: { navigationUI: "auto" }. */
  requestOptions?: FullscreenOptions;
  onEnter?: (element: Element) => void;
  onExit?: () => void;
  /** Request/exit rejections land here (and in the returned promise). */
  onError?: (error: Error) => void;
}

export interface UseFullscreenReturn {
  /** True while the resolved target is the document's fullscreen element. */
  isFullscreen: boolean;
  /**
   * Whether the Fullscreen API is available for element fullscreen in this
   * runtime (document.fullscreenEnabled, including WebKit-prefixed check).
   * Always false during SSR/pre-mount.
   */
  isSupported: boolean;
  /** Enter fullscreen on the target. Resolves after the request settles. */
  enter: () => Promise<void>;
  /** Exit fullscreen if the target (or anything) is fullscreen. */
  exit: () => Promise<void>;
  toggle: () => Promise<void>;
  /** The element currently fullscreen document-wide, or null (any element, not just the target). */
  fullscreenElement: Element | null;
}

/**
 * Without a target, the whole page (document.documentElement) goes fullscreen.
 * With a ref (the common case), that element does.
 */
export function useFullscreen<T extends HTMLElement = HTMLElement>(
  target?: React.RefObject<T | null> | T | null,
  options?: UseFullscreenOptions,
): UseFullscreenReturn;
```

### 4.2 Implementation notes

- **Vendor prefixes (WebKit/Safari — non-negotiable for correctness)**: build tiny internal resolvers used everywhere instead of direct property access:
  - request: `el.requestFullscreen ?? el.webkitRequestFullscreen`
  - exit: `document.exitFullscreen ?? document.webkitExitFullscreen`
  - element: `document.fullscreenElement ?? document.webkitFullscreenElement`
  - enabled: `document.fullscreenEnabled ?? document.webkitFullscreenEnabled`
  - events: listen to **both** `fullscreenchange` and `webkitfullscreenchange` (and the matching `…error` events). Type the prefixed members via a small `DocumentWithWebkit` / `ElementWithWebkit` internal interface — no `any`.
  - Older WebKit's `webkitRequestFullscreen` returns `undefined`, not a Promise — wrap in `Promise.resolve(...)`.
- **State tracking must be event-driven, not call-driven**: the user can exit via the Esc key or browser UI without calling `exit()`. The single source of truth for `isFullscreen` is the `fullscreenchange` listener reading the (prefixed) `fullscreenElement` and comparing it to the resolved target (`isFullscreen = fsEl !== null && (fsEl === resolvedTarget || resolvedTarget.contains?.(fsEl) === false ? fsEl === resolvedTarget : fsEl === resolvedTarget)` — keep it strict equality with the resolved target; expose `fullscreenElement` for consumers who want looser checks). Attach listeners with the existing **`useEventListener`** hook (it's already in the library) targeting `document`.
- **Target resolution**: accept a ref or a direct element; resolve at call/event time (`target && "current" in target ? target.current : target`) falling back to `document.documentElement`. Never resolve during render.
- **SSR safety**: no `document` access at module or render scope. `isSupported` starts `false` and is computed in an effect (or on first client render via `useIsMounted`-style gating). `enter()` on an unsupported runtime rejects with a descriptive `Error("Fullscreen API is not supported...")` routed through `onError`.
- **Error semantics**: `requestFullscreen` rejects when not triggered by user activation or when permission is denied (iframes need `allow="fullscreen"`). Catch, call `onError`, and re-throw so the returned promise also rejects — callers may `await toggle()` in a click handler and show a toast.
- **iOS Safari caveat (document it, don't fight it)**: iPhone Safari does not support element fullscreen (only `<video>` via `webkitEnterFullscreen`). `isSupported` correctly reports `false` there; the docs page must state this explicitly.
- **Cleanup**: `useEventListener` handles listener teardown. Do **not** auto-exit fullscreen on unmount by default (the browser does it when the element leaves the DOM); no timers, no leaks.
- **Stable identities**: `enter`/`exit`/`toggle` are `useCallback`-stable (options accessed via refs so changing `onEnter` doesn't re-create them).

### 4.3 Tests (`useFullscreen.test.ts`)

jsdom has **no Fullscreen API** — every test stubs it. Build a small local harness in the test file:

```ts
function installFullscreenStub() {
  let fsElement: Element | null = null;
  Object.defineProperty(document, "fullscreenElement", {
    get: () => fsElement,
    configurable: true,
  });
  Object.defineProperty(document, "fullscreenEnabled", {
    get: () => true,
    configurable: true,
  });
  HTMLElement.prototype.requestFullscreen = vi.fn(function (this: HTMLElement) {
    fsElement = this;
    document.dispatchEvent(new Event("fullscreenchange"));
    return Promise.resolve();
  });
  document.exitFullscreen = vi.fn(() => {
    fsElement = null;
    document.dispatchEvent(new Event("fullscreenchange"));
    return Promise.resolve();
  });
  /* return a teardown that deletes the defineProperties */
}
```

1. `isSupported` true with the stub installed; false when `fullscreenEnabled` is absent/false.
2. `enter()` calls `requestFullscreen` on the ref target (not documentElement) and `isFullscreen` flips true after the event.
3. No target → `document.documentElement.requestFullscreen` is called.
4. `exit()` → `isFullscreen` false; `toggle()` round-trips.
5. **External exit**: mutate the stub's element to null and dispatch `fullscreenchange` directly (simulating Esc) → `isFullscreen` becomes false without any hook call.
6. Another element going fullscreen → `isFullscreen` stays false for our target but `fullscreenElement` reports it.
7. Rejection path: make `requestFullscreen` reject → promise rejects, `onError` called, `isFullscreen` stays false.
8. WebKit path: delete the standard members, install `webkitRequestFullscreen`/`webkitFullscreenElement`/`webkitfullscreenchange` equivalents → everything still works.
9. `onEnter`/`onExit` fire exactly once per transition.
10. Unmount removes listeners (dispatch after unmount → no state update warning; `vi.spyOn(document, "addEventListener")` / `removeEventListener` counts match).

---

## 5. Docs App Demos (Phase 2 content)

- **`use-undo-redo` demo**: a small text input + color/tag editor whose state runs through the hook; buttons for Undo/Redo (disabled from `canUndo`/`canRedo`), a visual history timeline (dots; click = `jumpTo`), and `useHotkeys` wiring for `mod+z` / `mod+shift+z`. Show `groupWithinMs: 500` so typing groups into words — that's the "aha" moment.
- **`use-fullscreen` demo**: a themed card (reuse the `card` component) containing a chart or the `code-block` component, with an "Enter fullscreen" button; show `isSupported` guard rendering a disabled state with an explanatory tooltip, and the state staying correct after Esc.
- Both demos: add the `case` in `components/preview/hooks/demo-router.tsx`, the source string in `components/preview/hooks/demo-full-sources.ts`, and match the visual style of the `use-countdown` demo.

Registry entries (`lib/constants.ts`):

```ts
{
  slug: "use-fullscreen",
  module: "useFullscreen",
  name: "useFullscreen",
  description:
    "Cross-browser Fullscreen API wrapper with WebKit prefixes, event-driven state, and promise-based enter, exit, and toggle.",
  intro:
    "Media viewers, charts, code panels, and kiosk views that expand to fullscreen and track Esc-key exits correctly.",
},
{
  slug: "use-undo-redo",
  module: "useUndoRedo",
  name: "useUndoRedo",
  description:
    "Undo/redo state history with bounded depth, transaction grouping, replace-without-commit, and jump-to-index.",
  intro:
    "Editors, canvas tools, and form builders where every change must be reversible with ⌘Z.",
},
```

---

## 6. Execution Checklist

### Phase 1 — Library (`packages/components`)

- [ ] `src/hooks/useUndoRedo/{useUndoRedo.ts, useUndoRedo.test.ts, index.ts}` per §3.
- [ ] `src/hooks/useFullscreen/{useFullscreen.ts, useFullscreen.test.ts, index.ts}` per §4 (reuse `useEventListener` internally).
- [ ] Add `"useFullscreen"` and `"useUndoRedo"` to `hooksEntryNames` in `tsup.config.ts` (alphabetical: `useFullscreen` after `useFocusManagement`; `useUndoRedo` after `useToggle`).
- [ ] Re-export both (with types) from `src/hooks/index.ts` matching house style.
- [ ] `pnpm --filter @zentauri-ui/zentauri-components test` green; `pnpm check-types` green.
- [ ] One `pnpm --filter @zentauri-ui/zentauri-components build` to confirm the new `hooks/*` entries emit and the CLI registry regenerates.

### Phase 2 — Docs app (`apps/component-library`)

- [ ] `HOOK_PREVIEW_REGISTRY` entries in `lib/constants.ts` (§5) — SEO pages generate automatically from these.
- [ ] Demo cases in `components/preview/hooks/demo-router.tsx` + imports.
- [ ] Source strings in `components/preview/hooks/demo-full-sources.ts`.
- [ ] `sidebarHooksData` entries in `components/sidebar/sidebar-data.ts` (search index updates automatically).
- [ ] Verify in the dev server: `/preview/hooks/use-undo-redo` and `/preview/hooks/use-fullscreen` render, demos work, sidebar + search find them.

### Phase 3 — Finalize

- [ ] `pnpm --filter @zentauri-ui/zentauri-components test:all` green.
- [ ] `pnpm --filter @zentauri-ui/zentauri-components update:test-health` (regenerates all four test-count surfaces — never hand-edit them).
- [ ] Root `pnpm build && pnpm check-types && pnpm lint` green.

## 7. Acceptance Criteria

- [ ] `import { useUndoRedo } from "@zentauri-ui/zentauri-components/hooks/useUndoRedo"` and `.../hooks/useFullscreen` both resolve (ESM + CJS + types).
- [ ] `zentauri-ui add useUndoRedo` / `useFullscreen` vendor the source via the regenerated registry.
- [ ] `useUndoRedo`: branch-discard on new commits after undo; `maxHistory` bounded; grouped typing is one undo step; all returned callbacks referentially stable.
- [ ] `useFullscreen`: Esc-key exit reflected in `isFullscreen` without any hook call; works through WebKit-prefixed API in tests; `isSupported === false` never throws, and `enter()` rejects descriptively.
- [ ] Zero new dependencies; both hooks SSR-safe (no browser API access at render time); no timer/listener leaks on unmount.
- [ ] Docs pages live for both slugs with working demos; test-health surfaces regenerated.

## 8. Out of Scope

- Persistence of history (localStorage/IndexedDB) — v2; composes with the existing `useLocalStorage`.
- Multi-document / cross-component shared history (would need a provider).
- `useUndoRedo` patch-based diffing (stores whole snapshots by reference — fine for typical UI state; document the memory contract).
- Fullscreen for `<video>` on iOS via `webkitEnterFullscreen` (video-element-specific API; belongs to a future `video-player` component, not this hook).
