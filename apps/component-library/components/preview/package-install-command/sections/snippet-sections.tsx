import { Section } from "@/components/common/Section";
import { PackageInstallCommandPlayground } from "./components/playground";

export function PackageInstallCommandCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Package install command playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a command, appearance, and size to preview the install command
        component live. Toggle tabs to switch between package managers, show or
        hide the copy button, and use Show output / Show code to copy the
        matching snippet.
      </p>
      <PackageInstallCommandPlayground />
    </Section>
  );
}
