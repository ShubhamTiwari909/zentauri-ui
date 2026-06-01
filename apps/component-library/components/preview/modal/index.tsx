import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ModalCodeExamplesSection } from "./sections/snippet-sections";
import { ModalExamplesSection } from "./sections/component-demo";
import { ModalHeroSection } from "./sections/hero";

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
