import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewApiSection } from "@/components/preview/api-section";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Product3DHeroSection } from "./sections/hero";
import { Product3DCodeExamplesSection } from "./sections/code-examples";

export default function Product3DPreviewPage({
  seo,
}: {
  seo: PreviewSeoDocument;
}) {
  return (
    <PreviewPageShell>
      <Product3DHeroSection seo={seo} />
      <Product3DCodeExamplesSection />
      <PreviewApiSection slug="product-3d" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
