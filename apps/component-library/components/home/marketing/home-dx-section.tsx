"use client";

import Link from "next/link";
import {
  FiCode,
  FiLayers,
  FiTerminal,
  FiCpu,
  FiPackage,
  FiExternalLink,
} from "react-icons/fi";

import { CLI_INIT_COMMANDS } from "@/lib/home-install-commands";

import { MotionReveal } from "./motion-reveal";
import { SectionShell } from "./section-shell";

const DX_ITEMS = [
  {
    icon: FiLayers,
    title: "Next.js App Router friendly",
    body: "Docs and previews follow patterns that drop into `app/` routes without extra wrappers.",
    href: "/preview/installation",
  },
  {
    icon: FiCode,
    title: "Typed variant APIs",
    body: "CVA-backed appearances and sizes stay consistent across components.",
    href: "/preview/components/buttons",
  },
  {
    icon: FiPackage,
    title: "Modular import paths",
    body: "Import from `@zentauri-ui/zentauri-components/ui/<family>` to keep bundles lean.",
    href: "/preview/components",
  },
  {
    icon: FiTerminal,
    title: "CLI init & add",
    body: `Bootstrap or extend a project with ${CLI_INIT_COMMANDS.pnpm} and scoped adds.`,
    href: "/preview/installation",
  },
  {
    icon: FiCpu,
    title: "Hooks alongside UI",
    body: "Use the same package for primitives and browser utilities with matching docs.",
    href: "/preview/hooks",
  },
] as const;

export function HomeDxSection() {
  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Developer experience"
        title="DX that stays out of your way"
        lead="Familiar tooling, predictable exports, and previews that mirror what you import in production."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {DX_ITEMS.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5 transition hover:border-cyan-400/25 hover:bg-slate-950/80"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-cyan-200 ring-1 ring-white/10 transition group-hover:bg-cyan-500/10">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 space-y-1">
                <span className="flex items-center gap-2 text-base font-semibold text-white">
                  {title}
                  <FiExternalLink
                    className="h-3.5 w-3.5 shrink-0 text-slate-500 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  />
                </span>
                <p className="text-sm leading-6 text-slate-400">{body}</p>
              </span>
            </Link>
          ))}
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
