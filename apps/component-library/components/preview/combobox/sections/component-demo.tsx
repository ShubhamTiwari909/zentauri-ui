import { Section } from "@/components/common/Section";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
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
import ComboboxControlled from "./components/controlled";

export function ComboboxExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-white">
        Single-select, multi-select, disabled items, and controlled value
        patterns with trigger and content variants.
      </p>
      <div className="mt-6 max-w-md space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment("Single-select · ghost trigger sm, default content")}
<Combobox defaultValue={["vue"]} multiple={false}>
  <ComboboxTrigger variant="ghost" size="sm">
    <ComboboxValue placeholder="Select framework" />
  </ComboboxTrigger>
  <ComboboxContent appearance="default" size="md">
    <ComboboxSearch placeholder="Search..." />
    <ComboboxList>
      <ComboboxItem value="react">React</ComboboxItem>
      <ComboboxItem value="vue">Vue</ComboboxItem>
      <ComboboxItem value="svelte">Svelte</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        >
          <Combobox defaultValue={["vue"]} multiple={false}>
            <ComboboxTrigger variant="ghost" size="sm">
              <ComboboxValue placeholder="Select framework" />
            </ComboboxTrigger>
            <ComboboxContent appearance="default" size="md">
              <ComboboxSearch placeholder="Search..." />
              <ComboboxList>
                <ComboboxItem value="react">React</ComboboxItem>
                <ComboboxItem value="vue">Vue</ComboboxItem>
                <ComboboxItem value="svelte">Svelte</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("Multi-select · outline trigger md, sky content")}
<Combobox multiple defaultValue={["typescript", "rust"]}>
  <ComboboxTrigger variant="outline" size="md">
    <ComboboxValue placeholder="Pick languages" />
  </ComboboxTrigger>
  <ComboboxContent appearance="sky" size="md">
    <ComboboxSearch placeholder="Search languages..." />
    <ComboboxList>
      <ComboboxItem value="typescript">TypeScript</ComboboxItem>
      <ComboboxItem value="javascript">JavaScript</ComboboxItem>
      <ComboboxItem value="python">Python</ComboboxItem>
      <ComboboxItem value="rust">Rust</ComboboxItem>
      <ComboboxItem value="go">Go</ComboboxItem>
      <ComboboxEmpty>No language found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        >
          <Combobox multiple defaultValue={["typescript", "rust"]}>
            <ComboboxTrigger variant="outline" size="md">
              <ComboboxValue placeholder="Pick languages" />
            </ComboboxTrigger>
            <ComboboxContent appearance="sky" size="md">
              <ComboboxSearch placeholder="Search languages..." />
              <ComboboxList>
                <ComboboxItem value="typescript">TypeScript</ComboboxItem>
                <ComboboxItem value="javascript">JavaScript</ComboboxItem>
                <ComboboxItem value="python">Python</ComboboxItem>
                <ComboboxItem value="rust">Rust</ComboboxItem>
                <ComboboxItem value="go">Go</ComboboxItem>
                <ComboboxEmpty>No language found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={`${variantLeadComment("With disabled item and empty state")}
<Combobox defaultValue={[]} multiple={false}>
  <ComboboxTrigger variant="rose" size="md">
    <ComboboxValue placeholder="Select a tool" />
  </ComboboxTrigger>
  <ComboboxContent appearance="rose" size="md">
    <ComboboxSearch placeholder="Search tools..." />
    <ComboboxList>
      <ComboboxItem value="vscode">VS Code</ComboboxItem>
      <ComboboxItem value="neovim">Neovim</ComboboxItem>
      <ComboboxItem value="emacs" disabled>Emacs (disabled)</ComboboxItem>
      <ComboboxItem value="webstorm">WebStorm</ComboboxItem>
      <ComboboxEmpty>No tool found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
        >
          <Combobox defaultValue={[]} multiple={false}>
            <ComboboxTrigger variant="rose" size="md">
              <ComboboxValue placeholder="Select a tool" />
            </ComboboxTrigger>
            <ComboboxContent appearance="rose" size="md">
              <ComboboxSearch placeholder="Search tools..." />
              <ComboboxList>
                <ComboboxItem value="vscode">VS Code</ComboboxItem>
                <ComboboxItem value="neovim">Neovim</ComboboxItem>
                <ComboboxItem value="emacs" disabled>
                  Emacs (disabled)
                </ComboboxItem>
                <ComboboxItem value="webstorm">WebStorm</ComboboxItem>
                <ComboboxEmpty>No tool found.</ComboboxEmpty>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </PreviewCodeShowcase>

        <ComboboxControlled />
      </div>
    </Section>
  );
}
