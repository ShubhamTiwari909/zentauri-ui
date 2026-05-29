import OTPInputPreviewPage from "@/components/preview/otp-input";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("otp-input");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function OTPInputPreviewRoutePage() {
  return <OTPInputPreviewPage seo={seo} />;
}
