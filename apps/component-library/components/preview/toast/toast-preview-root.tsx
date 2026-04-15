"use client";

import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { ToastProvider, ToastViewport } from "@repo/components/ui";
import { ToastCodeExamplesSection } from "./sections/toast-code-examples-section";
import { ToastExamplesSection } from "./sections/toast-examples-section";
import { ToastHeroSection } from "./sections/toast-hero-section";

export function ToastPreviewRoot() {
  return (
    <ToastProvider>
      <PreviewPageShell>
        <ToastHeroSection />
        <ToastExamplesSection />
        <ToastCodeExamplesSection />
      </PreviewPageShell>
      <ToastViewport position="bottom-right" />
    </ToastProvider>
  );
}
