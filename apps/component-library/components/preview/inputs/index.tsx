import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { InputsAppearanceMotionSection } from "./sections/appearance-motion";
import { InputsCheckboxSection } from "./sections/checkbox";
import { InputsCodeExamplesSection } from "./sections/snippet-sections";
import { InputsControlledSection } from "./sections/controlled";
import { InputsFileUploadSection } from "./sections/file-upload";
import { InputsHeroSection } from "./sections/hero";
import { InputsRadioSection } from "./sections/radio";
import { InputsSizesSection } from "./sections/sizes";
import { InputsStatesSection } from "./sections/states";
import { InputsTextareaSection } from "./sections/textarea";

export default function InputsPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <InputsHeroSection seo={seo} />
      <InputsAppearanceMotionSection />
      <InputsTextareaSection />
      <InputsFileUploadSection />
      <InputsCheckboxSection />
      <InputsRadioSection />
      <InputsSizesSection />
      <InputsStatesSection />
      <InputsControlledSection />
      <InputsCodeExamplesSection />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
