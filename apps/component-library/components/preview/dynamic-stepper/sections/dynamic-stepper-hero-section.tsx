import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DynamicStepper } from "@zentauri-ui/zentauri-components/ui/dynamic-stepper";

import { DEMO_STEPS_FOR_PREVIEW } from "./components/dynamic-stepper-demo-data";

export function DynamicStepperHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border dark:border-white/10 border-slate-900/10 bg-slate-100 dark:bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
        <DynamicStepper
          steps={DEMO_STEPS_FOR_PREVIEW}
          defaultActiveStep={0}
          buttonAppearance="outline"
          buttonSize="sm"
        />
      </div>
    </section>
  );
}
