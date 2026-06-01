import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Toggle } from "@zentauri-ui/zentauri-components/ui/toggle";

export function ToggleHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="flex flex-wrap items-center gap-6">
        <Toggle defaultChecked aria-label="Enable notifications" />
        <Toggle
          appearance="success"
          defaultChecked
          aria-label="Auto-save drafts"
        />
        <Toggle appearance="destructive" size="lg" aria-label="Danger mode" />
      </SectionCard>
    </Section>
  );
}
