import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { BreadcrumbCodeExamplesSection } from "./sections/breadcrumb-code-examples-section";
import { BreadcrumbExamplesSection } from "./sections/breadcrumb-examples-section";
import { BreadcrumbHeroSection } from "./sections/breadcrumb-hero-section";

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
