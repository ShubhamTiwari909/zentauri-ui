import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { InputsAppearanceMotionSection } from "./sections/inputs-appearance-motion-section";
import { InputsCheckboxSection } from "./sections/inputs-checkbox-section";
import { InputsCodeExamplesSection } from "./sections/inputs-code-examples-section";
import { InputsControlledSection } from "./sections/inputs-controlled-section";
import { InputsFileUploadSection } from "./sections/inputs-file-upload-section";
import { InputsHeroSection } from "./sections/inputs-hero-section";
import { InputsRadioSection } from "./sections/inputs-radio-section";
import { InputsSizesSection } from "./sections/inputs-sizes-section";
import { InputsStatesSection } from "./sections/inputs-states-section";
import { InputsTextareaSection } from "./sections/inputs-textarea-section";

export default function InputsPreviewPage({ seo }: { seo: PreviewSeoDocument }) {
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
