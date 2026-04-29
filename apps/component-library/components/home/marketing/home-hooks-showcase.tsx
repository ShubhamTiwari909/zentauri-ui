"use client";

import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import { HOOK_PREVIEW_REGISTRY } from "@/lib/constants";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";
import { Card } from "@zentauri-ui/zentauri-components/ui/card";

const HOME_HOOK_SLUGS = [
  "use-local-storage",
  "use-debounced-value",
  "use-click-outside",
  "use-media-query",
] as const;

export function HomeHooksShowcase() {
  const hooks = HOME_HOOK_SLUGS.map((slug) =>
    HOOK_PREVIEW_REGISTRY.find((h) => h.slug === slug),
  ).filter((h): h is (typeof HOOK_PREVIEW_REGISTRY)[number] => h !== undefined);

  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Headless hooks"
        title="Utilities that match the kit"
        lead="Typed helpers for storage, timing, gestures, and layout—each with an interactive preview route."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {hooks.map((hook) => (
            <Card
              key={hook.slug}
              className="flex flex-col gap-3 p-5 max-w-full"
              appearance="sky"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-mono text-sm font-semibold text-cyan-100">
                  {hook.name}
                </h3>
                <Link
                  href={`/preview/hooks/${hook.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-cyan-200"
                >
                  Preview
                  <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
              <p className="text-sm leading-6 text-slate-400">{hook.description}</p>
              <p className="text-xs leading-5 text-slate-500">
                <span className="font-medium text-slate-400">Use case: </span>
                {hook.intro}
              </p>
            </Card>
          ))}
        </div>
        <p className="text-center text-sm">
          <Link
            href="/preview/hooks"
            className="font-medium text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline"
          >
            Browse all hooks
          </Link>
        </p>
      </SectionShell>
    </MotionReveal>
  );
}
