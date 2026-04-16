import TabsPreviewPage from "@/components/preview/tabs";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("tabs");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TabsPreviewRoutePage() {
  return <TabsPreviewPage seo={seo} />;
}
