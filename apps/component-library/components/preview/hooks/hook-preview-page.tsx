import { Section } from "@/components/common/Section";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/preview-seo-doc";
import type { HookPreviewSlug } from "@/lib/hook-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { HookImportSnippet } from "./hook-import-snippet";
import { HookInteractiveSection } from "./hook-interactive-section";

type HookPreviewPageProps = {
  seo: PreviewSeoDocument;
  slug: HookPreviewSlug;
};

export default function HookPreviewPage({ seo, slug }: HookPreviewPageProps) {
  return (
    <PreviewPageShell>
      <Section variant="plain" className="space-y-6">
        <PreviewHeroSeoBlock seo={seo} />
      </Section>
      <HookImportSnippet slug={slug} />
      <HookInteractiveSection slug={slug} />
      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
