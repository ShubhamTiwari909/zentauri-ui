import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { OTPInputCodeExamplesSection } from "./sections/otp-input-code-examples-section";
import { OTPInputExamplesSection } from "./sections/otp-input-examples-section";
import { OTPInputHeroSection } from "./sections/otp-input-hero-section";

export default function OTPInputPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <OTPInputHeroSection seo={seo} />
      <OTPInputExamplesSection />
      <OTPInputCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
