import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { OTPInput } from "@zentauri-ui/zentauri-components/ui/otp-input";

export function OTPInputHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-lg">
        <div className="grid gap-6">
          <OTPInput
            appearance="glass"
            defaultValue="428"
            hint="Paste a 6 digit code or type one cell at a time."
            label="Workspace verification"
            separatorEvery={3}
          />
          <OTPInput
            appearance="success"
            defaultValue="735921"
            label="Verified code"
            size="sm"
          />
        </div>
      </SectionCard>
    </Section>
  );
}
