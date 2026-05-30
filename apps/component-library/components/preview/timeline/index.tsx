import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TimelineCodeExamplesSection } from "./sections/timeline-code-examples-section";
import { TimelineExamplesSection } from "./sections/timeline-examples-section";
import { TimelineHeroSection } from "./sections/timeline-hero-section";

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
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
