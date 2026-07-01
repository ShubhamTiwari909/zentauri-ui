import { Section } from "@/components/common/Section";
import { ApiEndpointCardPlayground } from "./components/playground";

export function ApiEndpointCardCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        API endpoint card playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an HTTP method to preview the endpoint card live. Use Show output /
        Show code to copy the matching snippet.
      </p>
      <ApiEndpointCardPlayground />
    </Section>
  );
}
