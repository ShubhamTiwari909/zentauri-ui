import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { AvatarCodeExamplesSection } from "./sections/avatar-code-examples-section";
import { AvatarExamplesSection } from "./sections/avatar-examples-section";
import { AvatarHeroSection } from "./sections/avatar-hero-section";

export default function AvatarPreviewPage() {
  return (
    <PreviewPageShell>
      <AvatarHeroSection />
      <AvatarExamplesSection />
      <AvatarCodeExamplesSection />
    </PreviewPageShell>
  );
}
