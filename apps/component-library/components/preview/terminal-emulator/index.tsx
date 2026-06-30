import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TerminalEmulatorCodeExamplesSection } from "./sections/snippet-sections";
import { TerminalEmulatorHeroSection } from "./sections/hero";

export default function TerminalEmulatorPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TerminalEmulatorHeroSection seo={seo} />
      <TerminalEmulatorCodeExamplesSection />
      <PreviewApiSection slug="terminal-emulator" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
