import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AccordionCodeExamplesSection } from "./sections/accordion-code-examples-section";
import { AccordionExamplesSection } from "./sections/accordion-examples-section";
import { AccordionHeroSection } from "./sections/accordion-hero-section";

export default function AccordionPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <AccordionHeroSection seo={seo} />
      <AccordionExamplesSection />
      <AccordionCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
