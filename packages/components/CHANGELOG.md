# @zentauri-ui/zentauri-components Changelog

## 2.15.0

### Minor Changes

- 22c9191: Add the accessible Gauge component with radial and dial variants, custom ranges and value formatting, tokenized appearances, and documentation.
- e68b87e: Add an accessible Image Compare component with pointer and keyboard controls, controlled and uncontrolled positions, tokenized appearances, and documentation.

## 2.14.0

### Minor Changes

- 774da04: Add the SortableList component: a reorderable list with native drag-and-drop, accessible move buttons, and modifier+arrow keyboard reordering that stays available when the buttons are hidden. Ships the `--zui-sortable-list-*` token contract across 15 appearances plus `glass` and three gradients, in sm/md/lg sizes.

## 2.2.0

### Minor Changes

- 398393d: Add compact global theme tokens and generated theme CSS support for the Zentauri UI token system.

## 2.0.0

### Major Changes

#### Extender hooks list

- useEventListener Fundamental utility — safely attach/remove any DOM event
- usePrevious Track previous value across renders — very common pattern
- useInterval / useTimeout Safe, cleanup-aware timer hooks
- useCountdown Countdown timer with pause/resume
- useKeyPress / useHotkeys Keyboard shortcut management
- useScrollPosition Track scroll X/Y (differs from useInView)
- useCookie Cookie read/write with reactive updates
- useGeolocation Browser geolocation with permission state
- useLongPress Long-press gesture support
- useVirtualList Virtual scrolling for large lists (critical for performance)
- useIdleTimeout Detect user inactivity (session management)

## 1.9.0

### Minor Changes

- introduced dark variant checker script and minor codebase changes

## 1.8.42

### Patch Changes

- 74403ce: Add npm trust metadata, package license/changelog files, and Changesets release infrastructure.

All notable changes to this package will be documented in this file.

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and release notes. Add a changeset with `pnpm changeset` for every user-facing package change.

## 1.8.41

Initial changelog baseline for the published package. Earlier release history is available on GitHub Releases:

<https://github.com/ShubhamTiwari909/zentauri-ui/releases>
