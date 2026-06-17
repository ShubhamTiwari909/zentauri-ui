import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { EmptyStateCodeExamplesSection } from "./sections/snippet-sections";
import { EmptyStateExamplesSection } from "./sections/component-demo";
import { EmptyStateHeroSection } from "./sections/hero";

export default function EmptyStatePreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <EmptyStateHeroSection seo={seo} />
      <EmptyStateExamplesSection />
      <EmptyStateCodeExamplesSection />
      <PreviewApiSection slug="empty-state" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
