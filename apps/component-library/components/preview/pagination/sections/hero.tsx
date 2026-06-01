import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Pagination } from "@zentauri-ui/zentauri-components/ui/pagination";

export function PaginationHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-slate-950/40 p-6">
        <Pagination
          appearance="indigo"
          pageCount={24}
          defaultPage={12}
          siblingCount={2}
          boundaryCount={1}
        />
      </div>
    </Section>
  );
}
