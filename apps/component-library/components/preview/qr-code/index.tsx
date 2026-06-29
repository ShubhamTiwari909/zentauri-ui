import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { QrCodeCodeExamplesSection } from "./sections/snippet-sections";
import { QrCodeHeroSection } from "./sections/hero";

export default function QrCodePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <QrCodeHeroSection seo={seo} />
      <QrCodeCodeExamplesSection />
      <PreviewApiSection slug="qr-code" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
