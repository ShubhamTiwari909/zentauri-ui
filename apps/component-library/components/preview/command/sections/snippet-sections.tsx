"use client";

import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@zentauri-ui/zentauri-components/ui/command";

import { CommandPlayground } from "./components/playground";
import { commandHotkeySnippet } from "./components/snippets";

export function CommandCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Command palette variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance and size to preview the command palette live. Toggle
        Show output / Show code and the snippet updates to match the selected
        variant.
      </p>
      <CommandPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={commandHotkeySnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Hotkey: <span className="font-bold">⌘K / Ctrl+K</span> — open the
            palette from anywhere without a trigger button.
          </p>
          <Command hotkey="k">
            <CommandContent appearance="sky">
              <CommandInput placeholder="Type a command or search…" />
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
              <CommandFooter>Press ⌘K to toggle</CommandFooter>
            </CommandContent>
          </Command>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
