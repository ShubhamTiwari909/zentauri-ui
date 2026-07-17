import CalendarPreviewPage from "@/components/preview/calendar";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("calendar");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CalendarPreviewRoutePage() {
  return <CalendarPreviewPage seo={seo} />;
}
