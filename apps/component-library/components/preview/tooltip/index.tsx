import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { TooltipCodeExamplesSection } from "./sections/tooltip-code-examples-section";
import { TooltipExamplesSection } from "./sections/tooltip-examples-section";
import { TooltipHeroSection } from "./sections/tooltip-hero-section";

export default function TooltipPreviewPage() {
  return (
    <PreviewPageShell>
      <TooltipHeroSection />
      <TooltipExamplesSection />
      <TooltipCodeExamplesSection />
    </PreviewPageShell>
  );
}
