import TimezoneSelectPreviewPage from "@/components/preview/timezone-select";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("timezone-select");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TimezoneSelectPreviewRoutePage() {
  return <TimezoneSelectPreviewPage seo={seo} />;
}
