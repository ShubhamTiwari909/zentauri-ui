"use client";

import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";

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
    <div className="flex min-h-screen flex-col lg:flex-row text-slate-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-md lg:hidden">
        <Link href="/" className="font-semibold text-white tracking-wide">
          Zentauri UI
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/10 bg-slate-950 px-6 py-8 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:overflow-y-auto ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Overlay for mobile when sidebar is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {children}
      </div>
    </div>
  );
}
