import { Section } from "@/components/common/Section";
import { SpeechSynthesizerPlayground } from "./components/playground";

export function SpeechSynthesizerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Speech synthesizer variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance and size to preview the speech synthesizer component
        live. Toggle Show output / Show code and the snippet updates to match
        the selected variant.
      </p>
      <SpeechSynthesizerPlayground />
    </Section>
  );
}
