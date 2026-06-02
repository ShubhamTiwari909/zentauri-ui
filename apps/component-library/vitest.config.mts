import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appDir, "../..");

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    css: true,
  },
  resolve: {
    alias: [
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
