import type { ButtonSharedStatic } from "@zentauri-ui/zentauri-components/ui/buttons";
import type { ButtonAnimation } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

type ButtonAppearance = NonNullable<ButtonSharedStatic["appearance"]>;

type ShowcaseButton = {
  label: string;
  appearance: ButtonAppearance;
  animation: ButtonAnimation;
};

const colorShowcaseAppearances = [
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "ocean",
  "sapphire",
  "lavender",
  "ruby",
  "red",
  "slate",
  "zinc",
  "stone",
  "royal",
  "electric",
  "forest",
  "sunset",
  "magenta",
  "crimson",
  "aqua",
  "plum",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gray",
  "amber",
  "violet",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
  "gradient-orange",
] as const satisfies readonly ButtonAppearance[];

const toShowcaseLabel = (appearance: string) =>
  appearance
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const showcaseButtons: ShowcaseButton[] = [
  {
    label: "Primary",
    appearance: "default",
    animation: "lift",
  },
  {
    label: "Secondary",
    appearance: "secondary",
    animation: "bounce",
  },
  {
    label: "Outline",
    appearance: "outline",
    animation: "press",
  },
  {
    label: "Ghost",
    appearance: "ghost",
    animation: "none",
  },
  {
    label: "Destructive",
    appearance: "destructive",
    animation: "glow",
  },
  {
    label: "Glass",
    appearance: "glass",
    animation: "tilt",
  },
  ...colorShowcaseAppearances.map(
    (appearance): ShowcaseButton => ({
      label: toShowcaseLabel(appearance),
      appearance,
      animation: "bounce",
    }),
  ),
];

export const sizeButtons = [
  { label: "Small", size: "sm" },
  { label: "Medium", size: "md" },
  { label: "Large", size: "lg" },
  { label: "Extra Large", size: "xl" },
  { label: "2XL", size: "2xl" },
  { label: "3XL", size: "3xl" },
  { label: "4XL", size: "4xl" },
  { label: "5XL", size: "5xl" },
  { label: "6XL", size: "6xl" },
  { label: "7XL", size: "7xl" },
  { label: "8XL", size: "8xl" },
  { label: "9XL", size: "9xl" },
  { label: "10XL", size: "10xl" },
  { label: "Icon", size: "icon" },
] as const;

export const buttonAnimationPresets = [
  ["Lift", "lift"],
  ["Press", "press"],
  ["Glow", "glow"],
  ["Tilt", "tilt"],
  ["Bounce", "bounce"],
  ["None", "none"],
] as const;
