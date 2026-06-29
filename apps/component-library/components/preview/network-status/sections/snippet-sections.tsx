import { Section } from "@/components/common/Section";
import { NetworkStatusPlayground } from "./components/playground";

export function NetworkStatusCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Network status variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a connectivity state, appearance, and size to preview the network
        status indicator live. Toggle Show output / Show code and the snippet
        updates to match the selected variant. Leave the state on{" "}
        <code>auto</code> to track your real connection via{" "}
        <code>navigator.onLine</code>.
      </p>
      <NetworkStatusPlayground />
    </Section>
  );
}
