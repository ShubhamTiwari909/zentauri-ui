import DrawerPreviewPage from "@/components/preview/drawer";
import PageWrapper from "@/components/common/PageWrapper";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("drawer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DrawerPreviewRoutePage() {
  return <PageWrapper><DrawerPreviewPage seo={seo} /></PageWrapper>;
}
