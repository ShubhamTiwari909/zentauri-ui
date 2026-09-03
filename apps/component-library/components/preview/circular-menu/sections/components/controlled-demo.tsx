"use client";

import { useState } from "react";

import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";

import { buildCircularMenuItems } from "./demo";

const CONTROLLED_ITEMS = buildCircularMenuItems(5);

/** Drives `open` from outside and keeps the ring open after a selection. */
export function CircularMenuControlledDemo() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 py-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20"
        >
          {open ? "Close from outside" : "Open from outside"}
        </button>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Last action: {lastAction ?? "none"}
        </span>
      </div>
      <CircularMenu
        appearance="emerald"
        open={open}
        onOpenChange={setOpen}
        closeOnSelect={false}
        label="Actions"
        items={CONTROLLED_ITEMS}
        onSelect={(item) => setLastAction(item.id)}
      />
    </div>
  );
}
