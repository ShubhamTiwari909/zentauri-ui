import DatePickerPreviewPage from "@/components/preview/date-picker";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("date-picker");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DatePickerPreviewRoutePage() {
  return <DatePickerPreviewPage seo={seo} />;
}
