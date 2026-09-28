import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { OrbitSystemDemo } from "../components/orbit-system-demo";

export function OrbitSystemHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero" className="lg:grid-cols-1">
      <PreviewHeroSeoBlock seo={seo} />
      <SectionCard className="overflow-hidden p-0">
        <OrbitSystemDemo appearance="gradient-blue" size="lg" />
      </SectionCard>
    </Section>
  );
}
