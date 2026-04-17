import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperTitle,
} from "@zentauri-ui/zentauri-components/ui/stepper";

export function StepperHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Stepper>
          <StepperItem>
            <StepperIndicator />
            <StepperTitle>Details</StepperTitle>
            <StepperDescription>Confirm items</StepperDescription>
          </StepperItem>
          <StepperItem>
            <StepperIndicator />
            <StepperTitle>Payment</StepperTitle>
            <StepperDescription>Billing method</StepperDescription>
          </StepperItem>
          <StepperItem>
            <StepperIndicator />
            <StepperTitle>Review</StepperTitle>
            <StepperDescription>Submit order</StepperDescription>
          </StepperItem>
        </Stepper>
      </div>
    </section>
  );
}
