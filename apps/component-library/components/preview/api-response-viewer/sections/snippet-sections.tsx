import { Section } from "@/components/common/Section";
import { ApiResponseViewerPlayground } from "./components/playground";

export function ApiResponseViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        API response viewer playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a response, chrome appearance, and size to preview the viewer live.
        Switch between the Body and Headers tabs, turn on a motion preset for
        the tab transition, and use Show output / Show code to copy the matching
        snippet.
      </p>
      <ApiResponseViewerPlayground />
    </Section>
  );
}
