"use client";

import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";

import { buildCircularMenuItems } from "./demo";

const ORBIT_ITEMS = buildCircularMenuItems(8);

/**
 * Always-open ring that rotates on its own. The static entry does this in pure
 * CSS, and stops entirely under `prefers-reduced-motion`.
 */
export function CircularMenuOrbitDemo() {
  return (
    <div className="flex min-h-[380px] items-center justify-center py-6">
      <CircularMenu
        appearance="violet"
        trigger="always"
        spin
        spinDuration={18}
        showSpokes
        itemRotation="upright"
        labelPlacement="none"
        label="Orbit"
        items={ORBIT_ITEMS}
      />
    </div>
  );
}
