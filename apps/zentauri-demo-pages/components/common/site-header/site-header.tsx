import Link from "next/link";

import { siteChromeNavItems } from "../site-chrome-nav";
import { SiteSearchOpenButton } from "../site-search/site-search-open-button";
import { SiteNavLink } from "./site-link";

const navLinkClassName =
  "rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const actionClassName =
  "inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-slate-300 shadow-sm shadow-slate-950/20 transition hover:border-cyan-400/20 hover:bg-white/[0.07] hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-slate-950/70 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 rounded-xl py-1 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-cyan-500/15 to-sky-600/10 ring-1 ring-white/10 transition group-hover:from-cyan-400/25 group-hover:ring-cyan-400/25"
            aria-hidden
          >
            <span className="text-sm font-bold tracking-tight text-cyan-100">
              Z
            </span>
          </span>
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-[0.9375rem] font-semibold leading-none tracking-tight text-white transition group-hover:text-cyan-50 sm:text-base">
              Zentauri UI
            </span>
            <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-slate-500 sm:block">
              Demos
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex"
        >
          {siteChromeNavItems.map((item) => (
            <SiteNavLink
              key={item.href}
              item={item}
              className={navLinkClassName}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <SiteSearchOpenButton className={actionClassName} />
          <details className="group relative lg:hidden">
            <summary className={`${actionClassName} list-none cursor-pointer`}>
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-64 rounded-xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-black/40">
              <nav aria-label="Mobile main" className="flex flex-col gap-1">
                {siteChromeNavItems.map((item) => (
                  <SiteNavLink
                    key={item.href}
                    item={item}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                  />
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
