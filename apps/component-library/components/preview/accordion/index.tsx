import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { AccordionCodeExamplesSection } from "./sections/accordion-code-examples-section";
import { AccordionExamplesSection } from "./sections/accordion-examples-section";
import { AccordionHeroSection } from "./sections/accordion-hero-section";

export default function AccordionPreviewPage() {
  return (
    <PreviewPageShell>
      <AccordionHeroSection />
      <AccordionExamplesSection />
      <AccordionCodeExamplesSection />
    </PreviewPageShell>
  );
}
