import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AvatarCodeExamplesSection } from "./sections/snippet-sections";
import { AvatarExamplesSection } from "./sections/component-demo";
import { AvatarHeroSection } from "./sections/hero";

export default function AvatarPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <AvatarHeroSection seo={seo} />
      <AvatarExamplesSection />
      <AvatarCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
