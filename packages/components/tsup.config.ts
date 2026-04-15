import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "ui/index": "src/ui/index.ts", // maps to dist/ui/index.mjs + .js
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
    js: format === "esm" ? '"use client";\n\nimport "./index.css";\n' : "",
  }),
});