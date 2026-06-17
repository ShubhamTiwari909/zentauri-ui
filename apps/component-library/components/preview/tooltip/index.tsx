import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TooltipCodeExamplesSection } from "./sections/snippet-sections";
import { TooltipExamplesSection } from "./sections/component-demo";
import { TooltipHeroSection } from "./sections/hero";

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
      <PreviewApiSection slug="tooltip" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
