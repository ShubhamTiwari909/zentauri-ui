import { Section } from "@/components/common/Section";
import { HttpRequestViewerPlayground } from "./components/playground";

export function HttpRequestViewerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        HTTP request viewer playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a request, chrome appearance, and size to preview the HTTP request
        viewer live. Switch between the Headers, Query, and Body tabs, turn on a
        motion preset for the panel transition, and use Show output / Show code
        to copy the matching snippet.
      </p>
      <HttpRequestViewerPlayground />
    </Section>
  );
}
