import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Pagination } from "@zentauri-ui/zentauri-components/ui/pagination";

export function PaginationHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
        <Pagination
          appearance="indigo"
          pageCount={24}
          defaultPage={12}
          siblingCount={2}
          boundaryCount={1}
        />
      </div>
    </section>
  );
}
