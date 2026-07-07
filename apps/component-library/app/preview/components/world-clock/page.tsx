import WorldClockPreviewPage from "@/components/preview/world-clock";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("world-clock");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function WorldClockPreviewRoutePage() {
  return <WorldClockPreviewPage seo={seo} />;
}
