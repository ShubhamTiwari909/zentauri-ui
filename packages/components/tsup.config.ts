import { defineConfig } from "tsup";

const uiComponentNames = [
  "accordion",
  "alert",
  "badge",
  "buttons",
  "card",
  "divider",
  "drawer",
  "dropdown",
  "empty-state",
  "inputs",
  "modal",
  "pagination",
  "progress",
  "select",
  "skeleton",
  "spinner",
  "table",
  "tabs",
  "toast",
  "toggle",
  "tooltip",
] as const;

const uiEntries = Object.fromEntries(
  uiComponentNames.map((name) => [`ui/${name}`, `src/ui/${name}/index.ts`]),
);

export default defineConfig({
  entry: {
    "ui/index": "src/ui/index.ts",
    ...uiEntries,
  },
  format: ["esm", "cjs"],
  dts: true,          // generates .d.ts files
  clean: true,        // clears dist/ before each build
  external: ["react", "react-dom"], // don't bundle peer deps
  sourcemap: true,
  // esbuild extracts CSS to dist/ui/index.css but drops the import from JS;
  // restore it so apps loading the package get styles without a separate import.
  banner: ({ format }) => ({
    // CJS consumers rarely load CSS via require(); ESM + bundlers use the import.
    js: format === "esm" ? '"use client";\n' : "",
  }),
  splitting: false,
  // Rollup's extra treeshake pass strips esbuild's `banner` from chunks, which
  // breaks Next.js "use client" boundaries for split chunk files.
  treeshake: false,
});