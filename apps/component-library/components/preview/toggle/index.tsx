import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToggleCodeExamplesSection } from "./sections/toggle-code-examples-section";
import { ToggleExamplesSection } from "./sections/toggle-examples-section";
import { ToggleHeroSection } from "./sections/toggle-hero-section";

export default function TogglePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <ToggleHeroSection seo={seo} />
      <ToggleExamplesSection />
      <ToggleCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
