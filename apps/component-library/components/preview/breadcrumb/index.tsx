import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BreadcrumbCodeExamplesSection } from "./sections/snippet-sections";
import { BreadcrumbExamplesSection } from "./sections/component-demo";
import { BreadcrumbHeroSection } from "./sections/hero";

export default function BreadcrumbPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <BreadcrumbHeroSection seo={seo} />
      <BreadcrumbExamplesSection />
      <BreadcrumbCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
