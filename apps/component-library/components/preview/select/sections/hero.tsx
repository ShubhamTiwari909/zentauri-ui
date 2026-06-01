import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

export function SelectHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-md">
        <Select defaultValue={["next"]} multiple={false}>
          <SelectTrigger variant="emerald" size="md">
            <SelectValue placeholder="Pick a framework" />
          </SelectTrigger>
          <SelectContent appearance="emerald" size="md" spacing="sm">
            <SelectItem value="next" appearance="emerald">
              Next.js
            </SelectItem>
            <SelectItem value="vite" appearance="emerald">
              Vite
            </SelectItem>
            <SelectItem value="remix" appearance="emerald">
              Remix
            </SelectItem>
          </SelectContent>
        </Select>
      </SectionCard>
    </Section>
  );
}
