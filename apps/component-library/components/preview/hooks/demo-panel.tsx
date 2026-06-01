import type { ReactNode } from "react";

const panelClassName =
  "rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-slate-200";

type HookDemoPanelProps = {
  title?: string;
  children: ReactNode;
};

export function HookDemoPanel({ title, children }: HookDemoPanelProps) {
  return (
    <div className={panelClassName}>
      {title ? (
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-400">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  );
}
