import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandTrigger,
} from "@zentauri-ui/zentauri-components/ui/command";

export function CommandHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="grid max-w-md gap-4">
        <Command hotkey="k">
          <CommandTrigger>Open command menu (⌘K)</CommandTrigger>
          <CommandContent appearance="glass">
            <CommandInput placeholder="Search commands…" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem value="home">Home</CommandItem>
                <CommandItem value="projects">Projects</CommandItem>
                <CommandItem value="settings">Settings</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem value="new-project">Create project</CommandItem>
                <CommandItem value="invite">Invite teammate</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandContent>
        </Command>
      </SectionCard>
    </Section>
  );
}
