import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { DataTableExamplesSection } from "./sections/data-table-examples-section";
import { DataTableHeroSection } from "./sections/data-table-hero-section";

export default function DataTablePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DataTableHeroSection seo={seo} />
      <DataTableExamplesSection />
      <PreviewApiSection slug="data-table" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
