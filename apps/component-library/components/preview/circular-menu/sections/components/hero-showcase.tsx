"use client";

import { CircularMenu } from "@zentauri-ui/zentauri-components/ui/circular-menu";
import { CircularMenu as CircularMenuAnimated } from "@zentauri-ui/zentauri-components/ui/circular-menu/animated";

import { buildCircularMenuItems } from "./demo";

const RING_ITEMS = buildCircularMenuItems(5);
const ARC_ITEMS = buildCircularMenuItems(3);
const ORBIT_ITEMS = buildCircularMenuItems(6);

/** Three compact rings: a full menu, an open arc, and a spinning orbit. */
export function CircularMenuHeroShowcase() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <CircularMenuAnimated
        appearance="primary"
        size="sm"
        radius={62}
        itemSize={26}
        label="Menu"
        items={RING_ITEMS}
      />
      <CircularMenu
        appearance="gradient-rose"
        size="sm"
        radius={62}
        itemSize={26}
        startAngle={-90}
        sweep={180}
        trigger="hover"
        label="Share"
        items={ARC_ITEMS}
      />
      <CircularMenu
        appearance="glass"
        size="sm"
        radius={62}
        itemSize={26}
        trigger="always"
        spin
        spinDuration={20}
        labelPlacement="none"
        label="Orbit"
        items={ORBIT_ITEMS}
      />
    </div>
  );
}
