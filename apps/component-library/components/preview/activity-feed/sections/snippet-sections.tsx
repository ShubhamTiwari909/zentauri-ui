import { Section } from "@/components/common/Section";

import { ActivityFeedPlayground } from "./components/playground";

export function ActivityFeedCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Activity feed playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Feed events are structured as actor, verb, and object data. Consecutive
        matching events collapse into a compact group by default; switch
        grouping off to inspect every event individually.
      </p>
      <ActivityFeedPlayground />
    </Section>
  );
}
