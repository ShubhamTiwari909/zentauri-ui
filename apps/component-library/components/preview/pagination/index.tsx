import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PaginationCodeExamplesSection } from "./sections/pagination-code-examples-section";
import { PaginationHeroSection } from "./sections/pagination-hero-section";
import { PaginationExamplesSection } from "./sections/pagination-examples-section";

export default function PaginationPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <PaginationHeroSection seo={seo} />
      <PaginationExamplesSection />
      <PaginationCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
