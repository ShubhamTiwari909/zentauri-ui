import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DividerAnimated } from "@zentauri-ui/zentauri-components/ui/divider/animated";

export function DividerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard variant="panel" className="space-y-6">
        <DividerAnimated
          appearance="primary"
          animation="expand"
          label="Primary"
        />
        <DividerAnimated
          appearance="muted"
          animation="expand"
          label="Primary"
        />
      </SectionCard>
    </Section>
  );
}
