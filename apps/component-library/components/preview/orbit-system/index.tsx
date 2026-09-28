import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { OrbitSystemHeroSection } from "./sections/hero";
import { OrbitSystemCodeExamplesSection } from "./sections/code-examples";

export default function OrbitSystemPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <OrbitSystemHeroSection seo={seo} />
      <OrbitSystemCodeExamplesSection />
      <PreviewApiSection slug="orbit-system" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
