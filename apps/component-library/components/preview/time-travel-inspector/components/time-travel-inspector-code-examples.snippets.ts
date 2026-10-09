import type {
  InspectorAppearance,
  InspectorSize,
} from "./time-travel-inspector-code-examples.data";

export function timeTravelInspectorSnippet(
  appearance: InspectorAppearance,
  size: InspectorSize,
) {
  return `"use client";

import { useState } from "react";
import {
  TimeTravelInspector,
  createTimeTravelHistory,
  type TimeTravelRenderContext,
} from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";

type Cart = { total: number; quantity: number };
const snapshots = createTimeTravelHistory([
  { id: "opened", timestamp: 0, label: "Cart opened", state: { total: 0, quantity: 0 } },
  { id: "added", timestamp: 2400, label: "Bag added", state: { total: 80, quantity: 1 } },
  { id: "discount", timestamp: 8200, label: "SAVE20 applied", state: { total: 64, quantity: 1 } },
], 20); // One full checkpoint every 20 events; deltas between them.

export default function CheckoutReplay() {
  const [opened, setOpened] = useState<TimeTravelRenderContext | null>(null);
  return <>
    <TimeTravelInspector
      snapshots={snapshots}
      appearance="${appearance}"
      size="${size}"
      defaultBookmarks={["discount"]}
      formatTimestamp={(ms) => "+" + (ms / 1000).toFixed(1) + "s"}
      renderPreview={({ state }) => <p>Cart total: {(state as Cart).total}</p>}
      onOpenState={setOpened}
    />
    {opened && <p>Opened historical total: {(opened.state as Cart).total}</p>}
  </>;
}`;
}

export const incrementalHistorySnippet = `import type { TimeTravelSnapshot } from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";

// Capture compact records directly for long-running sessions.
const snapshots: TimeTravelSnapshot[] = [
  { id: "a", timestamp: 0, label: "Opened", kind: "checkpoint", state: { cart: { total: 0 } } },
  { id: "b", timestamp: 1000, label: "Added", kind: "delta", changes: [
    { op: "set", path: ["cart", "total"], value: 80 },
  ] },
  { id: "c", timestamp: 2000, label: "Discount", kind: "delta", changes: [
    { op: "set", path: ["cart", "total"], value: 64 },
  ] },
  // Add another full checkpoint periodically to bound seek cost.
];`;
