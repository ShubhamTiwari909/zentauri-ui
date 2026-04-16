import { defineConfig } from "tsup";

const uiComponentNames = [
  "accordion", "alert", "badge", "buttons", "card", "divider",
  "drawer", "dropdown", "empty-state", "inputs", "modal",
  "pagination", "progress", "select", "skeleton", "spinner",
  "table", "tabs", "toast", "toggle", "tooltip",
] as const;

const uiEntries = Object.fromEntries(
  uiComponentNames.map((name) => [`ui/${name}`, `src/ui/${name}/index.ts`]),
);

export default defineConfig({
  entry: {
    ...uiEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  // ✅ Externalize ALL non-React peer deps so they aren't bundled in
  external: [
    "react",
    "react-dom",
    // Utility libs
    "clsx",
    "class-variance-authority",
    "tailwind-merge",
    "react-icons",
    "framer-motion",
  ],
  sourcemap: true,
  // ✅ Enable splitting — shared chunks prevent code duplication
  splitting: true,
  // Rollup's treeshake pass re-bundles esbuild output and strips or ignores
  // `"use client"` on non-root chunks (see Rollup "Module level directives" warnings).
  treeshake: false,
  banner: () => ({
    // Next.js must see `"use client"` on every entry (ESM and CJS) so client-only
    // modules are not bundled for React Server Components with react-server `react`.
    js: '"use client";\n',
  }),
});