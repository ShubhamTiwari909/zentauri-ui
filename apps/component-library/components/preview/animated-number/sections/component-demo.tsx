import { Section } from "@/components/common/Section";
import {
  AnimatedNumber,
  AnimatedNumberCounter,
} from "@zentauri-ui/zentauri-components/ui/animated-number";

export function AnimatedNumberExamplesSection() {
  return (
    <Section variant="plain" className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Dashboard stats</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            Active users
          </p>
          <AnimatedNumberCounter
            number={48210}
            appearance="info"
            size="lg"
            duration={2}
          />
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            Revenue
          </p>
          <AnimatedNumber
            number={92750}
            appearance="success"
            size="lg"
            type="up"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            delayInSecond={0.12}
          />
        </div>
        <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5">
          <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
            Open issues
          </p>
          <AnimatedNumber
            number={128}
            appearance="gradient-purple"
            size="lg"
            type="scaleUp"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            delayInSecond={0.12}
          />
        </div>
      </div>
    </Section>
  );
}
