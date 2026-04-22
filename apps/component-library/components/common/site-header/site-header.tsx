import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

import { siteChromeNavItems } from "@/components/common/site-chrome-nav";
import { SiteSearchOpenButton } from "@/components/common/site-search/site-search-open-button";
import { cn } from "@/lib/utils";
import SiteNavLink from "./site-link";

import type { SiteHeaderProps } from "./types";
import SiteHeaderMobile from "./site-header-mobile";

const navLinkClassName =
  "text-sm font-medium text-slate-300 underline-offset-4 transition hover:text-cyan-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export function SiteHeader({
  className,
  showMenuToggle = false,
  isMenuOpen = false,
  onMenuToggle,
  menuControlsId,
}: SiteHeaderProps) {
  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <Link
            href="/"
            className="text-base font-semibold tracking-wide text-white underline-offset-4 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-lg"
          >
            Zentauri UI
          </Link>
          <div className="flex items-center gap-2">
            <SiteSearchOpenButton />
            <div className="sm:hidden">
              <SiteHeaderMobile />
            </div>
            {showMenuToggle ? (
              <button
                type="button"
                onClick={onMenuToggle}
                className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                {...(menuControlsId ? { "aria-controls": menuControlsId } : {})}
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" aria-hidden />
                ) : (
                  <FiMenu className="h-6 w-6" aria-hidden />
                )}
              </button>
            ) : null}
          </div>
        </div>
        <nav
          aria-label="Main"
          className="hidden flex-wrap items-center gap-x-10 gap-y-2 sm:flex"
        >
          {siteChromeNavItems.map((item) => (
            <SiteNavLink
              key={item.href}
              item={item}
              className={navLinkClassName}
            />
          ))}
        </nav>
      </div>
    </header>
  );
}

SiteHeader.displayName = "SiteHeader";
