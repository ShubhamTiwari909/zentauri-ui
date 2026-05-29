import CommandPreviewPage from "@/components/preview/command";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("command");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function CommandPreviewRoutePage() {
  return <CommandPreviewPage seo={seo} />;
}
