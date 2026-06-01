import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DrawerCodeExamplesSection } from "./sections/snippet-sections";
import { DrawerExamplesSection } from "./sections/component-demo";
import { DrawerHeroSection } from "./sections/hero";

export default function DrawerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DrawerHeroSection seo={seo} />
      <DrawerExamplesSection />
      <DrawerCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
