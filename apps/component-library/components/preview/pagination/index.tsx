import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PaginationCodeExamplesSection } from "./sections/snippet-sections";
import { PaginationHeroSection } from "./sections/hero";
import { PaginationExamplesSection } from "./sections/component-demo";

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
