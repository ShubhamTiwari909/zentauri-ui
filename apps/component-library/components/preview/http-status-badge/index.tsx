import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HttpStatusBadgeCodeExamplesSection } from "./sections/snippet-sections";
import { HttpStatusBadgeHeroSection } from "./sections/hero";

export default function HttpStatusBadgePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <HttpStatusBadgeHeroSection seo={seo} />
      <HttpStatusBadgeCodeExamplesSection />
      <PreviewApiSection slug="http-status-badge" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
