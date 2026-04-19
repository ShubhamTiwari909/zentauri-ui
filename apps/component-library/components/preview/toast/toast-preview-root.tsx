import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";
import { ToastViewportAnimated } from "@zentauri-ui/zentauri-components/ui/toast/animated";
import { ToastCodeExamplesSection } from "./sections/toast-code-examples-section";
import { ToastExamplesSection } from "./sections/toast-examples-section";
import { ToastHeroSection } from "./sections/toast-hero-section/toast-hero-section";

export function ToastPreviewRoot({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <ToastProvider>
      <PreviewPageShell>
        <ToastHeroSection seo={seo} />
        <ToastExamplesSection />
        <ToastCodeExamplesSection />
        <PreviewSeoDoc doc={seo} />
      </PreviewPageShell>
      <ToastViewportAnimated position="bottom-right" />
    </ToastProvider>
  );
}
