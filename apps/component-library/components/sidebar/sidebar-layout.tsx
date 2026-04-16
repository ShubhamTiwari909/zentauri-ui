"use client";

import React, { useState, useEffect } from "react";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/common/site-header";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect viewport on page load and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col text-slate-50 lg:flex-row">
       <SiteHeader
          showMenuToggle
          isMenuOpen={isMobileMenuOpen}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          menuControlsId="sidebar-nav"
          className="lg:hidden"
        />

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        id="sidebar-nav"
        className={cn(
          "w-72 shrink-0 border-r border-white/10 bg-slate-950 px-6 py-8 pt-25 lg:pt-8",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:transform max-lg:transition-transform max-lg:duration-300 max-lg:ease-in-out",
          "lg:sticky lg:top-0 lg:self-start lg:h-screen lg:translate-x-0 lg:overflow-y-auto",
          isMobileMenuOpen
            ? "max-lg:translate-x-0 max-lg:visible"
            : "max-lg:-translate-x-full max-lg:invisible max-lg:pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col gap-8">
          <div className="hidden lg:block">
            <Link
              href="/"
              className="text-xl font-semibold tracking-wide text-white"
            >
              Zentauri UI
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            <SidebarNav onLinkClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full">
        {/* Overlay for mobile when sidebar is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {children}
      </main>
    </div>
  );
}
