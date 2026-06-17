import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PopoverCodeExamplesSection } from "./sections/snippet-sections";
import { PopoverExamplesSection } from "./sections/component-demo";
import { PopoverHeroSection } from "./sections/hero";

export default function PopoverPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <PopoverHeroSection seo={seo} />
      <PopoverExamplesSection />
      <PopoverCodeExamplesSection />
      <PreviewApiSection slug="popover" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
