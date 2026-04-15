import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { DrawerCodeExamplesSection } from "./sections/drawer-code-examples-section";
import { DrawerExamplesSection } from "./sections/drawer-examples-section";
import { DrawerHeroSection } from "./sections/drawer-hero-section";

export default function DrawerPreviewPage() {
  return (
    <PreviewPageShell>
      <DrawerHeroSection />
      <DrawerExamplesSection />
      <DrawerCodeExamplesSection />
    </PreviewPageShell>
  );
}
