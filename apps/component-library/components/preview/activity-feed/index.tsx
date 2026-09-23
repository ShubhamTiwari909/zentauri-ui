import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ActivityFeedHeroSection } from "./sections/hero";
import { ActivityFeedCodeExamplesSection } from "./sections/snippet-sections";

export default function ActivityFeedPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ActivityFeedHeroSection seo={seo} />
      <ActivityFeedCodeExamplesSection />
      <PreviewApiSection slug="activity-feed" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
