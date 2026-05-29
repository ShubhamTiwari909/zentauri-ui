import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CommandDemoProps } from "./command-code-examples.types";

export function commandSnippet({ appearance, size }: CommandDemoProps): string {
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Command>
  <CommandTrigger>Open menu</CommandTrigger>
  <CommandContent${appearanceAttr}${sizeAttr}>
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
</Command>`;
}

export function commandHotkeySnippet(): string {
  return `${variantLeadComment("global ⌘K hotkey, uncontrolled")}<Command hotkey="k">
  <CommandContent>
    <CommandInput placeholder="Type a command or search…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem value="home" onSelect={() => router.push("/")}>
          Home
        </CommandItem>
      </CommandGroup>
    </CommandList>
    <CommandFooter>Press ⌘K to toggle</CommandFooter>
  </CommandContent>
</Command>`;
}

export function commandAnimatedSnippet(): string {
  return `${variantLeadComment("animated entry, animation · slide-down")}<Command>
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
</Command>`;
}
