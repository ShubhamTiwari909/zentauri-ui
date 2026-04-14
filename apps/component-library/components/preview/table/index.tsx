import { PreviewPageShell } from "@/components/preview/common/preview-page-shell";
import { TableCodeExamplesSection } from "./sections/table-code-examples-section";
import { TableExamplesSection } from "./sections/table-examples-section";
import { TableHeroSection } from "./sections/table-hero-section";

export default function TablePreviewPage() {
  return (
    <PreviewPageShell>
      <TableHeroSection />
      <TableExamplesSection />
      <TableCodeExamplesSection />
    </PreviewPageShell>
  );
}
