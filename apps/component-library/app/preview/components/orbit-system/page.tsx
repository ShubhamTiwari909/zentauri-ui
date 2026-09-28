import OrbitSystemPreviewPage from "@/components/preview/orbit-system";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("orbit-system");
export const metadata = previewSeoDocumentToMetadata(seo);

export default function OrbitSystemPreviewRoutePage() {
  return <OrbitSystemPreviewPage seo={seo} />;
}
