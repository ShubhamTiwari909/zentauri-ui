import DynamicStepperPreviewPage from "@/components/preview/dynamic-stepper";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("dynamic-stepper");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DynamicStepperPreviewRoutePage() {
  return <PageWrapper><DynamicStepperPreviewPage seo={seo} /></PageWrapper>;
}
