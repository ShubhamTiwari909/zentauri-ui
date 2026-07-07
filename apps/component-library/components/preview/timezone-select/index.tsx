import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { TimezoneSelectCodeExamplesSection } from "./sections/snippet-sections";
import { TimezoneSelectHeroSection } from "./sections/hero";

export default function TimezoneSelectPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TimezoneSelectHeroSection seo={seo} />
      <TimezoneSelectCodeExamplesSection />
      <PreviewApiSection slug="timezone-select" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
