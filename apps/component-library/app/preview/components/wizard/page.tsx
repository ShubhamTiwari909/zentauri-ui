import WizardPreviewPage from "@/components/preview/wizard";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("wizard");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function WizardPreviewRoutePage() {
  return <WizardPreviewPage seo={seo} />;
}
