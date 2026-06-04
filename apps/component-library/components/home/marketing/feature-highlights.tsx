import {
  FiBox,
  FiCpu,
  FiLayers,
  FiPackage,
  FiZap,
  FiGrid,
} from "react-icons/fi";

import { SectionShell } from "./section-shell";

const FEATURES = [
  {
    icon: FiBox,
    title: "Composable primitives",
    body: "Build layouts from small pieces with predictable props and clear defaults.",
  },
  {
    icon: FiLayers,
    title: "Many appearances",
    body: "Glass, solid, outline, and gradient families across buttons, inputs, and overlays.",
  },
  {
    icon: FiZap,
    title: "Motion where it helps",
    body: "Optional animated entry points for modals, tabs, and toasts powered by Framer Motion.",
  },
  {
    icon: FiCpu,
    title: "Hooks you will use",
    body: "Headless utilities for storage, debouncing, media queries, and focus management.",
  },
  {
    icon: FiPackage,
    title: "Path-level imports",
    body: "Import only what you need from `@zentauri-ui/zentauri-components/ui/...` bundles.",
  },
  {
    icon: FiGrid,
    title: "TypeScript-first",
    body: "Typed APIs and variant props so refactors stay safe as your design system grows.",
  },
] as const;

export function HomeFeatureHighlights() {
  return (
    <SectionShell
      eyebrow="Why this library"
      title="Built for product engineers"
      lead="Opinionated visuals with escape hatches—fast to scan, fast to ship."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="group flex min-h-44 flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/25 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-slate-900/80"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-200 ring-1 ring-white/10 transition group-hover:bg-cyan-400/15 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="text-sm leading-6 text-slate-400">{body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
