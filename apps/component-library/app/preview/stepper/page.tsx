import StepperPreviewPage from "@/components/preview/stepper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("stepper");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function StepperPreviewRoutePage() {
  return <StepperPreviewPage seo={seo} />;
}
