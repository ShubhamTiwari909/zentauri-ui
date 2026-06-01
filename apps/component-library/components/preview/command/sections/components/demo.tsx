"use client";

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

import type { CommandDemoProps } from "./types";

export function CommandDemo({ appearance, size }: CommandDemoProps) {
  return (
    <Command>
      <CommandTrigger>Open menu</CommandTrigger>
      <CommandContent appearance={appearance} size={size}>
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
            <CommandItem value="invite">Invite teammate</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandContent>
    </Command>
  );
}
