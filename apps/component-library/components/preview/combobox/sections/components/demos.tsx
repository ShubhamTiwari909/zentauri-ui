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

import { DEMO_FRAMEWORKS, DEMO_LANGUAGES } from "./data";
import type {
  ComboboxContentDemoProps,
  ComboboxTriggerDemoProps,
} from "./types";

export function ComboboxTriggerDemo({
  triggerVariant,
  triggerSize,
}: ComboboxTriggerDemoProps) {
  return (
    <div className="max-w-md">
      <Combobox defaultValue={["react"]} multiple={false}>
        <ComboboxTrigger variant={triggerVariant} size={triggerSize}>
          <ComboboxValue placeholder="Select framework" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxSearch placeholder="Search..." />
          <ComboboxList>
            {DEMO_FRAMEWORKS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
            <ComboboxItem value="angular" disabled>
              Angular (disabled)
            </ComboboxItem>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxContentDemo({
  contentAppearance,
  contentSize,
}: ComboboxContentDemoProps) {
  return (
    <div className="max-w-md">
      <p className="mb-5 text-sm text-slate-800 dark:text-white">
        ComboboxContent · Appearance ·{" "}
        <span className="font-bold">{contentAppearance}</span>, Size ·{" "}
        <span className="font-bold">{contentSize}</span>
      </p>
      <Combobox defaultValue={["typescript"]} multiple={false}>
        <ComboboxTrigger variant="ghost" size="sm">
          <ComboboxValue placeholder="Select language" />
        </ComboboxTrigger>
        <ComboboxContent appearance={contentAppearance} size={contentSize}>
          <ComboboxSearch placeholder="Search..." />
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
    </div>
  );
}

export function ComboboxMultiDemo() {
  return (
    <div className="max-w-md">
      <p className="mb-5 text-sm text-slate-800 dark:text-white">
        Combobox · multi-select, sky appearance
      </p>
      <Combobox multiple defaultValue={["react", "vue"]}>
        <ComboboxTrigger variant="sky" size="md">
          <ComboboxValue placeholder="Pick frameworks" />
        </ComboboxTrigger>
        <ComboboxContent appearance="sky">
          <ComboboxSearch placeholder="Search frameworks..." />
          <ComboboxList>
            {DEMO_FRAMEWORKS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
