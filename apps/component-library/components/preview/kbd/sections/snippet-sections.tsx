import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { KbdAnimated } from "@zentauri-ui/zentauri-components/ui/kbd/animated";

import { KbdPlayground } from "./components/playground";
import { kbdAnimatedSnippet } from "./components/snippets";

export function KbdCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Kbd variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance and size to preview the kbd live. Toggle Show output
        / Show code and the snippet updates to match the selected variant.
      </p>
      <KbdPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase key="animated" code={kbdAnimatedSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Motion: <span className="font-bold">ANIMATED KEY PRESS</span>
          </p>
          <KbdAnimated
            animation="press"
            appearance="indigo"
            keys={["⌘", "K"]}
            separator="+"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
