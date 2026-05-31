import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { MarqueeDemoProps } from "./marquee-code-examples.types";

export function marqueeSnippet({
  appearance = "default",
  direction,
  fade = true,
  orientation = "horizontal",
  pauseOnHover = true,
  size = "md",
  speed = 30,
}: MarqueeDemoProps) {
  const directionProp = direction ? `\n  direction="${direction}"` : "";
  const fadeProp = fade === false ? "\n  fade={false}" : "";
  const pauseProp = pauseOnHover ? "\n  pauseOnHover" : "";

  return `${variantLeadComment(
    `appearance ${appearance}, ${orientation}, ${size}`,
  )}import { Marquee } from "@zentauri-ui/zentauri-components/ui/marquee";
import { FiActivity, FiCloud, FiShield } from "react-icons/fi";

const items = [
  ["Deploys synced", FiCloud],
  ["Security cleared", FiShield],
  ["SLO steady", FiActivity],
];

export function Example() {
  return (
    <Marquee
      appearance="${appearance}"${directionProp}${fadeProp}
      gap={16}
      orientation="${orientation}"${pauseProp}
      size="${size}"
      speed={${speed}}
    >
      {items.map(([label, Icon]) => (
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
}`;
}
