"use client";

import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";
import { ToastViewportAnimated } from "@zentauri-ui/zentauri-components/ui/toast/animated";

import { HomeComparisonTable } from "./marketing/home-comparison-table";
import { HomeComponentShowcase } from "./marketing/home-component-showcase";
import { HomeDxSection } from "./marketing/home-dx-section";
import { HomeFeatureHighlights } from "./marketing/home-feature-highlights";
import { HomeHooksShowcase } from "./marketing/home-hooks-showcase";
import { HomeInstallSection } from "./marketing/home-install-section";
import { HomePatternDemos } from "./marketing/home-pattern-demos";
import { HomeThemingPlayground } from "./marketing/home-theming-playground";

export function HomeMarketing() {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
        <HomeFeatureHighlights />
        <HomeComponentShowcase />
        <HomeHooksShowcase />
        <HomePatternDemos />
        <HomeDxSection />
        <HomeInstallSection />
        <HomeThemingPlayground />
        <HomeComparisonTable />
      </div>
      <ToastViewportAnimated position="bottom-right" className="" />
    </ToastProvider>
  );
}
