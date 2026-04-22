"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FiBox,
  FiCpu,
  FiLayers,
  FiPackage,
  FiZap,
  FiGrid,
} from "react-icons/fi";

import { MotionReveal } from "./motion-reveal";
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
  const reduceMotion = useReducedMotion();

  return (
    <MotionReveal>
      <SectionShell
        eyebrow="Why this library"
        title="Built for product engineers"
        lead="Opinionated visuals with escape hatches—fast to scan, fast to ship."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <motion.article
              key={title}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -3, scale: 1.01, transition: { duration: 0.2 } }
              }
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-lg shadow-slate-950/30 transition-colors hover:border-cyan-400/20"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-200 ring-1 ring-white/10">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="text-sm leading-6 text-slate-400">{body}</p>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </MotionReveal>
  );
}
