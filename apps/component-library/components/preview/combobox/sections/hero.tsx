import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxTrigger,
  ComboboxValue,
} from "@zentauri-ui/zentauri-components/ui/combobox";

export function ComboboxHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="max-w-md">
        <Combobox defaultValue={["react"]} multiple={false}>
          <ComboboxTrigger variant="indigo" size="md">
            <ComboboxValue placeholder="Select a framework" />
          </ComboboxTrigger>
          <ComboboxContent appearance="indigo" size="md">
            <ComboboxSearch placeholder="Search frameworks..." />
            <ComboboxList>
              <ComboboxItem value="react">React</ComboboxItem>
              <ComboboxItem value="vue">Vue</ComboboxItem>
              <ComboboxItem value="svelte">Svelte</ComboboxItem>
              <ComboboxItem value="solid">Solid</ComboboxItem>
              <ComboboxItem value="qwik">Qwik</ComboboxItem>
              <ComboboxItem value="angular" disabled>
                Angular (disabled)
              </ComboboxItem>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </SectionCard>
    </Section>
  );
}
