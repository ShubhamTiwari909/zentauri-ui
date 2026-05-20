import { Section, SectionCard } from "@/components/common/Section";
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
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel">
        <DynamicStepper
          steps={DEMO_STEPS_FOR_PREVIEW}
          defaultActiveStep={0}
          buttonAppearance="outline"
          buttonSize="sm"
        />
      </SectionCard>
    </Section>
  );
}
