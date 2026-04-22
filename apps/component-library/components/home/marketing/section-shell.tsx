import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
}: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-8">
      <header className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          {lead}
        </p>
      </header>
      {children}
    </section>
  );
}
