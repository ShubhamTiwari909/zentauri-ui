import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { QrScannerCodeExamplesSection } from "./sections/snippet-sections";
import { QrScannerHeroSection } from "./sections/hero";

export default function QrScannerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <QrScannerHeroSection seo={seo} />
      <QrScannerCodeExamplesSection />
      <PreviewApiSection slug="qr-scanner" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
