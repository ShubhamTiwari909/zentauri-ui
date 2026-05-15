import DynamicStepperPreviewPage from "@/components/preview/dynamic-stepper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("dynamic-stepper");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DynamicStepperPreviewRoutePage() {
  return <DynamicStepperPreviewPage seo={seo} />;
}
