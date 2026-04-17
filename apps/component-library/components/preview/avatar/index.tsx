import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { AvatarCodeExamplesSection } from "./sections/avatar-code-examples-section";
import { AvatarExamplesSection } from "./sections/avatar-examples-section";
import { AvatarHeroSection } from "./sections/avatar-hero-section";

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
