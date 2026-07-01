import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PackageInstallCommandCodeExamplesSection } from "./sections/snippet-sections";
import { PackageInstallCommandHeroSection } from "./sections/hero";

export default function PackageInstallCommandPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <PackageInstallCommandHeroSection seo={seo} />
      <PackageInstallCommandCodeExamplesSection />
      <PreviewApiSection slug="package-install-command" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
