import { defineConfig } from "@playwright/test";
import type { DocsTheme } from "./routes";

const sizes = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
  narrow: { width: 320, height: 844 },
};

export default defineConfig({
  testDir: ".",
  testMatch: "typography.visual.spec.ts",
  globalSetup: "./global-setup.ts",
  outputDir: "../visualguard-results/tests",
  timeout: 180000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: 4,
  retries: 0,
  forbidOnly: true,
  reporter: [
    ["list"],
    ["html", { outputFolder: "../visualguard-results/report", open: "never" }],
    ["json", { outputFile: "../visualguard-results/results.json" }],
    ["junit", { outputFile: "../visualguard-results/junit.xml" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3110",
    browserName: "chromium",
    locale: "en-US",
    timezoneId: "UTC",
    contextOptions: { reducedMotion: "reduce" },
    deviceScaleFactor: 1,
    trace: "retain-on-failure",
  },
  projects: (["light", "dark"] as DocsTheme[]).flatMap((theme) =>
    Object.entries(sizes).map(([size, viewport]) => ({
      name: `${theme}-${size}`,
      metadata: { theme, size },
      use: {
        viewport,
        colorScheme: theme,
        isMobile: size !== "desktop",
        hasTouch: size !== "desktop",
      },
    })),
  ),
  webServer: {
    command: "pnpm start --hostname 0.0.0.0 --port 3110",
    cwd: "..",
    url: "http://127.0.0.1:3110/preview/typography/editorial",
    reuseExistingServer: false,
    timeout: 60000,
  },
});
