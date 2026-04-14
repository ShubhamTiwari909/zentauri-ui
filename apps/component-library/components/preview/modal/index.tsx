import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { ModalExamplesSection } from "./sections/modal-examples-section";
import { ModalHeroSection } from "./sections/modal-hero-section";

export default function ModalPreviewPage() {
  return (
    <PreviewPageShell>
      <ModalHeroSection />
      <ModalExamplesSection />
    </PreviewPageShell>
  );
}
