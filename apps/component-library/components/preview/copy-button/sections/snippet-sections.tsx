import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { CopyButtonAnimated } from "@zentauri-ui/zentauri-components/ui/copy-button/animated";

import { CopyButtonPlayground } from "./components/playground";
import { copyButtonAnimatedSnippet } from "./components/snippets";

export function CopyButtonCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Copy Button variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and icon-only mode to preview the copy button
        live. Toggle Show output / Show code and the snippet updates to match
        the selected variant.
      </p>
      <CopyButtonPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase key="animated" code={copyButtonAnimatedSnippet()}>
          <p className="mb-5 text-xs font-semibold text-slate-900 dark:text-white md:text-sm">
            Motion: <span className="font-bold">ANIMATED ICON SWAP</span>
          </p>
          <CopyButtonAnimated
            animation="swap"
            appearance="indigo"
            value="zentauri-ui"
          />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
