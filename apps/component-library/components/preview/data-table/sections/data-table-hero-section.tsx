import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { DataTableDemo } from "../components/data-table-demo";

export function DataTableHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="overflow-x-auto">
        <DataTableDemo />
      </SectionCard>
    </Section>
  );
}
