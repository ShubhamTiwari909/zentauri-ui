import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SearchExamplesSection } from "./sections/search-examples-section";
import { SearchHeroSection } from "./sections/search-hero-section";

export default function SearchPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <SearchHeroSection seo={seo} />
      <SearchExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
