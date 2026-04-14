import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { EmptyStateExamplesSection } from "./sections/empty-state-examples-section";
import { EmptyStateHeroSection } from "./sections/empty-state-hero-section";

export default function EmptyStatePreviewPage() {
  return (
    <PreviewPageShell>
      <EmptyStateHeroSection />
      <EmptyStateExamplesSection />
    </PreviewPageShell>
  );
}
