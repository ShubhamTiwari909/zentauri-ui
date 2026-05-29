import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Checkbox } from "@zentauri-ui/zentauri-components/ui/checkbox";

export function CheckboxHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="grid max-w-md gap-4">
        <Checkbox appearance="success" defaultChecked>
          Accept terms and workspace policy
        </Checkbox>
        <Checkbox appearance="info" indeterminate>
          Enable selected notifications
        </Checkbox>
        <Checkbox appearance="violet" size="lg">
          Include advanced audit logs
        </Checkbox>
      </SectionCard>
    </Section>
  );
}
