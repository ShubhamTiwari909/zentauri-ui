import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SortableListDemo } from "./components/demo";
import { SORTABLE_LIST_ITEM_SETS } from "./components/data";

export function SortableListHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />
      <div className="rounded-3xl border border-slate-900/10 bg-slate-100 p-5 shadow-2xl shadow-slate-950/40 dark:border-white/10 dark:bg-white/5">
        <SortableListDemo
          appearance="primary"
          size="md"
          showMoveButtons
          items={SORTABLE_LIST_ITEM_SETS.tasks}
        />
      </div>
    </Section>
  );
}
