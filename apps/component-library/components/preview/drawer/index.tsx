import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { DrawerExamplesSection } from "./sections/drawer-examples-section";
import { DrawerHeroSection } from "./sections/drawer-hero-section";

export default function DrawerPreviewPage() {
  return (
    <PreviewPageShell>
      <DrawerHeroSection />
      <DrawerExamplesSection />
    </PreviewPageShell>
  );
}
