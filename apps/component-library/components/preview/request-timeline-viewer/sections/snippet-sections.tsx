import { Section } from "@/components/common/Section";
import { RequestTimelineViewerPlayground } from "./components/playground";

export function RequestTimelineViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Request timeline playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a timing breakdown, chrome appearance, and size to preview the
        request timeline viewer live. Toggle the legend, switch on an enter
        motion preset, and use Show output / Show code to copy the matching
        snippet.
      </p>
      <RequestTimelineViewerPlayground />
    </Section>
  );
}
