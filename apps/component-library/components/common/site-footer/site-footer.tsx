import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteChromeNavItems } from "@/components/common/site-chrome-nav";

import type { SiteFooterProps } from "./types";

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="site-footer"
      className={cn(
        "border-t border-white/10 bg-slate-950/90 px-4 py-10 text-slate-400 backdrop-blur-md sm:px-6 lg:px-8",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-sm font-semibold tracking-wide text-slate-100">
            Zentauri UI
          </p>
          <p className="text-sm leading-relaxed text-slate-400">
            A component library playground built with React, Tailwind CSS, and
            Framer Motion.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-3 sm:items-end">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Explore
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end sm:gap-x-6 sm:gap-y-2">
            {siteChromeNavItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    className="text-sm text-cyan-200/90 underline-offset-4 transition hover:text-cyan-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm text-cyan-200/90 underline-offset-4 transition hover:text-cyan-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-slate-500 sm:text-left">
        © {year} Zentauri UI. All rights reserved.
      </div>
    </footer>
  );
}

SiteFooter.displayName = "SiteFooter";
