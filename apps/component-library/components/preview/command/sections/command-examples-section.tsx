"use client";

import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandTrigger,
} from "@zentauri-ui/zentauri-components/ui/command";
import { CommandContentAnimated } from "@zentauri-ui/zentauri-components/ui/command/animated";

export function CommandExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use the animated entrypoint when the palette should spring in. It honors
        reduced-motion preferences and falls back to a fade.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("animated entry, animation · slide-down")}<Command>
  <CommandTrigger>Open menu</CommandTrigger>
  <CommandContentAnimated animation="slide-down" appearance="glass">
    <CommandInput placeholder="Search commands…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem value="home">Home</CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandContentAnimated>
</Command>`}
        >
          <Command>
            <CommandTrigger>Open menu</CommandTrigger>
            <CommandContentAnimated animation="slide-down" appearance="glass">
              <CommandInput placeholder="Search commands…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Navigation">
                  <CommandItem value="home">Home</CommandItem>
                  <CommandItem value="projects">Projects</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Actions">
                  <CommandItem value="new-project">Create project</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandContentAnimated>
          </Command>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
