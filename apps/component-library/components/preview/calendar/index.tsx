import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { CalendarCodeExamplesSection } from "./sections/snippet-sections";
import { CalendarHeroSection } from "./sections/hero";

export default function CalendarPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CalendarHeroSection seo={seo} />
      <CalendarCodeExamplesSection />
      <PreviewApiSection slug="calendar" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
