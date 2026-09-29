import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { TagsInputHeroSection } from "./sections/hero";
import { TagsInputCodeExamplesSection } from "./sections/snippet-sections";

export default function TagsInputPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <TagsInputHeroSection seo={seo} />
      <TagsInputCodeExamplesSection />
      <PreviewApiSection slug="tags-input" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
