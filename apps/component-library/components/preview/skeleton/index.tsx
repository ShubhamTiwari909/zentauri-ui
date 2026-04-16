import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SkeletonCodeExamplesSection } from "./sections/skeleton-code-examples-section";
import { SkeletonExamplesSection } from "./sections/skeleton-examples-section";
import { SkeletonHeroSection } from "./sections/skeleton-hero-section";

export default function SkeletonPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <SkeletonHeroSection seo={seo} />
      <SkeletonExamplesSection />
      <SkeletonCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
