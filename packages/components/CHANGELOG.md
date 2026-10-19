# @zentauri-ui/zentauri-components Changelog

## 2.18.0

### Minor Changes

- 97b0e7d: Add `DecryptedText` (`@zentauri-ui/zentauri-components/ui/decrypted-text`): text that cycles random glyphs and resolves into the real string without shifting the line. It decodes on mount, in view, or on hover and keyboard focus. Letters resolve from the start, end, centre or at random, or all together after a set number of steps, and land with a scramble, fade or flip effect. The real text stays in a visually hidden copy for assistive tech, and the server HTML is deterministic. Reduced motion and no-script environments show the final text. No animation dependency is required.
- 1f99485: Add `MaskedHeading` (`@zentauri-ui/zentauri-components/ui/masked-heading`): a semantic `h1`–`h6` whose words act as windows onto an image, a muted looping video, or a token-driven gradient mesh. Words rise out of their own line masks, or the media wipes or fades in, on mount or once the heading scrolls into view. Afterwards the media drifts slowly and slides under the letters with a mouse or pen. The entrance runs on one dependency-free animation loop that pauses off-screen. Reduced-motion preferences, forced colors and no-script environments all fall back to the final, readable heading.
- 97b0e7d: Add `ScrollExpand` (`@zentauri-ui/zentauri-components/ui/scroll-expand`): a sticky section whose rounded image or video frame grows to full bleed as the page, or the component itself, scrolls. Its headline lifts away and overlay content fades in, then holds before the section releases. The layout is pure CSS, so there is no shift after hydration. One time-smoothed animation loop writes only clip-path, transforms and opacity, and stops once settled. Hidden overlay content stays inert, video plays only on screen, and reduced motion shows the expanded composition without pinning or scroll-linked movement.

## 2.17.0

### Minor Changes

- e043423: Add useDebouncedCallback with stable trailing-edge scheduling, cancel/flush controls, reactive pending state and automatic unmount cleanup. Includes typed argument/result inference, an autosave preview and source vendoring through the hooks entry.
- b5bd94a: Add typography scale, font, rhythm and code-surface tokens while preserving default styles. Extend Heading and Text with display/fluid sizing, alignment, weight, leading, tracking, wrapping, readable widths, text presets, mono fonts and tabular numerals. Add Strong, Emphasis, Small and VisuallyHidden with native semantics and ref support.
- 5dd8867: Add Mark and literal Unicode-aware HighlightText, CSS-only TruncateText, and native ExpandableText disclosure. Introduce useTextOverflow with callback refs, collapsed-state measurement, resize/font observation and deterministic initial output. Includes paired theme tokens, typography/hook previews and transitive source-vendoring support.
- ffaa8b3: Add useNumberFormat with deterministic locale defaults, native Intl format/parts output and a bounded formatter cache. Add static NumberText with native refs/attributes, tabular typography, separate Intl formatting options and optional part styling. Includes numeric/hook previews and transitive source-vendoring support without a Motion dependency.
- 0308a38: Add Time Travel Inspector with checkpoint-based history, synchronized state and visual previews, snapshot comparison, bookmarks, and historical-state callbacks.

  Expose the pure history helpers through the server-safe `ui/time-travel-inspector/history` entry, with immutable snapshot types, typed change variants, and nonempty removal paths.

- 9b039a2: Add Change Impact Explorer with cycle-safe dependency traversal, explanation paths, before/after comparisons, accessible selection, bounded rendering, and a server-safe graph helper entry.
- 1710882: Add Prose for scoped rendered HTML/MDX styling, TextLink for native navigation with underline/focus styles and external indicators, and responsive DescriptionList compound primitives. Includes paired theme tokens, content previews and source-vendoring support in the existing typography entry.
- 1f6b562: Add scoped native Footnotes with explicit references and backlinks, a plain-text reading-time estimator with configurable speed and locale-aware/approximate counting, and exported heading-permalink/drop-cap class recipes. Includes paired theme tokens, article examples and source-vendoring coverage in the existing typography entry. CMS extraction/editor integration remains separate.

## 2.16.0

### Minor Changes

- cbff7f0: Add accessible Form and Field primitives with connected labels, descriptions, errors, native field groups, responsive layouts, and paired theme tokens.
- dfe95a4: Add ResizablePanels, ResizablePanel, and ResizableHandle for nested horizontal and vertical workspaces, with controlled percentages, constraints, collapse and restore, pointer and keyboard resizing, RTL support, paired theme tokens, and source vendoring.
- f5fb240: Add Grid and GridItem for responsive fixed, auto-fit/auto-fill, and named-area CSS layouts. Includes one-item-per-row mobile stacking by default with a stackOnMobile opt-out, mobile-safe spans, independent spacing, semantic wrappers, themeable item surfaces, and source-vendoring support without an animation dependency.
- 2df603f: Add accessible Toolbar primitives with roving keyboard navigation, horizontal and vertical layouts, RTL support, formatting toggles, composable controls, and paired light/dark theme tokens.

## 2.15.0

### Minor Changes

- 5603eb1: Add a data-driven Activity Feed component with grouped actor, verb, and object events, themeable appearances, and preview documentation.
- bd5d9c4: Add Product 3D with GLB and glTF viewing, lighting presets, hotspots, camera controls, fullscreen, and poster fallback.
- 86205a5: Add the interactive Orbit System compound component with layered orbital rings, camera controls, selection, and themeable appearances.
- c9c7934: Add ZuiGlassCard with glass, crystal, and frosted materials, pointer tilt, dynamic glare, composable content, motion preferences, and preview documentation.
- f2c0482: Add an interactive Neural Graph component with 3D projection, clustering, selection, camera controls, and animated data flow.

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
