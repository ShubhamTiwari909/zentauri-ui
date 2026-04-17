import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui/accordion";

export function AccordionHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Accordion
          type="single"
          defaultValue="item-1"
          appearance="separated"
          size="md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-slate-300">
                Standard delivery in 3-5 business days. Express options at
                checkout.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Returns</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-slate-300">
                Free returns within 30 days of delivery in original condition.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
