import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { ModalCodeExamplesSection } from "./sections/modal-code-examples-section";
import { ModalExamplesSection } from "./sections/modal-examples-section";
import { ModalHeroSection } from "./sections/modal-hero-section";

export default function ModalPreviewPage() {
  return (
    <PreviewPageShell>
      <ModalHeroSection />
      <ModalExamplesSection />
      <ModalCodeExamplesSection />
    </PreviewPageShell>
  );
}
