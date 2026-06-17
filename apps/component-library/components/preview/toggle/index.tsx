import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToggleCodeExamplesSection } from "./sections/snippet-sections";
import { ToggleExamplesSection } from "./sections/component-demo";
import { ToggleHeroSection } from "./sections/hero";

export default function TogglePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ToggleHeroSection seo={seo} />
      <ToggleExamplesSection />
      <ToggleCodeExamplesSection />
      <PreviewApiSection slug="toggle" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
