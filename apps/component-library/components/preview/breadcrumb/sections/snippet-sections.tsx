import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { BreadcrumbDemo } from "./components/demo";
import {
  BREADCRUMB_APPEARANCES,
  BREADCRUMB_SCENARIOS,
} from "./components/data";
import {
  breadcrumbSnippet,
  breadcrumbSnippetForAppearance,
} from "./components/snippets";

const scenarioLabel: Record<(typeof BREADCRUMB_SCENARIOS)[number], string> = {
  default: "Default slash separators",
  dots: "Dot separators",
  smallSeparator: "Small separator size",
};

export function BreadcrumbCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Breadcrumb code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the scenario.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {BREADCRUMB_SCENARIOS.map((scenario) => (
          <PreviewCodeShowcase
            key={scenario}
            code={breadcrumbSnippet(scenario)}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Scenario:{" "}
              <span className="font-bold">
                {scenarioLabel[scenario].toUpperCase()}
              </span>
            </p>
            <BreadcrumbDemo scenario={scenario} />
          </PreviewCodeShowcase>
        ))}
        {BREADCRUMB_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={breadcrumbSnippetForAppearance(appearance)}
          >
            <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
              Appearance:{" "}
              <span className="font-bold">{appearance.toUpperCase()}</span>
            </p>
            <BreadcrumbDemo scenario="default" appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
