import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { AudioPlayerCodeExamplesSection } from "./sections/snippet-sections";
import { AudioPlayerHeroSection } from "./sections/hero";

export default function AudioPlayerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AudioPlayerHeroSection seo={seo} />
      <AudioPlayerCodeExamplesSection />
      <PreviewApiSection slug="audio-player" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
