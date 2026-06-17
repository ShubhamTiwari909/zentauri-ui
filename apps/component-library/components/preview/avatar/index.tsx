import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AvatarCodeExamplesSection } from "./sections/snippet-sections";
import { AvatarHeroSection } from "./sections/hero";

export default function AvatarPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AvatarHeroSection seo={seo} />
      <AvatarCodeExamplesSection />
      <PreviewApiSection slug="avatar" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
