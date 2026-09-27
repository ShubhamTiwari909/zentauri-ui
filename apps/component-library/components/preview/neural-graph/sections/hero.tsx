import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { NeuralGraphDemo } from "../components/neural-graph-demo";

export function NeuralGraphHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return <Section variant="hero">
    <PreviewHeroSeoBlock seo={seo} />
    <SectionCard className="overflow-hidden p-0">
      <NeuralGraphDemo appearance="gradient-blue" size="lg" />
    </SectionCard>
  </Section>;
}
