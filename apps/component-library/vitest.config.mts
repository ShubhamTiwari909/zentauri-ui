import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { defineConfig } from "vitest/config";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appDir, "../..");
const require = createRequire(import.meta.url);

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    css: true,
  },
  resolve: {
    // Component sources are aliased into this app for tests. Dedupe React so
    // hooks in those workspace files share the renderer's dispatcher.
    dedupe: ["react", "react-dom"],
    alias: [
      { find: /^react$/, replacement: require.resolve("react") },
      {
        find: /^react\/jsx-runtime$/,
        replacement: require.resolve("react/jsx-runtime"),
      },
      {
        find: /^react\/jsx-dev-runtime$/,
        replacement: require.resolve("react/jsx-dev-runtime"),
      },
      { find: /^react-dom$/, replacement: require.resolve("react-dom") },
      {
        find: /^react-dom\/client$/,
        replacement: require.resolve("react-dom/client"),
      },
      {
        find: /^framer-motion$/,
        replacement: require.resolve("framer-motion"),
      },
      {
        // `react-syntax-highlighter` has no `exports` map, so its CJS `main`
        // wins resolution — and that build `require()`s ESM-only `refractor@5`,
        // which throws at import time. Point the bare specifier at the ESM
        // build the app's bundler already picks via `module`. Anchored so the
        // explicit `/dist/esm/styles/*` imports keep resolving themselves.
        find: /^react-syntax-highlighter$/,
        replacement: "react-syntax-highlighter/dist/esm/index.js",
      },
      {
        find: /^@zentauri-ui\/zentauri-components\/ui\/([^/]+)\/animated$/,
        replacement: path.resolve(
          repoRoot,
          "packages/components/src/ui/$1/animated",
        ),
      },
      {
        find: /^@zentauri-ui\/zentauri-components\/ui\/([^/]+)$/,
        replacement: path.resolve(repoRoot, "packages/components/src/ui/$1"),
      },
      {
        find: /^@zentauri-ui\/zentauri-components\/charts\/([^/]+)$/,
        replacement: path.resolve(
          repoRoot,
          "packages/components/src/charts/$1",
        ),
      },
      {
        find: "@zentauri-ui/zentauri-components/hooks/utils",
        replacement: path.resolve(
          repoRoot,
          "packages/components/src/lib/utils",
        ),
      },
      {
        find: /^@zentauri-ui\/zentauri-components\/hooks\/([^/]+)$/,
        replacement: path.resolve(repoRoot, "packages/components/src/hooks/$1"),
      },
      {
        find: "@zentauri-ui/zentauri-components/design-system/tokens",
        replacement: path.resolve(
          repoRoot,
          "packages/components/src/design-system/tokens",
        ),
      },
      {
        find: "@zentauri-ui/zentauri-components/design-system/facade",
        replacement: path.resolve(
          repoRoot,
          "packages/components/src/lib/facade",
        ),
      },
      {
        find: "@zentauri-ui/shared/site-header",
        replacement: path.resolve(
          repoRoot,
          "packages/shared/src/site-header/index.ts",
        ),
      },
      {
        find: "@zentauri-ui/shared",
        replacement: path.resolve(repoRoot, "packages/shared/src/index.ts"),
      },
      {
        find: "@",
        replacement: path.resolve(appDir, "."),
      },
    ],
  },
});
