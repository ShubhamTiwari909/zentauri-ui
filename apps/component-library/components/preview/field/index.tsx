import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { FieldHeroSection } from "./sections/hero";
import { FieldCodeExamplesSection } from "./sections/snippet-sections";

export default function FieldPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <PreviewPageShell>
      <FieldHeroSection seo={seo} />
      <FieldCodeExamplesSection />
      <PreviewApiSection slug="field" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
