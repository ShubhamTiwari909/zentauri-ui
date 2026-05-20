import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export const PREVIEW_SECTION_CLASS =
  "rounded-3xl border border-slate-900/10 bg-slate-100 p-6 shadow-xl shadow-slate-950/40 dark:border-white/10 dark:bg-slate-950/60";

export const PREVIEW_HERO_SECTION_CLASS =
  "grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end";

export const PREVIEW_SECTION_CARD_CLASS =
  "rounded-3xl border border-slate-900/10 bg-white p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl dark:border-white/10 dark:bg-white/5";

export type SectionVariant = "panel" | "hero" | "plain";

const sectionVariants: Record<SectionVariant, string> = {
  panel: PREVIEW_SECTION_CLASS,
  hero: PREVIEW_HERO_SECTION_CLASS,
  plain: "",
};

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  variant?: SectionVariant;
};

export function Section({
  variant = "panel",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants[variant], className)} {...props}>
      {children}
    </section>
  );
}

export type SectionCardVariant = "elevated" | "panel";

const sectionCardVariants: Record<SectionCardVariant, string> = {
  elevated: PREVIEW_SECTION_CARD_CLASS,
  panel: PREVIEW_SECTION_CLASS,
};

export type SectionCardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: SectionCardVariant;
};

export function SectionCard({
  variant = "elevated",
  className,
  children,
  ...props
}: SectionCardProps) {
  return (
    <div className={cn(sectionCardVariants[variant], className)} {...props}>
      {children}
    </div>
  );
}

export default Section;
