import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AccordionCodeExamplesSection } from "./sections/snippet-sections";
import { AccordionExamplesSection } from "./sections/component-demo";
import { AccordionHeroSection } from "./sections/hero";

export default function AccordionPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AccordionHeroSection seo={seo} />
      <AccordionExamplesSection />
      <AccordionCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
