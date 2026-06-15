import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { ModalControlledDemo } from "./components/controlled";
import { ModalPlayground } from "./components/playground";
import { modalControlledSnippet } from "./components/snippets";

export function ModalCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Modal variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a size, position, appearance, and animation to preview the modal
        live. Toggle Show output / Show code and the snippet updates to match
        the selected variant.
      </p>
      <ModalPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <PreviewCodeShowcase code={modalControlledSnippet()}>
          <ModalControlledDemo />
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
