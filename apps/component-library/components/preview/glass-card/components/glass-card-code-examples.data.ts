import type { GlassCardProps } from "@zentauri-ui/zentauri-components/ui/glass-card";

export const materials = ["glass", "crystal", "frosted"] as const;
export const appearances = [
  "default",
  "subtle",
  "contrast",
  "cyan",
  "violet",
  "gradient-blue",
  "glass",
] as const;
export const examples = [
  { label: "A simple glass surface", props: {} },
  {
    label: "Crystal edges and ambient light",
    props: { variant: "crystal", appearance: "cyan", glow: true, depth: 32 },
  },
  {
    label: "Frosted glass with a stronger tilt",
    props: {
      variant: "frosted",
      appearance: "violet",
      intensity: 18,
      glareIntensity: 0.25,
    },
  },
  {
    label: "A still surface with usable controls",
    props: { interactive: false, appearance: "subtle" },
  },
  {
    label: "Reduced motion, full content",
    props: { variant: "crystal", reducedMotion: true, glow: true },
  },
] as const satisfies readonly { label: string; props: GlassCardProps }[];
