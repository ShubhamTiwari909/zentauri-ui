import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { ContextMenuCodeExamplesSection } from "./sections/context-menu-code-examples-section";
import { ContextMenuExamplesSection } from "./sections/context-menu-examples-section";
import { ContextMenuHeroSection } from "./sections/context-menu-hero-section";

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
