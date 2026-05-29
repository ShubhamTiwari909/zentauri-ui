import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PopoverCodeExamplesSection } from "./sections/popover-code-examples-section";
import { PopoverExamplesSection } from "./sections/popover-examples-section";
import { PopoverHeroSection } from "./sections/popover-hero-section";

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
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
