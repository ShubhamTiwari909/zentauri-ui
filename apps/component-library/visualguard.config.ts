import { defineConfig } from "visualguard";
import { typographyRoutes } from "./visualguard/routes";

export default defineConfig({
  mode: "baseline",
  baseURL: { staging: "http://127.0.0.1:3110" },
  routes: Object.values(typographyRoutes),
  baseline: { dir: "visualguard/baselines", missing: "error", legacy: "error" },
  viewports: {
    desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
    mobile: {
      width: 390,
      height: 844,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 1,
    },
  },
  browser: { name: "chromium", locale: "en-US", timezoneId: "UTC" },
  stabilize: {
    disableAnimations: true,
    freezeTime: "2026-10-13T00:00:00Z",
    waitForFonts: true,
    hideDefaults: false,
    // State checks deliberately scroll/focus. Do not reset their scroll position.
    scrollToLoad: false,
  },
  screenshot: { fullPage: true, maxHeight: 60000 },
  // No observed rendering noise has justified a pixel allowance.
  diff: { threshold: 0.1, maxDiffPixels: 0, maxDiffRatio: 0, noiseMap: false },
  ai: { provider: "none" },
  checks: { accessibility: false, performance: false },
});
