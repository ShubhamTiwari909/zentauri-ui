import { execFileSync } from "node:child_process";
import { join } from "node:path";

import { defineConfig } from "tsup";

const uiComponentNames = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "breadcrumb",
  "buttons",
  "card",
  "divider",
  "drawer",
  "dropdown",
  "empty-state",
  "file-upload",
  "inputs",
  "modal",
  "pagination",
  "progress",
  "select",
  "skeleton",
  "slider",
  "stepper",
  "table",
  "tabs",
  "toast",
  "toggle",
  "tooltip",
] as const;

const uiAnimatedComponentNames = [
  "accordion",
  "alert",
  "avatar",
  "badge",
  "buttons",
  "card",
  "divider",
  "drawer",
  "empty-state",
  "inputs",
  "modal",
  "progress",
  "skeleton",
  "spinner",
  "table",
  "tabs",
  "toast",
  "toggle",
  "tooltip",
] as const;

const hooksEntryNames = [
  "useBodyScrollLock",
  "useClickOutside",
  "useClipboard",
  "useControllableState",
  "useDebouncedValue",
  "useDisclosure",
  "useDocumentTitle",
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

const uiAnimatedEntries = Object.fromEntries(
  uiAnimatedComponentNames.map((name) => [
    `ui/${name}/animated`,
    `src/ui/${name}/animated/index.ts`,
  ]),
);

const hooksEntries = {
  "hooks/utils": "src/lib/utils.ts",
  ...Object.fromEntries(
    hooksEntryNames.map((name) => [`hooks/${name}`, `src/hooks/${name}/index.ts`]),
  ),
};

export default defineConfig({
  entry: {
    ...uiEntries,
    ...uiAnimatedEntries,
    ...hooksEntries,
  },
  format: ["esm", "cjs"],
  dts: true, // ← disabled, tsc handles this separately
  clean: true,
  external: [
    "react",
    "react-dom",
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
    "react-icons",
    "framer-motion",
    /^react-icons\//,
    /^framer-motion/,
  ],
  sourcemap: true,
  splitting: true,
  treeshake: true,
  async onSuccess() {
    execFileSync(
      "node",
      [join(process.cwd(), "scripts/prepend-use-client.mjs")],
      { stdio: "inherit" },
    );
  },
});
