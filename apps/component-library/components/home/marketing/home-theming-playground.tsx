"use client";

import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";

const APPEARANCES = [
  "default",
  "sky",
  "emerald",
  "outline",
  "glass",
] as const;

export function HomeThemingPlayground() {
  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Theming"
        title="Variants and surfaces"
        lead="Compose with appearance props, then align tokens in Tailwind v4—override `@theme` or map appearances in your app layer."
      >
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Button appearances
            </p>
            <div className="flex flex-wrap gap-2">
              {APPEARANCES.map((appearance) => (
                <Button
                  key={appearance}
                  className="capitalize"
                  appearance={appearance}
                  size="sm"
                  type="button"
                >
                  {appearance}
                </Button>
              ))}
            </div>
          </div>
          
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
