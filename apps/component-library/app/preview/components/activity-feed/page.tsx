import ActivityFeedPreviewPage from "@/components/preview/activity-feed";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("activity-feed");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function ActivityFeedPreviewRoutePage() {
  return <ActivityFeedPreviewPage seo={seo} />;
}
