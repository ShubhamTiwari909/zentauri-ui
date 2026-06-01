import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import { FiActivity, FiCloud, FiShield, FiZap } from "react-icons/fi";

import type { MarqueeDemoProps } from "./types";

const demoItems = [
  ["Deploys synced", FiCloud],
  ["Security cleared", FiShield],
  ["SLO steady", FiActivity],
  ["Launch-ready", FiZap],
] as const;

export function MarqueeDemo({
  appearance = "default",
  direction,
  fade = true,
  orientation = "horizontal",
  pauseOnHover = true,
  size = "md",
  speed = 30,
}: MarqueeDemoProps) {
  return (
    <Marquee
      appearance={appearance}
      className={orientation === "vertical" ? "h-64" : undefined}
      direction={direction}
      fade={fade}
      gap={16}
      orientation={orientation}
      pauseOnHover={pauseOnHover}
      size={size}
      speed={speed}
    >
      {demoItems.map(([label, Icon]) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10"
        >
          <Icon className="h-4 w-4 text-cyan-200" aria-hidden />
          {label}
        </span>
      ))}
    </Marquee>
  );
}
