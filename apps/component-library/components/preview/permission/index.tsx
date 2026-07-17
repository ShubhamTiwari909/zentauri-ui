import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PermissionHeroSection } from "./sections/hero";
import { PermissionCodeExamplesSection } from "./sections/snippet-sections";
import { PermissionPlayground } from "./sections/components/playground";

export default function PermissionPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <PermissionHeroSection seo={seo} />
      <PermissionPlayground />
      <PermissionCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
