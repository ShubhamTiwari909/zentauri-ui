import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SortableListPlaygroundSection } from "./sections/snippet-sections";
import { SortableListHeroSection } from "./sections/hero";

export default function SortableListPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SortableListHeroSection seo={seo} />
      <SortableListPlaygroundSection />
      <PreviewApiSection slug="sortable-list" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
