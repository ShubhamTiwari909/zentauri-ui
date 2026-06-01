import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ContextMenuCodeExamplesSection } from "./sections/snippet-sections";
import { ContextMenuExamplesSection } from "./sections/component-demo";
import { ContextMenuHeroSection } from "./sections/hero";

export default function ContextMenuPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <ContextMenuHeroSection seo={seo} />
      <ContextMenuExamplesSection />
      <ContextMenuCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
