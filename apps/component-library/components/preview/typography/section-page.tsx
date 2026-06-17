import { Section } from "@/components/common/Section";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import { PreviewApiSection } from "@/components/preview/api-section";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import type { TypographySectionSlug } from "@/lib/typography-preview-registry";

import { TypographyCodeExamplesSection } from "./sections/snippet-sections";
import { TypographyHeroDemo } from "./hero-demo";
import { TypographySectionBody } from "./section-body";

export default function TypographySectionPage({
  seo,
  section,
}: {
  seo: PreviewSeoDocument;
  section: TypographySectionSlug;
}) {
  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />
        <TypographyHeroDemo section={section} />
      </Section>

      <div className="flex flex-col gap-12">
        <TypographySectionBody section={section} />
        <TypographyCodeExamplesSection section={section} />
      </div>

      <PreviewApiSection slug="typography" />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
