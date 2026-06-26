export const HOOK_PREVIEW_REGISTRY = [
  {
    slug: "use-body-scroll-lock",
    module: "useBodyScrollLock",
    name: "useBodyScrollLock",
    description:
      "Sets document body overflow hidden while active, restoring the previous style on cleanup.",
    intro:
      "Use when overlays, drawers, or modals should prevent background scroll without fighting nested scroll containers.",
  },
  {
    slug: "use-click-outside",
    module: "useClickOutside",
    name: "useClickOutside",
    description:
      "Listens for pointer or touch events outside a ref element and closes floating UI.",
    intro:
      "Pairs with menus, popovers, and pickers so a single ref boundary defines “inside” versus dismiss.",
  },
  {
    slug: "use-clipboard",
    module: "useClipboard",
    name: "useClipboard",
    description:
      "Async copy to the system clipboard with copied and error state plus optional auto-reset.",
    intro:
      "Wraps navigator.clipboard.writeText for share buttons, code snippets, and confirmation feedback.",
  },
  {
    slug: "use-controllable-state",
    module: "useControllableState",
    name: "useControllableState",
    description:
      "Single state tuple that follows either controlled value props or internal default state.",
    intro:
      "Use for primitives that support both fully controlled and uncontrolled usage with one setter.",
  },
  {
    slug: "use-cookie",
    module: "useCookie",
    name: "useCookie",
    description:
      "Reads and writes a single cookie with React state kept in sync, including remove with max-age expiry.",
    intro:
      "Lightweight preferences, consent flags, or A/B cohorts that must be visible to the server on the next request.",
  },
  {
    slug: "use-countdown",
    module: "useCountdown",
    name: "useCountdown",
    description:
      "Countdown timer from countStart to countStop with start, pause, resume, reset, and onComplete.",
    intro:
      "OTP resend timers, quiz deadlines, and launch counters with explicit pause and resume control.",
  },
  {
    slug: "use-debounced-value",
    module: "useDebouncedValue",
    name: "useDebouncedValue",
    description:
      "Returns a value that updates only after the source has been stable for a delay.",
    intro:
      "Ideal for search-as-you-type, autosuggest, and expensive effects tied to fast-changing inputs.",
  },
  {
    slug: "use-disclosure",
    module: "useDisclosure",
    name: "useDisclosure",
    description:
      "Boolean open state with open, close, toggle, and setOpen helpers built on controllable state.",
    intro:
      "Models collapsible regions, menus, and dialogs with a small ergonomic API.",
  },
  {
    slug: "use-document-title",
    module: "useDocumentTitle",
    name: "useDocumentTitle",
    description:
      "Syncs document.title from React and optionally restores the prior title on unmount.",
    intro:
      "Use for wizard steps, live counters in the tab label, or transient status without leaving the tree.",
  },
  {
    slug: "use-dynamic-stepper",
    module: "useDynamicStepper",
    name: "useDynamicStepper",
    description:
      "Clamped step index with goPrevious, goNext, and controlled or uncontrolled state for multi-step flows.",
    intro:
      "Headless navigation for wizards; pair with DynamicStepper or build your own step chrome.",
  },
  {
    slug: "use-event-listener",
    module: "useEventListener",
    name: "useEventListener",
    description:
      "Attaches any DOM event listener to window, document, an element, or a ref with automatic cleanup.",
    intro:
      "The fundamental building block: subscribe once, keep the latest handler, and never leak listeners.",
  },
  {
    slug: "use-focus-management",
    module: "useFocusManagement",
    name: "useFocusManagement",
    description:
      "Escape to close, initial focus into a container, and focus containment while open.",
    intro:
      "Intended for modal-like surfaces together with scroll locking from the same hook.",
  },
  {
    slug: "use-geolocation",
    module: "useGeolocation",
    name: "useGeolocation",
    description:
      "Browser geolocation with loading, error, Permissions API state, and one-shot or watch modes.",
    intro:
      "Store finders, delivery ETAs, and map centering; defer the permission prompt behind a user gesture with enabled.",
  },
  {
    slug: "use-hash",
    module: "useHash",
    name: "useHash",
    description:
      "Computes SHA-1/SHA-256/SHA-384/SHA-512 hashes via the Web Crypto API, returning hash/isHashing/error/recompute.",
    intro:
      "Hash text client-side for security tooling, checksum generation, or educational demos without sending data to a server.",
  },
  {
    slug: "use-hotkeys",
    module: "useHotkeys",
    name: "useHotkeys",
    description:
      "Binds keyboard shortcut combos like mod+k or ctrl+shift+p to handlers, skipping inputs by default.",
    intro:
      "Command palettes, save shortcuts, and navigation keys with one declarative binding map.",
  },
  {
    slug: "use-hover",
    module: "useHover",
    name: "useHover",
    description:
      "Pointer enter and leave tracking on the element attached via a ref callback.",
    intro:
      "Drives preview cards, tooltip delay logic, or analytics hover regions without manual listeners.",
  },
  {
    slug: "use-idle-timeout",
    module: "useIdleTimeout",
    name: "useIdleTimeout",
    description:
      "Flags the user idle after a period without pointer, key, wheel, touch, or scroll activity.",
    intro:
      "Session expiry warnings, presence indicators, and pausing media or polling while nobody is around.",
  },
  {
    slug: "use-in-view",
    module: "useInView",
    name: "useInView",
    description:
      "Boolean intersection flag from a ref callback and shared IntersectionObserver options.",
    intro:
      "Lazy-load media, fire impressions, or flip animations when a sentinel enters the viewport.",
  },
  {
    slug: "use-intersection-observer",
    module: "useIntersectionObserver",
    name: "useIntersectionObserver",
    description:
      "Low-level ref callback plus the latest IntersectionObserverEntry for custom logic.",
    intro:
      "Use when you need ratios, bounding rects, or thresholds beyond a simple in-view boolean.",
  },
  {
    slug: "use-interval",
    module: "useInterval",
    name: "useInterval",
    description:
      "Declarative setInterval that always calls the latest callback and pauses when the delay is null.",
    intro:
      "Polling, tickers, and slideshows without stale closures or hand-rolled cleanup.",
  },
  {
    slug: "use-isomorphic-layout-effect",
    module: "useIsomorphicLayoutEffect",
    name: "useIsomorphicLayoutEffect",
    description:
      "Resolves to useLayoutEffect in the browser and useEffect on the server to avoid warnings.",
    intro:
      "Measure DOM or apply layout-critical updates before paint without breaking SSR.",
  },
  {
    slug: "use-is-mounted",
    module: "useIsMounted",
    name: "useIsMounted",
    description:
      "Returns a stable function that reports whether the component is still mounted.",
    intro:
      "Guards async completions and timers so setState does not run after unmount.",
  },
  {
    slug: "use-key-press",
    module: "useKeyPress",
    name: "useKeyPress",
    description:
      "Boolean for whether a key (or any of several keys) is held down, cleared on window blur.",
    intro:
      "Game controls, drawing modifiers, and press-and-hold UI that needs live key state rather than shortcuts.",
  },
  {
    slug: "use-local-storage",
    module: "useLocalStorage",
    name: "useLocalStorage",
    description:
      "JSON-serialized state mirrored to localStorage with cross-tab storage events.",
    intro:
      "Persists UI preferences, draft forms, or lightweight client caches across sessions.",
  },
  {
    slug: "use-long-press",
    module: "useLongPress",
    name: "useLongPress",
    description:
      "Long-press gesture via pointer events with threshold, movement tolerance, and lifecycle callbacks.",
    intro:
      "Context menus on touch, press-and-hold to delete, and other intent-confirming gestures.",
  },
  {
    slug: "use-media-query",
    module: "useMediaQuery",
    name: "useMediaQuery",
    description:
      "Subscribes to window.matchMedia and updates when the query result changes.",
    intro:
      "Branch layouts, feature flags, or responsive behavior from any valid media query string.",
  },
  {
    slug: "use-network-status",
    module: "useNetworkStatus",
    name: "useNetworkStatus",
    description:
      "Boolean online flag wired to window online and offline events.",
    intro:
      "Surface offline banners, pause mutations, or queue writes until connectivity returns.",
  },
  {
    slug: "use-page-visibility",
    module: "usePageVisibility",
    name: "usePageVisibility",
    description:
      "Tracks document.visibilityState for background tabs and mobile app switches.",
    intro: "Pause video, polling, or animations when the document is hidden.",
  },
  {
    slug: "use-pagination",
    module: "usePagination",
    name: "usePagination",
    description:
      "Page index, item model, and navigation helpers including buildPaginationItems.",
    intro:
      "Headless pagination for tables and lists; pair with your own buttons or the Pagination component.",
  },
  {
    slug: "use-table-sort",
    module: "useTableSort",
    name: "useTableSort",
    description:
      "Controlled or uncontrolled sort state for table headers, including sortable TableHead props.",
    intro:
      "Use for data tables that need external sort state without baking sorting behavior into the Table primitive.",
  },
  {
    slug: "use-table-filter",
    module: "useTableFilter",
    name: "useTableFilter",
    description:
      "Column filter state plus filtered row derivation for client-side table and list data.",
    intro:
      "Use for small to medium client-side datasets that need composable filters without coupling logic to the Table primitive.",
  },
  {
    slug: "use-prefers-color-scheme",
    module: "usePrefersColorScheme",
    name: "usePrefersColorScheme",
    description:
      "Resolves prefers-color-scheme to a light or dark string with SSR-friendly defaults.",
    intro:
      "Theme hints or assets that should follow the user OS appearance without reading CSS variables.",
  },
  {
    slug: "use-prefers-reduced-motion",
    module: "usePrefersReducedMotion",
    name: "usePrefersReducedMotion",
    description:
      "Boolean for prefers-reduced-motion: reduce via the shared media query hook.",
    intro:
      "Disable or simplify motion when users request reduced animation at the system level.",
  },
  {
    slug: "use-previous",
    module: "usePrevious",
    name: "usePrevious",
    description:
      "Returns the value from the previous render — undefined on the first one.",
    intro:
      "Diff props or state across renders for animation direction, change detection, and transition logic.",
  },
  {
    slug: "use-resize-observer",
    module: "useResizeObserver",
    name: "useResizeObserver",
    description:
      "Observes element content box size via ResizeObserver and a ref callback.",
    intro:
      "Charts, virtualized lists, and custom scrollers that must react to element dimensions.",
  },
  {
    slug: "use-scroll-position",
    module: "useScrollPosition",
    name: "useScrollPosition",
    description:
      "Tracks the scroll x/y offset of the window or a scrollable element via a passive listener.",
    intro:
      "Reading progress bars, scroll-linked headers, and back-to-top buttons driven by live offsets.",
  },
  {
    slug: "use-session-storage",
    module: "useSessionStorage",
    name: "useSessionStorage",
    description:
      "JSON-serialized state mirrored to sessionStorage for the active tab session.",
    intro:
      "Wizard progress, ephemeral filters, or staging data that should clear when the tab closes.",
  },
  {
    slug: "use-throttled-callback",
    module: "useThrottledCallback",
    name: "useThrottledCallback",
    description:
      "Wraps a callback so it runs at most once per interval based on wall-clock time.",
    intro:
      "Scroll or resize handlers that should stay smooth without flooding downstream work.",
  },
  {
    slug: "use-timeout",
    module: "useTimeout",
    name: "useTimeout",
    description:
      "Declarative setTimeout with automatic cleanup plus imperative clear and reset controls.",
    intro:
      "Auto-dismiss toasts, delayed reveals, and deferred actions the user can cancel or restart.",
  },
  {
    slug: "use-toggle",
    module: "useToggle",
    name: "useToggle",
    description:
      "Boolean state with toggle and explicit set helpers for simple on-off UI.",
    intro:
      "Feature flags in demos, collapsible panels, and compact binary controls.",
  },
  {
    slug: "use-virtual-list",
    module: "useVirtualList",
    name: "useVirtualList",
    description:
      "Headless fixed-height list virtualization: renders only visible rows plus overscan with scrollToIndex.",
    intro:
      "Logs, tables, and feeds with tens of thousands of rows that must stay smooth without a heavyweight dependency.",
  },
  {
    slug: "use-window-size",
    module: "useWindowSize",
    name: "useWindowSize",
    description:
      "Tracks innerWidth and innerHeight with a resize listener on the window.",
    intro:
      "Responsive breakpoints in JS, canvas sizing, or layout math outside of CSS alone.",
  },
] as const;
