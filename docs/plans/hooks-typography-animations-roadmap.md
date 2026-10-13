# Hooks, typography, and animations: proposed roadmap

Reviewed on 13 October 2026. This is a planning document, based on source inspection of the component package and docs registries. It does not add implementations. No builds or tests were run, so existing test files and documented counts are evidence of coverage structure, not newly verified passing results.

## Recommendation

Prioritize typography foundations and reusable interaction behavior, then expand animation composition. The library already has broad coverage of browser hooks and individual motion presets. The most useful next additions should make complete product screens easier to build and existing components more consistent.

Priority meanings: **P1** = next release candidates; **P2** = subsequent releases; **P3** = optional, after consumer demand. Proposed API names are illustrative.

## Current state

Counts come from the entry lists in `packages/components/tsup.config.ts`:

| Area                  | Current surface                                                                                                  | Assessment                                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UI                    | 90 registered primary UI entries; 52 registered animated UI entries                                              | Large base of components to compose with new hooks and typography. Primary entries include `animated-number`, whose implementation imports Motion; they are not all motion-free. |
| Hooks                 | 48 registered hooks; 48 hook test files; 48 docs preview entries                                                 | Good breadth and discoverability. All hook folders are registered.                                                                                                               |
| Typography            | Seven exports: `Heading`, `Text`, `List`, `ListItem`, `Blockquote`, `InlineCode`, `CodeBlock`; six docs sections | Good basic semantic building blocks. Limited type scale and content composition.                                                                                                 |
| Standalone animations | 41 registered entries and matching docs slugs                                                                    | Many individual effects, mostly sharing one `motion.div` factory. Limited dedicated orchestration and input-driven behavior.                                                     |

### Hooks already covered

- State: controllable state, disclosure, toggle, previous value, undo/redo, mount detection.
- Scheduling: debounced values, throttled callbacks, interval, timeout, countdown, idle timeout.
- Browser state: cookies, local/session storage, hash, clipboard, document title, fullscreen, geolocation, network, page visibility.
- Interaction: outside click, focus management, hover, hotkeys, key presses, long presses, event listeners.
- Layout/preferences: media queries, window size, resize/intersection observers, in-view status, scroll position, color scheme and reduced-motion preferences.
- Product behavior: pagination, table filtering/sorting, dynamic stepper, fixed-height virtualization, date/time/duration/relative-time/timezone formatting.

Do not add another generic `useBoolean`, `useOnClickOutside`, `useOnline`, `useElementSize`, or `useFocusTrap` solely to increase the count. Existing hooks cover those behaviors. `useFocusManagement` already traps and restores focus, closes on Escape, and locks body scroll.

### Typography already covered

`Heading` supports h1–h6 and separates semantic level from visual level through `displayLevel`. `Text` supports p/span/div/label, three sizes, tones, and visual emphasis. Lists, quotations and code have semantic HTML. Color tones include gradients with paired light/dark CSS variables.

Font sizes, weights, line heights and tracking currently use fixed utility classes. Several backgrounds, borders, highlight styles and spacing rules remain inline in base components rather than the design-system layer. Seven typography tests cover basic rendering and classes.

### Animations already covered

Fade, slide, scale, blur, directional reveal, rotate, flip, hover, press, pulse, ping, shake, bounce, wiggle, float, spin, text reveal/shimmer, skeleton shimmer, progress, layout movement and a parallax-named preset are present. The shared API already accepts target overrides, Motion transitions, viewport options, gestures and layout props. Consumers can compose Motion directly, so orchestration is possible today; convenient Zentauri recipes are the gap.

## Strengthen existing foundations first

1. **Complete the reduced-motion policy.** In `src/animations/shared/create-motion-animation.tsx`, reduced motion adjusts initial targets and in-view handling, but ordinary `animate`, repeating transitions, exit transforms, hover/tap targets and layout are still forwarded. Define stable final states and a clear rule for decorative loops, rather than relying only on initial-state substitution. The current tests mainly verify forwarding, overrides and one reduced viewport case. Add meaningful checks for loops, interaction and exit behavior.
2. **Make storage hydration consistent.** `useSessionStorage` starts from its fallback and reads after mount. `useLocalStorage` reads browser storage inside its state initializer, so stored values can differ from server output. Align the hydration policy, and provide same-document synchronization when multiple instances share a key; the existing native storage listener primarily serves other documents.
3. **Finish typography token coverage.** Move themeable backgrounds, highlight colors and borders into design-system strings; add tokens for font family, size, leading, tracking and readable width, retaining existing visual defaults. Color overrides alone cannot define a brand's typography system.
4. **Clarify effect names and preserve compatibility.** The exported `Parallax` preset loops y values on a timer; `Magnetic` moves to a fixed hover offset; `Tilt` loops rotations; `TextReveal` animates its wrapper; `Reorder` enables layout animation without owning drag/reorder state. Introduce distinct APIs for richer behavior, or plan a versioned upgrade. Existing `sortable-list` already provides a sorting surface.
5. **Refresh published surface metadata when shipping.** The README currently lists 89 primary UI entries while the current build list contains 90. Use the repository generators rather than manually patching generated registry data. Keep new docs, search, CLI and tests aligned with each release.

Motion's [accessibility guidance](https://motion.dev/docs/react-accessibility) describes a global reduced-motion setting and tailored alternatives. Its [scroll guide](https://motion.dev/docs/react-scroll-animations) distinguishes viewport-triggered effects from effects linked continuously to scroll position; that distinction should also be explicit in Zentauri's documentation.

## Hook additions

| Priority | Proposed addition      | Useful behavior and existing integration                                                                                                                                                                     |
| -------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P1       | `useDebouncedCallback` | Stable callable debounce with cancel, flush and pending state. Complements the existing value debounce; useful for autosave and delayed search actions.                                                      |
| P1       | `useComposedRefs`      | Combine consumer and internal refs safely. Extract duplicated helpers from Popover/ContextMenu, including callback-ref cleanup semantics for supported React versions.                                       |
| P1       | `useRovingFocus`       | Arrow/Home/End navigation, orientation, RTL, disabled items and one tab stop. Share across Toolbar, Tabs, RadioGroup and other suitable composites.                                                          |
| P1       | `useTypeahead`         | Buffered keyboard matching for Select, menus and TreeView. Make composition, locale and disabled-item behavior explicit.                                                                                     |
| P1       | `useSelection`         | Controlled/uncontrolled single or multiple selection, select-all and indeterminate state. Useful for DataTable, lists and future selectable grids; define visible-page versus all-data selection explicitly. |
| P1       | `useNumberFormat`      | Cached locale formatting for decimals, currency, percentages, compact notation and units. Complements the existing time-format hooks.                                                                        |
| P2       | `useQueryState`        | Typed URL query state with replace/push and back/forward synchronization. Share table filters, pagination and search results; keep a browser core and optional framework adapters.                           |
| P2       | `useScrollProgress`    | Normalized document/container progress plus direction. Useful for reading indicators and sticky headers; keep Motion values in a separate optional entry.                                                    |
| P2       | `useScrollSpy`         | Identify the current content section, with header offsets and a documented tie-breaking rule. Useful for docs and long articles.                                                                             |
| P2       | `useTextOverflow`      | Detect actual truncation, remeasure on text/layout changes and power conditional tooltips. Extend existing ResizeObserver behavior rather than duplicating it.                                               |
| P2       | `useSwipe`             | Pointer-based directional gestures with thresholds and cancellation. Useful for Carousel and Drawer; preserve native scroll behavior and avoid hijacking vertical gestures.                                  |
| P2       | `useAsyncAction`       | Pending/error/result/reset state for user-triggered work, duplicate-action control and optional cancellation. Keep it small; do not grow it into a server-cache library.                                     |

Roving focus and active-descendant navigation are distinct patterns in the [WAI-ARIA keyboard guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/); a shared helper should let components retain the appropriate strategy. Number formatting can use the native [Intl.NumberFormat API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat), with explicit locale options to keep output predictable.

Further candidates: a focus-visible helper, a live-announcement hook, collision-aware floating-position integration, and a text-selection hook for annotation tools. These need concrete consumer use cases before expanding the public surface.

## Typography additions and extensions

The detailed APIs, implementation tasks, verification gates and branch strategy are in [the typography implementation plan](./typography-implementation-plan.md).

| Priority | Proposed addition                  | Purpose                                                                                                                                                                                                       |
| -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | Typography scale tokens            | Brandable body/display/mono fonts, sizes, weights, leading and tracking. Add responsive/fluid opt-in scales while preserving current defaults.                                                                |
| P1       | `Prose` / `RichText` container     | Consistent nested headings, paragraphs, lists, links, quotes, code, tables and images for docs, articles and rendered MDX. Style already-rendered markup; no Markdown parser or raw HTML injection is needed. |
| P1       | `TextLink`                         | Semantic anchor with tone, underline and focus styles. Support an optional external indicator; compose framework links through an adapter or child composition.                                               |
| P1       | `DescriptionList`                  | `dl`/`dt`/`dd` composition with stacked, inline and responsive layouts for settings, account details and API metadata.                                                                                        |
| P1       | Extend `Heading` / `Text`          | Alignment, explicit weight, leading, tracking, text wrapping/balance, tabular numerals and practical size coverage. Expose common needs as variants while retaining className escape hatches.                 |
| P2       | `HighlightText` / `Mark`           | Semantic marked text and safe query-match highlighting. Useful for Search, Command, logs and document results; handle string content without injecting HTML.                                                  |
| P2       | `TruncateText` / `ExpandableText`  | One or multiple line limits and optional disclosure of the full content. Compose with overflow detection and avoid making content available only through hover.                                               |
| P2       | `NumberText`                       | Static locale-aware numbers/currency/percentages/units, with tabular alignment and formatting parts. Reuse `useNumberFormat`; compose existing AnimatedNumber when motion is wanted.                          |
| P2       | `VisuallyHidden`                   | Reusable screen-reader text primitive, including focusable skip-link support. Useful across icon buttons, loaders and charts.                                                                                 |
| P2       | Semantic emphasis and text presets | `Strong`, `Emphasis`, and caption/lead/overline presets. Prefer semantic tags and presets over many near-identical component entries.                                                                         |

Later: footnotes with backlinks, heading permalink recipes, localized reading-time helpers and editorial drop caps. Gradient tones already exist; another gradient-text primitive has little immediate value. Kbd and a richer CodeBlock also exist as separate UI entries, so extend or document those rather than creating competing versions.

## Animation additions and upgrades

| Priority | Proposed addition                 | Purpose                                                                                                                                                                     |
| -------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | `MotionProvider` + motion tokens  | Shared duration/easing/spring presets, user preference and a deliberate decorative-loop policy. Keep it on an optional motion entry so static consumers remain independent. |
| P1       | `StaggerGroup` / `StaggerItem`    | Reusable list/grid entrances with delay caps, reverse ordering and viewport options. Generalize patterns currently embedded in individual viewers.                          |
| P1       | `PresenceTransition`              | Convenient keyed state transitions with clear enter/exit behavior and retain-during-exit semantics. Useful for empty/loading/success states, Tabs and Wizard.               |
| P1       | `AutoHeight`                      | Animate changing content height for expanded details, validation messages and asynchronously loaded panels. Handle resize updates and reduced motion.                       |
| P2       | `ScrollParallax` / scroll reveal  | Real scroll-position-driven layers and reading progress. Separate continuous scroll linkage from existing `whileInView` entrance effects.                                   |
| P2       | `PointerTilt` / `PointerMagnetic` | Pointer-relative movement with bounds, spring reset, fine-pointer gating and reduced-motion fallbacks. Complement the existing preset effects.                              |
| P2       | `SplitTextReveal`                 | Word/grapheme/line staggering, replay control and accessible unsplit text. Preserve whitespace, Unicode and meaningful heading markup.                                      |
| P2       | `SharedLayout` recipe             | Shared-element transitions for selection indicators, cards and item/detail views. Generalize what BentoGrid already demonstrates before introducing another engine.         |
| P3       | `TypewriterText` / `RotatingText` | Marketing headlines and onboarding messages; stable accessible text and pause/reduced-motion behavior.                                                                      |
| P3       | `DrawPath` / `MorphIcon`          | SVG drawing and icon-state transitions for completion and navigation feedback. Keep APIs limited and predictable.                                                           |

The shared factory always renders a div. A future semantic-element API would let text effects preserve span/heading markup and avoid invalid paragraph nesting. Do not make every new effect another div wrapper by default.

## Suggested release order

1. **Foundations:** reduced-motion and storage improvements; typography/motion tokens; composed refs and debounced callbacks.
2. **Content and interaction:** Prose, TextLink, DescriptionList, enhanced Heading/Text, roving focus, typeahead, selection and number formatting.
3. **Composition:** StaggerGroup, PresenceTransition, AutoHeight, static NumberText, query state and text overflow/expansion.
4. **Distinctive motion:** real scroll/pointer effects and split-text reveal, followed by optional editorial/marketing effects.

Use integrated examples to prove value: a prose article with scrollspy and reading progress; a data table with URL filters, selection and formatted amounts; and a wizard with presence transitions and dynamic-height validation. Each example should compose the current library as well as the new additions.

Avoid spending early releases on a full form engine, generic fetching/cache framework, drag-and-drop engine, or a large collection of small decorative variations. Start with narrow hooks and adapters that support the existing 90-component surface.

## Delivery expectations

- Retain per-entry imports, optional Motion dependencies, the design-system/variants/types/base layering and paired light/dark tokens.
- Register hooks and animations in the build lists, regenerate the CLI registry, and provide docs/SEO/sidebar/search examples where applicable.
- Add behavior-focused tests for keyboard handling, hydration, cleanup, reduced motion and state transitions; forwarding-only tests are insufficient for richer interactions.
- Refresh test-health and package-surface documentation using the current repository scripts and applicable maintenance guidance.
- Check installed framework documentation before implementing any Next.js-specific adapter. None was implemented for this analysis.

Key inspected files: `packages/components/tsup.config.ts`, `src/hooks/`, `src/ui/typography/`, `src/design-system/typography.ts`, `src/animations/shared/create-motion-animation.tsx`, individual animation presets, and the docs hook/typography/animation registries and demos.
