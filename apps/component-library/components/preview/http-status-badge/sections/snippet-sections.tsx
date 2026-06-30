import { Section } from "@/components/common/Section";
import { HttpStatusBadgePlayground } from "./components/playground";

export function HttpStatusBadgeCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        HTTP status badge playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a status code, fill style, and size to preview the badge live. The
        tone color is derived from the status class, toggle the reason phrase on
        or off, and use Show output / Show code to copy the matching snippet.
      </p>
      <HttpStatusBadgePlayground />
    </Section>
  );
}
