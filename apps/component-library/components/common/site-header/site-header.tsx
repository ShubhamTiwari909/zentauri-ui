"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiList, FiMenu, FiX } from "react-icons/fi";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/components/ui";
import type { SiteChromeNavItem } from "@/components/common/site-chrome-nav";
import { siteChromeNavItems } from "@/components/common/site-chrome-nav";
import { cn } from "@/lib/utils";

import type { SiteHeaderProps } from "./types";

const navLinkClassName =
  "text-sm font-medium text-slate-300 underline-offset-4 transition hover:text-cyan-100 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const drawerNavLinkClassName =
  "block rounded-md px-2 py-3 text-base font-medium text-slate-100 underline-offset-4 transition hover:bg-white/5 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60";

function SiteNavLink({
  item,
  className,
  onNavigate,
}: {
  item: SiteChromeNavItem;
  className: string;
  onNavigate?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function SiteHeader({
  className,
  showMenuToggle = false,
  isMenuOpen = false,
  onMenuToggle,
  menuControlsId,
}: SiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }
    const media = window.matchMedia("(min-width: 640px)");
    const closeIfWide = () => {
      if (media.matches) {
        setMobileNavOpen(false);
      }
    };
    closeIfWide();
    media.addEventListener("change", closeIfWide);
    return () => media.removeEventListener("change", closeIfWide);
  }, []);

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
            <div className="sm:hidden">
              <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                <DrawerTrigger
                  className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Open site navigation"
                >
                  <FiList className="h-6 w-6" aria-hidden />
                </DrawerTrigger>
                <DrawerContent side="right" appearance="glass" size="md">
                  <DrawerHeader className="pr-12">
                    <DrawerTitle className="text-slate-50">Navigate</DrawerTitle>
                    <DrawerClose>
                      <FiX className="h-5 w-5" aria-hidden />
                    </DrawerClose>
                  </DrawerHeader>
                  <DrawerBody>
                    <nav aria-label="Mobile main" className="flex flex-col gap-1">
                      {siteChromeNavItems.map((item) => (
                        <SiteNavLink
                          key={item.href}
                          item={item}
                          className={drawerNavLinkClassName}
                          onNavigate={() => setMobileNavOpen(false)}
                        />
                      ))}
                    </nav>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
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
            <SiteNavLink key={item.href} item={item} className={navLinkClassName} />
          ))}
        </nav>
      </div>
    </header>
  );
}

SiteHeader.displayName = "SiteHeader";
