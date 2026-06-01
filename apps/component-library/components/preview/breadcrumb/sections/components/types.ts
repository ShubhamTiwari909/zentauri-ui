import type { BreadcrumbAppearance } from "@zentauri-ui/zentauri-components/ui/breadcrumb";
export type BreadcrumbScenario = "default" | "dots" | "smallSeparator";

export type BreadcrumbDemoProps = {
  scenario: BreadcrumbScenario;
  appearance?: BreadcrumbAppearance;
};
