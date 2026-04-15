"use client";

import { Button } from "@zentauri-ui/zentauri-components/ui";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@zentauri-ui/zentauri-components/ui";

export function DrawerHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Overlay
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Drawers for edge-attached workflows.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Slide-in panels from any side with the same focus and scroll-lock
            behavior as modals.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Drawer defaultOpen={false}>
          <DrawerTrigger className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
            Open drawer
          </DrawerTrigger>
          <DrawerContent side="right" animation="slide" appearance="glass" size="md">
            <DrawerClose />
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-slate-300">
                Refine the list by status, owner, or date range.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button appearance="sky" size="sm" animation="lift">
                Apply
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
