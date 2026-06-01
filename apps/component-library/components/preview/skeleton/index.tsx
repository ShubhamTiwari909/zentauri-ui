import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SkeletonCodeExamplesSection } from "./sections/snippet-sections";
import { SkeletonExamplesSection } from "./sections/component-demo";
import { SkeletonHeroSection } from "./sections/hero";

export default function SkeletonPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SkeletonHeroSection seo={seo} />
      <SkeletonExamplesSection />
      <SkeletonCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
