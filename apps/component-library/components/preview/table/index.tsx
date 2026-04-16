import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TableCodeExamplesSection } from "./sections/table-code-examples-section";
import { TableExamplesSection } from "./sections/table-examples-section";
import { TableHeroSection } from "./sections/table-hero-section";

export default function TablePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <TableHeroSection seo={seo} />
      <TableExamplesSection />
      <TableCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
