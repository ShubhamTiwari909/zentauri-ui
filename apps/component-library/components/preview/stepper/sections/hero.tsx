import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
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
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard>
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
      </SectionCard>
    </Section>
  );
}
