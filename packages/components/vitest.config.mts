import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const packageDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/vitest-setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "cli/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(packageDir, "."),
    },
  },
});
