import { Section } from "@/components/common/Section";
import { TerminalEmulatorPlayground } from "./components/playground";

export function TerminalEmulatorCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Terminal emulator playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Pick a session, chrome appearance, and size to preview the terminal
        emulator live. Toggle the window header to expose the traffic-light
        dots, title, and copy control, switch on a motion preset, and use Show
        output / Show code to copy the matching snippet.
      </p>
      <TerminalEmulatorPlayground />
    </Section>
  );
}
