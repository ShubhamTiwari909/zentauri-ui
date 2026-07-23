import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Wizard,
  WizardStep,
  WizardNavigation,
  WizardHeader,
  WizardProgress,
} from "@zentauri-ui/zentauri-components/ui/wizard";

export function WizardHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <SectionCard variant="panel">
        <Wizard>
          <WizardHeader />
          <WizardProgress variant="dots" />
          <WizardStep id="personal-hero" title="Personal">
            <p className="py-4 text-sm">Personal information</p>
          </WizardStep>
          <WizardStep id="address-hero" title="Address">
            <p className="py-4 text-sm">Address details</p>
          </WizardStep>
          <WizardStep id="payment-hero" title="Payment">
            <p className="py-4 text-sm">Payment information</p>
          </WizardStep>
          <WizardNavigation />
        </Wizard>
      </SectionCard>
    </Section>
  );
}
