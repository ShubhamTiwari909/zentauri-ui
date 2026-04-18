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
    slug: "use-focus-management",
    module: "useFocusManagement",
    name: "useFocusManagement",
    description:
      "Escape to close, initial focus into a container, and focus containment while open.",
    intro:
      "Intended for modal-like surfaces together with scroll locking from the same hook.",
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
    slug: "use-local-storage",
    module: "useLocalStorage",
    name: "useLocalStorage",
    description:
      "JSON-serialized state mirrored to localStorage with cross-tab storage events.",
    intro:
      "Persists UI preferences, draft forms, or lightweight client caches across sessions.",
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
    slug: "use-resize-observer",
    module: "useResizeObserver",
    name: "useResizeObserver",
    description:
      "Observes element content box size via ResizeObserver and a ref callback.",
    intro:
      "Charts, virtualized lists, and custom scrollers that must react to element dimensions.",
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
    slug: "use-toggle",
    module: "useToggle",
    name: "useToggle",
    description:
      "Boolean state with toggle and explicit set helpers for simple on-off UI.",
    intro:
      "Feature flags in demos, collapsible panels, and compact binary controls.",
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
