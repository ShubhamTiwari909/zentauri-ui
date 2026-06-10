"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { variantLeadComment } from "@/components/common/variant-code-prefix";
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

import { DEMO_LANGUAGES } from "./data";

export default function ComboboxControlled() {
  const [selected, setSelected] = useState<string[]>(["typescript"]);

  return (
    <PreviewCodeShowcase
      code={`${variantLeadComment("Controlled · value + onChange, emerald trigger")}const [selected, setSelected] = useState<string[]>(["typescript"]);

<Combobox value={selected} onChange={setSelected} multiple={false}>
  <ComboboxTrigger variant="emerald" size="lg">
    <ComboboxValue placeholder="Select language" />
  </ComboboxTrigger>
  <ComboboxContent appearance="default" size="sm">
    <ComboboxSearch placeholder="Search languages..." />
    <ComboboxList>
      <ComboboxItem value="typescript">TypeScript</ComboboxItem>
      <ComboboxItem value="javascript">JavaScript</ComboboxItem>
      <ComboboxItem value="python">Python</ComboboxItem>
      <ComboboxItem value="rust">Rust</ComboboxItem>
      <ComboboxItem value="go">Go</ComboboxItem>
      <ComboboxItem value="java">Java</ComboboxItem>
      <ComboboxEmpty>No language found.</ComboboxEmpty>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
    >
      <Combobox value={selected} onChange={setSelected} multiple={false}>
        <ComboboxTrigger variant="emerald" size="lg">
          <ComboboxValue placeholder="Select language" />
        </ComboboxTrigger>
        <ComboboxContent appearance="default" size="sm">
          <ComboboxSearch placeholder="Search languages..." />
          <ComboboxList>
            {DEMO_LANGUAGES.map((l) => (
              <ComboboxItem key={l.value} value={l.value}>
                {l.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No language found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </PreviewCodeShowcase>
  );
}
