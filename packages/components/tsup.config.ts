import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { defineConfig } from "tsup";

const uiComponentNames = [
  "accordion",
  "alert",
  "animated-number",
  "avatar",
  "badge",
  "breadcrumb",
  "buttons",
  "card",
  "checkbox",
  "command",
  "context-menu",
  "copy-button",
  "divider",
  "drawer",
  "dropdown",
  "dynamic-stepper",
  "empty-state",
  "file-upload",
  "inputs",
  "kbd",
  "marquee",
  "modal",
  "otp-input",
  "pagination",
  "popover",
  "progress",
  "rating",
  "radio-group",
  "scroll-area",
  "search",
  "select",
  "skeleton",
  "slider",
  "stepper",
  "table",
  "tabs",
  "timeline",
  "toast",
  "toggle",
  "tooltip",
  "tree-view",
  "typography",
] as const;

const chartEntryNames = ["area", "bar", "bubble", "line", "pie"] as const;

const uiAnimatedComponentNames = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "buttons",
  "card",
  "checkbox",
  "command",
  "copy-button",
  "divider",
  "drawer",
  "empty-state",
  "inputs",
  "kbd",
  "modal",
  "popover",
  "progress",
  "radio-group",
  "skeleton",
  "spinner",
  "table",
  "tabs",
  "timeline",
  "toast",
  "toggle",
  "tooltip",
  "tree-view",
] as const;

const hooksEntryNames = [
  "useBodyScrollLock",
  "useClickOutside",
  "useClipboard",
  "useControllableState",
  "useDebouncedValue",
  "useDisclosure",
  "useDocumentTitle",
  "useDynamicStepper",
  "useFocusManagement",
  "useHover",
  "useInView",
  "useIntersectionObserver",
  "useIsomorphicLayoutEffect",
  "useIsMounted",
  "useLocalStorage",
  "useMediaQuery",
  "useNetworkStatus",
  "usePageVisibility",
  "usePagination",
  "usePrefersColorScheme",
  "usePrefersReducedMotion",
  "useResizeObserver",
  "useSessionStorage",
  "useThrottledCallback",
  "useToggle",
  "useWindowSize",
] as const;

const uiEntries = Object.fromEntries(
  uiComponentNames.map((name) => [`ui/${name}`, `src/ui/${name}/index.ts`]),
);

const chartEntries = Object.fromEntries(
  chartEntryNames.map((name) => [
    `charts/${name}`,
    `src/charts/${name}/index.ts`,
  ]),
);

const uiAnimatedEntries = Object.fromEntries(
  uiAnimatedComponentNames.map((name) => [
    `ui/${name}/animated`,
    `src/ui/${name}/animated/index.ts`,
  ]),
);

const hooksEntries = {
  "hooks/utils": "src/lib/utils.ts",
  ...Object.fromEntries(
    hooksEntryNames.map((name) => [
      `hooks/${name}`,
      `src/hooks/${name}/index.ts`,
    ]),
  ),
};

export default defineConfig({
  entry: {
    ...uiEntries,
    ...chartEntries,
    ...uiAnimatedEntries,
    ...hooksEntries,
  },
  format: ["esm", "cjs"],
  dts: false,
  clean: true,
  // Externalize peer deps and subpaths (e.g. react-icons/hi2) so they are never inlined.
  external: [
    "react",
    "react-dom",
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
    "react-icons",
    "recharts",
    "framer-motion",
    /^react-icons\//,
    /^recharts/,
    /^framer-motion/,
  ],
  sourcemap: true,
  splitting: true,
  // Rollup treeshake can reorder output so tsup's `banner` no longer leads with
  // `"use client"`. Entry `index.ts` files include the directive for source clarity;
  // `scripts/prepend-use-client.mjs` runs after the build to enforce it on each UI entry.
  treeshake: true,
  async onSuccess() {
    execFileSync(
      "node",
      [join(process.cwd(), "scripts/prepend-use-client.mjs")],
      {
        stdio: "inherit",
      },
    );
  },
});
