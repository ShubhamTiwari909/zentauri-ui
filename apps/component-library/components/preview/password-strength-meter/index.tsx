import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { PasswordStrengthMeterCodeExamplesSection } from "./sections/snippet-sections";
import { PasswordStrengthMeterHeroSection } from "./sections/hero";

export default function PasswordStrengthMeterPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <PasswordStrengthMeterHeroSection seo={seo} />
      <PasswordStrengthMeterCodeExamplesSection />
      <PreviewApiSection slug="password-strength-meter" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
