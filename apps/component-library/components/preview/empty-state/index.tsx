import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { EmptyStateCodeExamplesSection } from "./sections/empty-state-code-examples-section";
import { EmptyStateExamplesSection } from "./sections/empty-state-examples-section";
import { EmptyStateHeroSection } from "./sections/empty-state-hero-section";

export default function EmptyStatePreviewPage() {
  return (
    <PreviewPageShell>
      <EmptyStateHeroSection />
      <EmptyStateExamplesSection />
      <EmptyStateCodeExamplesSection />
    </PreviewPageShell>
  );
}
