import { Section } from "@/components/common/Section";

import { DropdownPlayground } from "./components/playground";

export function DropdownCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Dropdown variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a trigger variant, size, content placement, spacing, and divider to
        preview the dropdown live. Toggle Show output / Show code and the
        snippet updates to match the selected variant.
      </p>
      <DropdownPlayground />
    </Section>
  );
}
