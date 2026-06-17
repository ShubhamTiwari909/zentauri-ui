import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SearchExamplesSection } from "./sections/component-demo";
import { SearchHeroSection } from "./sections/hero";

export default function SearchPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SearchHeroSection seo={seo} />
      <SearchExamplesSection />
      <PreviewApiSection slug="search" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
