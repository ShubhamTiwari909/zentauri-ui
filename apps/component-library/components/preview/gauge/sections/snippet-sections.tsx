import { Section } from "@/components/common/Section";

import { GaugePlayground } from "./components/playground";

export function GaugeCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Gauge variants playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Tune the value, appearance, size, thickness, and arc style. Use radial
        for a complete progress ring or dial for an open 270-degree meter.
      </p>
      <GaugePlayground />
    </Section>
  );
}
