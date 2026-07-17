import { Section } from "@/components/common/Section";

import { DatePickerPlayground } from "./components/playground";

export function DatePickerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Date picker variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a mode, appearance, size, and animation to preview the date picker
        live — open the popover, select a date or range, and try the clear
        affordance. Toggle Show output / Show code and the snippet updates to
        match the selected variant.
      </p>
      <DatePickerPlayground />
    </Section>
  );
}
