import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { DatePickerCodeExamplesSection } from "./sections/snippet-sections";
import { DatePickerHeroSection } from "./sections/hero";

export default function DatePickerPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <DatePickerHeroSection seo={seo} />
      <DatePickerCodeExamplesSection />
      <PreviewApiSection slug="date-picker" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
