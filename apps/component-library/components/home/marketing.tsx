"use client";

import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";
import { ToastViewportAnimated } from "@zentauri-ui/zentauri-components/ui/toast/animated";

import { HomeComparisonTable } from "./marketing/comparison-table";
import { HomeComponentShowcase } from "./marketing/component-showcase";
import { HomeDxSection } from "./marketing/dx-section";
import { HomeFeatureHighlights } from "./marketing/feature-highlights";
import { HomeHooksShowcase } from "./marketing/hooks-showcase";
import { HomeInstallSection } from "./marketing/install-section";
import { HomePackageHealth } from "./marketing/package-health";
import { HomePatternDemos } from "./marketing/pattern-demos";

export function HomeMarketing() {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
        <HomeFeatureHighlights />
        <HomeComparisonTable />
        <HomeDxSection />
        <HomePackageHealth />
        <HomeInstallSection />
        <HomeComponentShowcase />
        <HomeHooksShowcase />
        <HomePatternDemos />
      </div>
      <ToastViewportAnimated position="bottom-right" className="" />
    </ToastProvider>
  );
}
