import { Section } from "@/components/common/Section";
import { ConsoleViewerPlayground } from "../components/playground";

export function ConsoleViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Console viewer playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a session, chrome appearance, and size to preview the console
        viewer live. Toggle toolbar controls, switch on a motion preset, and use
        Show output / Show code to copy the matching snippet.
      </p>
      <ConsoleViewerPlayground />
    </Section>
  );
}
