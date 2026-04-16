import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { EmptyStateCodeExamplesSection } from "./sections/empty-state-code-examples-section";
import { EmptyStateExamplesSection } from "./sections/empty-state-examples-section";
import { EmptyStateHeroSection } from "./sections/empty-state-hero-section";

export default function EmptyStatePreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <EmptyStateHeroSection seo={seo} />
      <EmptyStateExamplesSection />
      <EmptyStateCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
