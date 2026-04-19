import DrawerPreviewPage from "@/components/preview/drawer";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("drawer");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function DrawerPreviewRoutePage() {
  return <DrawerPreviewPage seo={seo} />;
}
