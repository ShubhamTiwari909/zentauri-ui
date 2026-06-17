import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AccordionCodeExamplesSection } from "./sections/snippet-sections";
import { AccordionHeroSection } from "./sections/hero";

export default function AccordionPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AccordionHeroSection seo={seo} />
      <AccordionCodeExamplesSection />
      <PreviewApiSection slug="accordion" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
