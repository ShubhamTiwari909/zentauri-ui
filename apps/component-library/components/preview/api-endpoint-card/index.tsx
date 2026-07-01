import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ApiEndpointCardCodeExamplesSection } from "./sections/snippet-sections";
import { ApiEndpointCardHeroSection } from "./sections/hero";

export default function ApiEndpointCardPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ApiEndpointCardHeroSection seo={seo} />
      <ApiEndpointCardCodeExamplesSection />
      <PreviewApiSection slug="api-endpoint-card" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
