import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DividerCodeExamplesSection } from "./sections/snippet-sections";
import { DividerExamplesSection } from "./sections/component-demo";
import { DividerHeroSection } from "./sections/hero";

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
