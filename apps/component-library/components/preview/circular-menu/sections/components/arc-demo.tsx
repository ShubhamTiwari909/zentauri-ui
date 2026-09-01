"use client";

import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

import { buildCircularMenuItems } from "./demo";

const ARC_ITEMS = buildCircularMenuItems(4);

/** Quarter-arc fan, the shape a floating action button usually needs. */
export function CircularMenuArcDemo() {
  return (
    <div className="flex min-h-[260px] items-end justify-center py-4">
      <CircularMenu
        appearance="gradient-blue"
        trigger="hover"
        radius={140}
        startAngle={-90}
        sweep={90}
        labelPlacement="outside"
        label="Share"
        items={ARC_ITEMS}
      />
    </div>
  );
}
