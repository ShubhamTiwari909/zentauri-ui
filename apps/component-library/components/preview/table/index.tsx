import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TableCodeExamplesSection } from "./sections/snippet-sections";
import { TableExamplesSection } from "./sections/component-demo";
import { TableHeroSection } from "./sections/hero";

export default function TablePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <TableHeroSection seo={seo} />
      <TableExamplesSection />
      <TableCodeExamplesSection />
      <PreviewApiSection slug="table" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
