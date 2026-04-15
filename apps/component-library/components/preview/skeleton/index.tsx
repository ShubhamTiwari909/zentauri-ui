import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { SkeletonCodeExamplesSection } from "./sections/skeleton-code-examples-section";
import { SkeletonExamplesSection } from "./sections/skeleton-examples-section";
import { SkeletonHeroSection } from "./sections/skeleton-hero-section";

export default function SkeletonPreviewPage() {
  return (
    <PreviewPageShell>
      <SkeletonHeroSection />
      <SkeletonExamplesSection />
      <SkeletonCodeExamplesSection />
    </PreviewPageShell>
  );
}
