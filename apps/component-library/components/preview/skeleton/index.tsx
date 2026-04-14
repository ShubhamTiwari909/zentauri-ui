import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { SkeletonExamplesSection } from "./sections/skeleton-examples-section";
import { SkeletonHeroSection } from "./sections/skeleton-hero-section";

export default function SkeletonPreviewPage() {
  return (
    <PreviewPageShell>
      <SkeletonHeroSection />
      <SkeletonExamplesSection />
    </PreviewPageShell>
  );
}
