import { Section } from "@/components/common/Section";
import { NumberInputPlayground } from "./components/playground";

export function NumberInputCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Number Input playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Choose an appearance and size. Use Show output or Show code to inspect
        the selected variant.
      </p>
      <NumberInputPlayground />
    </Section>
  );
}
