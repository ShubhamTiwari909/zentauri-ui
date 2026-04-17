import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DrawerCodeExamplesSection } from "./sections/drawer-code-examples-section";
import { DrawerExamplesSection } from "./sections/drawer-examples-section";
import { DrawerHeroSection } from "./sections/drawer-hero-section";

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
