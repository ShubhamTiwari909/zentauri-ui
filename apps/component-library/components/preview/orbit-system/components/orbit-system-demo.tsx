"use client";

import { useEffect, useState } from "react";
import {
  ZuiOrbit,
  ZuiOrbitItem,
  ZuiOrbitSystem,
} from "@zentauri-ui/zentauri-components/ui/orbit-system";
import type { OrbitSystemProps } from "@zentauri-ui/zentauri-components/ui/orbit-system";

export function OrbitSystemDemo(
  props: Pick<
    OrbitSystemProps,
    "appearance" | "size" | "autoRotate" | "interactive"
  >,
) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <ZuiOrbitSystem
      {...props}
      center={
        <span className="tracking-[0.18em]">
          {compact ? "✦" : "YOUR STACK"}
        </span>
      }
      aria-label="Interactive technology orbits"
    >
      <ZuiOrbit radius={95} duration={18} label="Core technologies">
        <ZuiOrbitItem id="react">⚛ React</ZuiOrbitItem>
        <ZuiOrbitItem id="typescript">
          {compact ? "TS" : "TS TypeScript"}
        </ZuiOrbitItem>
        <ZuiOrbitItem id="next">▲ Next.js</ZuiOrbitItem>
      </ZuiOrbit>
      {!compact && (
        <ZuiOrbit
          radius={178}
          duration={32}
          direction="counterclockwise"
          label="Platform"
        >
          <ZuiOrbitItem id="node">⬡ Node.js</ZuiOrbitItem>
          <ZuiOrbitItem id="postgres">◈ Postgres</ZuiOrbitItem>
          <ZuiOrbitItem id="cloud">☁ Cloud</ZuiOrbitItem>
          <ZuiOrbitItem id="design">✦ Design</ZuiOrbitItem>
        </ZuiOrbit>
      )}
    </ZuiOrbitSystem>
  );
}
