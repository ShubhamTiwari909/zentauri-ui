import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";
import { ToastViewportAnimated } from "@zentauri-ui/zentauri-components/ui/toast/animated";
import { ToastCodeExamplesSection } from "./sections/snippet-sections";
import { ToastExamplesSection } from "./sections/component-demo";
import { ToastHeroSection } from "./sections/hero";

export function ToastPreviewRoot({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <ToastProvider>
      <PreviewPageShell>
        <ToastHeroSection seo={seo} />
        <ToastExamplesSection />
        <ToastCodeExamplesSection />
        <PreviewApiSection slug="toast" />
        <PreviewSeoDoc doc={seo} />
      </PreviewPageShell>
      <ToastViewportAnimated position="bottom-right" />
    </ToastProvider>
  );
}
