import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PasswordStrengthMeter } from "@zentauri-ui/zentauri-components/ui/password-strength-meter";
import { PasswordStrengthMeterAnimated } from "@zentauri-ui/zentauri-components/ui/password-strength-meter/animated";

export function PasswordStrengthMeterHeroSection({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="space-y-4">
        <PasswordStrengthMeter
          value={25}
          appearance="default"
          label="Password"
        />
        <PasswordStrengthMeterAnimated
          value={78}
          appearance="gradient-indigo"
          label="Password"
          animation="shimmer"
        />
      </SectionCard>
    </Section>
  );
}
