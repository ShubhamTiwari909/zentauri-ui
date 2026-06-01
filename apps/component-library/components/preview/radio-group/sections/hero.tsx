import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  RadioGroup,
  RadioGroupItem,
} from "@zentauri-ui/zentauri-components/ui/radio-group";

export function RadioGroupHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-md">
        <RadioGroup defaultValue="pro" appearance="violet" aria-label="Plan">
          <RadioGroupItem value="starter">Starter</RadioGroupItem>
          <RadioGroupItem value="pro">Pro</RadioGroupItem>
          <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
        </RadioGroup>
      </SectionCard>
    </Section>
  );
}
