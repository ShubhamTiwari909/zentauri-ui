import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";
import { AccordionContentAnimated } from "@zentauri-ui/zentauri-components/ui/accordion/animated";

export function AccordionHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
        <Accordion
          type="single"
          defaultValue="item-1"
          appearance="separated"
          size="md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContentAnimated transitionVariant="smooth">
              <p className="text-sm text-slate-900 dark:text-slate-300">
                Standard delivery in 3-5 business days. Express options at
                checkout.
              </p>
            </AccordionContentAnimated>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Returns</AccordionTrigger>
            <AccordionContentAnimated transitionVariant="smooth">
              <p className="text-sm text-slate-900 dark:text-slate-300">
                Free returns within 30 days of delivery in original condition.
              </p>
            </AccordionContentAnimated>
          </AccordionItem>
        </Accordion>
      </SectionCard>
    </Section>
  );
}
