import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { GridDashboardDemo } from "../components/grid-code-examples-demo";

export function GridHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-2xl border border-slate-700 p-5">
        <GridDashboardDemo />
      </div>
    </Section>
  );
}
