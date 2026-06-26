import PasswordStrengthMeterPreviewPage from "@/components/preview/password-strength-meter";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("password-strength-meter");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function PasswordStrengthMeterPreviewRoutePage() {
  return <PasswordStrengthMeterPreviewPage seo={seo} />;
}
