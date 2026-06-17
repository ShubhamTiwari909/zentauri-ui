import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { TreeViewCodeExamplesSection } from "./sections/snippet-sections";
import { TreeViewExamplesSection } from "./sections/component-demo";
import { TreeViewHeroSection } from "./sections/hero";

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
      <PreviewApiSection slug="tree-view" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
