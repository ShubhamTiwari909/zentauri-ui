"use client";

import { Kbd } from "@zentauri-ui/zentauri-components/ui/kbd";

import type { KbdDemoProps } from "./types";

export function KbdDemo({ appearance, size }: KbdDemoProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Kbd appearance={appearance} size={size}>
        Esc
      </Kbd>
      <Kbd appearance={appearance} size={size} keys={["⌘", "K"]} separator="+" />
      <Kbd
        appearance={appearance}
        size={size}
        keys={["Ctrl", "Shift", "P"]}
        separator="+"
      />
    </div>
  );
}
