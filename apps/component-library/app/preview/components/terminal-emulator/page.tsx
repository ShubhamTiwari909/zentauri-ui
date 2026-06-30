import TerminalEmulatorPreviewPage from "@/components/preview/terminal-emulator";
import { previewSeoDocumentToMetadata } from "@/lib/preview-seo";
import { getPreviewSeo } from "@/lib/preview-seo-registry";

const seo = getPreviewSeo("terminal-emulator");

export const metadata = previewSeoDocumentToMetadata(seo);

export default function TerminalEmulatorPreviewRoutePage() {
  return <TerminalEmulatorPreviewPage seo={seo} />;
}
