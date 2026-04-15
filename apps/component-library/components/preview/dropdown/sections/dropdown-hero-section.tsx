"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@zentauri-ui/zentauri-components/ui";

const MENU_SURFACE_CLASS =
  "border border-white/10 bg-slate-900 text-slate-100 shadow-lg";

export function DropdownHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Navigation
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Dropdown menus with selection state.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Compound parts for trigger, surface, and items. Supports single or
            multi-select, placement options, and CVA-driven trigger and item
            styles.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Dropdown>
          <DropdownTrigger variant="outline" size="md">
            Open menu
          </DropdownTrigger>
          <DropdownContent className={MENU_SURFACE_CLASS}>
            <DropdownItem value="profile">Profile</DropdownItem>
            <DropdownItem value="settings">Settings</DropdownItem>
            <DropdownItem value="sign-out" variant="rose">
              Sign out
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </section>
  );
}
