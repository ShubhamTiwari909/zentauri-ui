"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui/drawer";
import { FiList, FiX } from "react-icons/fi";

import type { SiteChromeNavItem } from "./navigation";
import { SiteNavLink } from "./site-link";

const drawerNavLinkClassName =
  "block rounded-md px-2 py-3 text-base font-medium underline-offset-4 transition hover:bg-white/5 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60";

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

  return (
    <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <DrawerTrigger
        appearance="default"
        className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Open site navigation"
        onClick={() => {}}
        ref={null}
      >
        <FiList className="h-6 w-6" aria-hidden />
      </DrawerTrigger>
      <DrawerContent
        className="bg-slate-950 backdrop-blur-xl"
        side="right"
        appearance="default"
        size="md"
        id={undefined}
        ref={null}
        style={undefined}
      >
        <DrawerHeader className="pr-12">
          <DrawerTitle className="text-white">Navigate</DrawerTitle>
          <DrawerClose className="text-white">
            <FiX className="h-5 w-5" aria-hidden />
          </DrawerClose>
        </DrawerHeader>
        <DrawerBody className="text-white">
          <nav aria-label="Mobile main" className="flex flex-col gap-1">
            {navItems.map((item) => (
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
  );
}
