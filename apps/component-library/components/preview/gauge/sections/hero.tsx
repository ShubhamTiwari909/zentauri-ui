import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Gauge } from "@zentauri-ui/zentauri-components/ui/gauge";

export function GaugeHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="flex flex-wrap items-center justify-center gap-8">
        <Gauge value={72} appearance="gradient-blue" label="Storage" />
        <Gauge
          value={84}
          appearance="success"
          variant="dial"
          size="lg"
          label="Performance"
        />
        <Gauge
          value={38}
          appearance="warning"
          thickness="thick"
          label="Quota"
        />
      </SectionCard>
    </Section>
  );
}
