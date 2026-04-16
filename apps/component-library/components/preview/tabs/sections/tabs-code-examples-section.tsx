import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { TabsDemo } from "./components/tabs-code-examples-demo";
import {
  TABS_CODE_EXAMPLES_SECTION_CLASS,
  TABS_LIST_APPEARANCES,
  TABS_LIST_SIZES,
  TABS_LIST_VARIANTS,
} from "./components/tabs-code-examples.data";
import { tabsSnippet } from "./components/tabs-code-examples.snippets";

export function TabsCodeExamplesSection() {
  return (
    <section className={TABS_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Tabs variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        List chrome and density come from{" "}
        <code className="text-xs text-cyan-200">tabsListVariants</code> and{" "}
        <code className="text-xs text-cyan-200">tabsTriggerVariants</code>; panel motion is set
        per <code className="text-xs text-cyan-200">TabsContent</code>. Each snippet starts with
        Variant: for the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TABS_LIST_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`var-${variant}`}
            code={tabsSnippet({ variant, size: "md", appearance: "default" })}
          >
            <TabsDemo variant={variant} size="md" appearance="default" />
          </PreviewCodeShowcase>
        ))}
        {TABS_LIST_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={tabsSnippet({ variant: "pills", size, appearance: "default" })}
          >
            <TabsDemo variant="pills" size={size} appearance="default" />
          </PreviewCodeShowcase>
        ))}
        {TABS_LIST_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`appearance-${appearance}`}
            code={tabsSnippet({ variant: "pills", size: "md", appearance })}
          >
            <TabsDemo variant="pills" size="md" appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
