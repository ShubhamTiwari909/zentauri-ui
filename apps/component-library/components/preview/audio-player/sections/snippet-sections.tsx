import { Section } from "@/components/common/Section";

import { AudioPlayerPlayground } from "./components/playground";

export function AudioPlayerCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Audio Player variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick an appearance, size, and shape to preview the player live. Toggle
        Show output / Show code and the snippet updates to match the selected
        variant. The demo loads a real audio stream — hit Play to hear it.
      </p>
      <AudioPlayerPlayground />
    </Section>
  );
}
