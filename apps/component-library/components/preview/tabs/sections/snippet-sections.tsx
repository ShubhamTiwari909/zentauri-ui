import { Section } from "@/components/common/Section";

import { TabsPlayground } from "./components/playground";

export function TabsCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Tabs variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Pick a list variant, size, and appearance to preview the tabs live.
        Toggle Show output / Show code and the snippet updates to match the
        selected variant. List chrome and density come from{" "}
        <code className="text-xs text-cyan-700 dark:text-cyan-200">
          tabsListVariants
        </code>{" "}
        and{" "}
        <code className="text-xs text-cyan-700 dark:text-cyan-200">
          tabsTriggerVariants
        </code>
        ; panel motion is set per{" "}
        <code className="text-xs text-cyan-700 dark:text-cyan-200">
          TabsContent
        </code>
        .
      </p>
      <TabsPlayground />
    </Section>
  );
}
