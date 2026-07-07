import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { RelativeTimeCodeExamplesSection } from "./sections/snippet-sections";
import { RelativeTimeHeroSection } from "./sections/hero";

export default function RelativeTimePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <RelativeTimeHeroSection seo={seo} />
      <RelativeTimeCodeExamplesSection />
      <PreviewApiSection slug="relative-time" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
