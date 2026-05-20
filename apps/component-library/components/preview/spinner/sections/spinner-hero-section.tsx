import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Spinner } from "@zentauri-ui/zentauri-components/ui/spinner/animated";

export function SpinnerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="flex flex-wrap items-center gap-6">
        <Spinner appearance="sky" size="lg" variant="ring" />
        <Spinner appearance="secondary" size="md" variant="dots" />
        <Spinner appearance="emerald" size="md" variant="bars" />
      </SectionCard>
    </Section>
  );
}
