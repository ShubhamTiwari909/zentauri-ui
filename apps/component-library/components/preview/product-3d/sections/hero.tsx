import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Product3DDemo } from "../components/product-3d-demo";

export function Product3DHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return <Section variant="hero">
    <PreviewHeroSeoBlock seo={seo} />
    <SectionCard className="overflow-hidden p-0">
      <Product3DDemo appearance="gradient-rose" size="lg" />
    </SectionCard>
  </Section>;
}
