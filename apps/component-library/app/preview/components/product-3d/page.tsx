import Product3DPreviewPage from "@/components/preview/product-3d";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("product-3d");
export const metadata = previewSeoDocumentToMetadata(seo);

export default function Product3DPreviewRoutePage() {
  return <Product3DPreviewPage seo={seo} />;
}
