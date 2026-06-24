import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { TypingIndicatorCodeExamplesSection } from "./sections/snippet-sections";
import { TypingIndicatorHeroSection } from "./sections/hero";

export default function TypingIndicatorPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TypingIndicatorHeroSection seo={seo} />
      <TypingIndicatorCodeExamplesSection />
      <PreviewApiSection slug="typing-indicator" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
