import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { TreeViewCodeExamplesSection } from "./sections/tree-view-code-examples-section";
import { TreeViewExamplesSection } from "./sections/tree-view-examples-section";
import { TreeViewHeroSection } from "./sections/tree-view-hero-section";

export default function TreeViewPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TreeViewHeroSection seo={seo} />
      <TreeViewExamplesSection />
      <TreeViewCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
