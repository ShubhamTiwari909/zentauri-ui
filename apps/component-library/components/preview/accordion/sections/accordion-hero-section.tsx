import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zentauri-ui/zentauri-components/ui";

export function AccordionHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Disclosure
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Accordion for progressive disclosure.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Single or multiple expansion modes, spring motion presets, and
            size-aware triggers that stay aligned with the rest of the library.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Accordion type="single" defaultValue="item-1" appearance="separated" size="md">
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
