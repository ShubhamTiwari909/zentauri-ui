import type {
  ElectricBorderAppearance,
  ElectricBorderProps,
} from "@zentauri-ui/zentauri-components/ui/electric-border";

export const appearances = [
  "default",
  "subtle",
  "contrast",
  "primary",
  "secondary",
  "success",
  "destructive",
  "warning",
  "info",
  "blue",
  "cyan",
  "emerald",
  "violet",
  "rose",
  "amber",
  "slate",
  "gradient-blue",
  "gradient-emerald",
  "gradient-rose",
  "glass",
] as const satisfies readonly ElectricBorderAppearance[];

export const defaultOptions = {
  appearance: "default" as ElectricBorderAppearance,
  speed: 1,
  intensity: 1,
  thickness: 1.5,
  radius: 24,
  active: true,
  interactive: true,
  glow: true,
  sparks: true,
  intro: true,
  reducedMotion: false,
};

export const examples = [
  { label: "The default current", props: {} },
  {
    label: "Two colors, one perimeter",
    props: { appearance: "gradient-blue", intensity: 1.4 },
  },
  {
    label: "A calmer edge, without sparks",
    props: { appearance: "violet", speed: 0.6, intensity: 0.4, sparks: false },
  },
  {
    label: "Ambient current with interaction off",
    props: { appearance: "emerald", interactive: false },
  },
  {
    label: "Static, with all content intact",
    props: { appearance: "contrast", reducedMotion: true, glow: false },
  },
] as const satisfies readonly { label: string; props: ElectricBorderProps }[];
