import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { AvatarExamplesSection } from "./sections/avatar-examples-section";
import { AvatarHeroSection } from "./sections/avatar-hero-section";

export default function AvatarPreviewPage() {
  return (
    <PreviewPageShell>
      <AvatarHeroSection />
      <AvatarExamplesSection />
    </PreviewPageShell>
  );
}
