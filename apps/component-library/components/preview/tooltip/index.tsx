import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TooltipCodeExamplesSection } from "./sections/tooltip-code-examples-section";
import { TooltipExamplesSection } from "./sections/tooltip-examples-section";
import { TooltipHeroSection } from "./sections/tooltip-hero-section";

export default function TooltipPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TooltipHeroSection seo={seo} />
      <TooltipExamplesSection />
      <TooltipCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
