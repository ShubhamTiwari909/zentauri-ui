import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Progress } from "@zentauri-ui/zentauri-components/ui/progress";
import { ProgressAnimated } from "@zentauri-ui/zentauri-components/ui/progress/animated";

export function ProgressHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="space-y-4">
        <Progress value={42} appearance="sky" label="Upload progress" />
        <ProgressAnimated
          value={78}
          appearance="gradient-indigo"
          animation="shimmer"
        />
      </SectionCard>
    </Section>
  );
}
