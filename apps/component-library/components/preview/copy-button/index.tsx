import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { CopyButtonCodeExamplesSection } from "./sections/snippet-sections";
import { CopyButtonExamplesSection } from "./sections/component-demo";
import { CopyButtonHeroSection } from "./sections/hero";

export default function CopyButtonPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <CopyButtonHeroSection seo={seo} />
      <CopyButtonExamplesSection />
      <CopyButtonCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
