import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { NetworkStatusCodeExamplesSection } from "./sections/snippet-sections";
import { NetworkStatusHeroSection } from "./sections/hero";

export default function NetworkStatusPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <NetworkStatusHeroSection seo={seo} />
      <NetworkStatusCodeExamplesSection />
      <PreviewApiSection slug="network-status" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
