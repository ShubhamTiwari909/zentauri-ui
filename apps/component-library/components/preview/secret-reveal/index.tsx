import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { SecretRevealCodeExamplesSection } from "./sections/snippet-sections";
import { SecretRevealHeroSection } from "./sections/hero";

export default function SecretRevealPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <SecretRevealHeroSection seo={seo} />
      <SecretRevealCodeExamplesSection />
      <PreviewApiSection slug="secret-reveal" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
