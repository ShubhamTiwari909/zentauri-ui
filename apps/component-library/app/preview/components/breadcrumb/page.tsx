import BreadcrumbPreviewPage from "@/components/preview/breadcrumb";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("breadcrumb");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function BreadcrumbPreviewRoutePage() {
  return <BreadcrumbPreviewPage seo={seo} />;
}
