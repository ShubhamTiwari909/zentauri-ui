import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ModalCodeExamplesSection } from "./sections/modal-code-examples-section";
import { ModalExamplesSection } from "./sections/modal-examples-section";
import { ModalHeroSection } from "./sections/modal-hero-section";

export default function ModalPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <ModalHeroSection seo={seo} />
      <ModalExamplesSection />
      <ModalCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
