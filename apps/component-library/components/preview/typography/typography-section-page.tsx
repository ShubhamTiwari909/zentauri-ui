import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

import { TypographyCodeExamplesSection } from "./sections/typography-code-examples-section";
import { TypographyHeroDemo } from "./typography-hero-demo";
import { TypographySectionBody } from "./typography-section-body";

export default function TypographySectionPage({
  seo,
  section,
}: {
  seo: PreviewSeoDocument;
  section: TypographySectionSlug;
}) {
  return (
    <PreviewPageShell>
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <PreviewHeroSeoBlock seo={seo} />
        <TypographyHeroDemo section={section} />
      </section>

      <div className="flex flex-col gap-12">
        <TypographySectionBody section={section} />
        <TypographyCodeExamplesSection section={section} />
      </div>

      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
