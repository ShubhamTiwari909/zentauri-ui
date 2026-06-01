import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { OTPInputCodeExamplesSection } from "./sections/snippet-sections";
import { OTPInputExamplesSection } from "./sections/component-demo";
import { OTPInputHeroSection } from "./sections/hero";

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
