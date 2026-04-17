import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DividerCodeExamplesSection } from "./sections/divider-code-examples-section";
import { DividerExamplesSection } from "./sections/divider-examples-section";
import { DividerHeroSection } from "./sections/divider-hero-section";

export default function DividerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DividerHeroSection seo={seo} />
      <DividerExamplesSection />
      <DividerCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
