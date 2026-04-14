"use client";

import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { ToastExamplesSection } from "./sections/toast-examples-section";
import { ToastHeroSection } from "./sections/toast-hero-section";

export function ToastPreviewRoot() {
  return (
    <ToastProvider>
      <PreviewPageShell>
        <ToastHeroSection />
        <ToastExamplesSection />
      </PreviewPageShell>
      <ToastViewport position="bottom-right" />
    </ToastProvider>
  );
}
