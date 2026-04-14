import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { TooltipExamplesSection } from "./sections/tooltip-examples-section";
import { TooltipHeroSection } from "./sections/tooltip-hero-section";

export default function TooltipPreviewPage() {
  return (
    <PreviewPageShell>
      <TooltipHeroSection />
      <TooltipExamplesSection />
    </PreviewPageShell>
  );
}
