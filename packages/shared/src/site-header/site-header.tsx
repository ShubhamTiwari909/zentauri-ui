"use client";

import { Fragment } from "react";
import Link from "next/link";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui/dropdown";

import { cn } from "../lib/cn";
import { getSiteChromeNavItems, getSiteHeaderBrand } from "./navigation";
import { SiteHeaderMobile } from "./site-header-mobile";
import { SiteNavLink } from "./site-link";

import type { SiteHeaderProps } from "./types";

const iconButtonClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-0 text-slate-400 shadow-sm shadow-slate-950/20 transition hover:border-cyan-400/20 hover:bg-white/[0.07] hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const navLinkClassName =
  "rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const catalogNavLabels = ["Components", "Animations", "Charts", "Typography"];

function isCatalogNavItem(label: string) {
  return catalogNavLabels.includes(label);
}

function SiteHeaderCatalogDropdown({
  items,
}: {
  items: readonly ReturnType<typeof getSiteChromeNavItems>[number][];
}) {
  return (
    <Dropdown>
      <DropdownTrigger
        className={cn(navLinkClassName, "inline-flex items-center gap-1.5")}
        size="sm"
        variant="ghost"
      >
        UI
        <FiChevronDown className="h-3.5 w-3.5" aria-hidden />
      </DropdownTrigger>
      <DropdownContent
        className="z-50 min-w-44 rounded-xl border border-white/10 bg-slate-950/95 p-1.5 text-slate-200 shadow-2xl shadow-slate-950/50 backdrop-blur-xl"
        placement="bottom"
      >
        {items.map((catalogItem) => (
          <SiteNavLink
            key={catalogItem.href}
            item={catalogItem}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/6 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/45"
          />
        ))}
      </DropdownContent>
    </Dropdown>
  );
}

export function SiteHeader({
  className,
  site,
  SearchOpenButton,
  showMenuToggle = false,
  isMenuOpen = false,
  onMenuToggle,
  menuControlsId,
}: SiteHeaderProps) {
  const navItems = getSiteChromeNavItems(site);
  const primaryNavItems = navItems.filter(
    (item) => !isCatalogNavItem(item.label),
  );
  const catalogNavItems = catalogNavLabels
    .map((label) => navItems.find((item) => item.label === label))
    .filter((item): item is (typeof navItems)[number] => Boolean(item));
  const brand = getSiteHeaderBrand(site);

  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-50 border-b border-white/8 bg-slate-950/70 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-xl backdrop-saturate-150",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:gap-6 sm:px-8 sm:py-4 lg:px-10">
        <Link
          href={brand.href}
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
              {brand.subtitle}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 sm:flex"
        >
          {primaryNavItems.map((item) => {
            if (item.label === "Hooks" && catalogNavItems.length > 0) {
              return (
                <Fragment key={item.href}>
                  <SiteHeaderCatalogDropdown items={catalogNavItems} />
                  <SiteNavLink item={item} className={navLinkClassName} />
                </Fragment>
              );
            }

            return (
              <SiteNavLink
                key={item.href}
                item={item}
                className={navLinkClassName}
              />
            );
          })}
          {primaryNavItems.every((item) => item.label !== "Hooks") &&
          catalogNavItems.length > 0 ? (
            <SiteHeaderCatalogDropdown items={catalogNavItems} />
          ) : null}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:ml-0">
          <SearchOpenButton className={iconButtonClassName} />
          <div className="sm:hidden">
            <SiteHeaderMobile navItems={navItems} />
          </div>
          {showMenuToggle ? (
            <button
              type="button"
              onClick={onMenuToggle}
              className={cn(iconButtonClassName, "lg:hidden")}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              {...(menuControlsId ? { "aria-controls": menuControlsId } : {})}
            >
              {isMenuOpen ? (
                <FiX className="h-5 w-5" aria-hidden />
              ) : (
                <FiMenu className="h-5 w-5" aria-hidden />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

SiteHeader.displayName = "SiteHeader";
