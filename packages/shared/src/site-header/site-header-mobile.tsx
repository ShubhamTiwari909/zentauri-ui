"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContentAnimated,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer/animated";
import { FiList, FiX } from "react-icons/fi";

import type { SiteChromeNavItem } from "./navigation";
import { SiteNavLink } from "./site-link";

const sectionLabels: Record<"build" | "catalog" | "more", readonly string[]> =
  {
    build: ["Installation", "Components", "Hooks"],
    catalog: ["Animations", "Typography", "Charts", "Design tokens"],
    more: ["Contact", "Demos", "GitHub"],
  };

const drawerNavLinkClassName =
  "group flex items-center justify-between rounded-lg border border-white/0 bg-white/[0.02] px-3.5 py-3 text-base font-medium text-slate-200 underline-offset-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-300/[0.07] hover:text-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60";

function mobileNavSections(navItems: readonly SiteChromeNavItem[]) {
  const used = new Set<string>();
  const groups = [
    {
      title: "Start",
      items: navItems.filter((item) => sectionLabels.build.includes(item.label)),
    },
    {
      title: "Library",
      items: navItems.filter((item) =>
        sectionLabels.catalog.includes(item.label),
      ),
    },
    {
      title: "More",
      items: navItems.filter((item) => sectionLabels.more.includes(item.label)),
    },
  ].map((group) => {
    group.items.forEach((item) => used.add(item.href));
    return group;
  });

  const uncategorized = navItems.filter((item) => !used.has(item.href));
  return uncategorized.length > 0
    ? [...groups, { title: "Other", items: uncategorized }]
    : groups;
}

export function SiteHeaderMobile({
  navItems,
}: {
  navItems: readonly SiteChromeNavItem[];
}) {
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

  const navSections = mobileNavSections(navItems).filter(
    (section) => section.items.length > 0,
  );

  return (
    <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <DrawerTrigger
        appearance="glass"
        className="h-10 w-10 items-center justify-center rounded-xl border-white/10 bg-white/[0.04] p-0 text-slate-300 shadow-sm shadow-slate-950/20 transition duration-200 hover:border-cyan-300/25 hover:bg-cyan-300/[0.08] hover:text-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        aria-label="Open site navigation"
        aria-expanded={mobileNavOpen}
      >
        <FiList className="h-6 w-6" aria-hidden />
      </DrawerTrigger>
      <DrawerContentAnimated
        animation="slide"
        className="overflow-hidden border-l border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.98),#020617)] p-0 text-white shadow-2xl shadow-slate-950/60 backdrop-blur-xl"
        side="right"
        appearance="glass"
        size="md"
      >
        <DrawerHeader className="mb-0 border-b border-white/10 px-5 py-5 pr-14">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10 ring-1 ring-cyan-300/25">
              <span className="text-sm font-bold tracking-tight text-cyan-100">
                Z
              </span>
            </span>
            <div>
              <DrawerTitle className="text-base font-semibold text-white">
                Navigate
              </DrawerTitle>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Zentauri UI
              </p>
            </div>
          </div>
          <DrawerClose className="right-5 top-5 rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white">
            <FiX className="h-5 w-5" aria-hidden />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody className="overflow-y-auto px-5 py-5 text-white">
          <nav aria-label="Mobile main" className="space-y-7">
            {navSections.map((section) => (
              <section key={section.title} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {section.title}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <SiteNavLink
                        item={item}
                        className={drawerNavLinkClassName}
                        onNavigate={() => setMobileNavOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </DrawerBody>
      </DrawerContentAnimated>
    </Drawer>
  );
}
