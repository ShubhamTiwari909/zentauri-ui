import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type {
  ComboboxContentDemoProps,
  ComboboxTriggerDemoProps,
} from "./types";

export function comboboxTriggerSnippet(opts: ComboboxTriggerDemoProps): string {
  const { triggerVariant, triggerSize } = opts;
  const variantAttr =
    triggerVariant === "default" ? "" : ` variant="${triggerVariant}"`;
  const sizeAttr = triggerSize === "md" ? "" : ` size="${triggerSize}"`;
  return `${variantLeadComment(`ComboboxTrigger · variant · ${triggerVariant}, size · ${triggerSize}`)}<Combobox defaultValue={["react"]} multiple={false}>
  <ComboboxTrigger${variantAttr}${sizeAttr}>
    <ComboboxValue placeholder="Select framework" />
  </ComboboxTrigger>
  <ComboboxContent>
    <ComboboxSearch placeholder="Search..." />
    <ComboboxList>
      <ComboboxItem value="react">React</ComboboxItem>
      <ComboboxItem value="vue">Vue</ComboboxItem>
      <ComboboxItem value="svelte">Svelte</ComboboxItem>
      <ComboboxItem value="angular" disabled>Angular (disabled)</ComboboxItem>
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;
}

export function comboboxContentSnippet(opts: ComboboxContentDemoProps): string {
  const { contentAppearance, contentSize } = opts;
  const appearanceAttr =
    contentAppearance === "default" ? "" : ` appearance="${contentAppearance}"`;
  const triggerVariantAttr =
    contentAppearance === "default" ? "" : ` variant="${contentAppearance}"`;
  const sizeAttr = contentSize === "md" ? "" : ` size="${contentSize}"`;
  return `${variantLeadComment(`ComboboxContent · appearance · ${contentAppearance}, size · ${contentSize}`)}<Combobox defaultValue={["typescript"]} multiple={false}>
  <ComboboxTrigger${triggerVariantAttr} size="sm">
    <ComboboxValue placeholder="Select language" />
  </ComboboxTrigger>
  <ComboboxContent${appearanceAttr}${sizeAttr}>
    <ComboboxSearch placeholder="Search..." />
    <ComboboxList>
      <ComboboxItem value="typescript">TypeScript</ComboboxItem>
      <ComboboxItem value="javascript">JavaScript</ComboboxItem>
      <ComboboxItem value="python">Python</ComboboxItem>
      <ComboboxEmpty>No language found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;
}

export function comboboxMultiSnippet(): string {
  return `${variantLeadComment("Combobox · multi-select, controlled value + onChange")}const [selected, setSelected] = useState<string[]>(["react", "vue"]);

<Combobox multiple value={selected} onChange={setSelected}>
  <ComboboxTrigger variant="sky" size="md">
    <ComboboxValue placeholder="Pick frameworks" />
  </ComboboxTrigger>
  <ComboboxContent appearance="sky">
    <ComboboxSearch placeholder="Search frameworks..." />
    <ComboboxList>
      <ComboboxItem value="react">React</ComboboxItem>
      <ComboboxItem value="vue">Vue</ComboboxItem>
      <ComboboxItem value="svelte">Svelte</ComboboxItem>
      <ComboboxItem value="solid">Solid</ComboboxItem>
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`;
}
