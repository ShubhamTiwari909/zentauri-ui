"use client";
import {
  ZuiGlassCard,
  type GlassCardProps,
} from "@zentauri-ui/zentauri-components/ui/glass-card";

export function GlassCardDemo(props: GlassCardProps) {
  return (
    <ZuiGlassCard
      {...props}
      className={`w-full max-w-sm ${props.className ?? ""}`}
    >
      <ZuiGlassCard.Content className="flex min-h-64 flex-col justify-between gap-8">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em]">
          <span>Zentauri / Studio</span>
          <span aria-hidden="true">✧</span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">
            A different dimension.
          </h3>
          <p className="mt-2 text-sm leading-6 opacity-80">
            Light, depth, and your content. A little perspective changes
            everything.
          </p>
        </div>
        <a
          href="#glass-card-details"
          className="w-fit rounded text-sm font-semibold underline decoration-current/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Explore the surface <span aria-hidden="true">↗</span>
        </a>
      </ZuiGlassCard.Content>
    </ZuiGlassCard>
  );
}
