import { useId, type ReactNode } from "react";

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
  const titleId = useId();
  return (
    <section
      id={id}
      className="relative scroll-mt-24 space-y-8 py-2"
      aria-labelledby={titleId}
    >
      <header className="grid gap-4 border-l border-cyan-300/30 pl-5 md:grid-cols-[0.72fr_1fr] md:items-end md:gap-10">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
            {eyebrow}
          </p>
          <h2
            id={titleId}
            className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7 md:justify-self-end">
          {lead}
        </p>
      </header>
      {children}
    </section>
  );
}
