import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TimelineCodeExamplesSection } from "./sections/snippet-sections";
import { TimelineExamplesSection } from "./sections/component-demo";
import { TimelineHeroSection } from "./sections/hero";

export default function TimelinePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TimelineHeroSection seo={seo} />
      <TimelineExamplesSection />
      <TimelineCodeExamplesSection />
      <PreviewApiSection slug="timeline" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
