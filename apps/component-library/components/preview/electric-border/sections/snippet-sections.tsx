import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { examples } from "../components/electric-border-code-examples.data";
import { electricBorderSnippet } from "../components/electric-border-code-examples.snippets";
import { ElectricBorderDemo } from "../components/electric-border-demo";

export function ElectricBorderExamples() {
  return (
    <Section variant="plain" className="space-y-10">
      <h2 className="text-3xl font-semibold text-white">
        Make room for your content.
      </h2>
      {examples.map(({ label, props }) => (
        <div key={label}>
          <p className="mb-4 text-lg font-semibold text-white">{label}</p>
          <div className="rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
            <PreviewCodeShowcase code={electricBorderSnippet(props)}>
              <div className="flex justify-center px-5 py-12 sm:px-10">
                <ElectricBorderDemo {...props} />
              </div>
            </PreviewCodeShowcase>
          </div>
        </div>
      ))}
    </Section>
  );
}
