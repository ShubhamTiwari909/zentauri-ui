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

import {
  COMMAND_APPEARANCES,
  COMMAND_SIZES,
} from "./components/data";
import { CommandDemo } from "./components/demo";
import {
  commandHotkeySnippet,
  commandSnippet,
} from "./components/snippets";

export function CommandCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Command palette variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row, then open the menu to try
        keyboard navigation (↑ ↓ Enter Esc) and live filtering. Snippets start
        with a Variant line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {COMMAND_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={commandSnippet({ appearance, size: "md" })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span> |
              Size: <span className="font-bold">MD</span>
            </p>
            <CommandDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {COMMAND_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={commandSnippet({ appearance: "default", size })}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance: <span className="font-bold">DEFAULT</span> | Size:{" "}
              <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <CommandDemo appearance="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase key="hotkey" code={commandHotkeySnippet()}>
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
