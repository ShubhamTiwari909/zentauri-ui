import type { ScrollExpandProps } from "@zentauri-ui/zentauri-components/ui/scroll-expand";

export const photo = "/mountain-space-bg.jpg";
export const forest = "/models/product-3d/forest-environment.jpg";
export const chair = "/models/product-3d/sheen-chair-poster.jpg";
export const appearances = ["default", "light", "contrast", "tint"] as const;

export type ScrollExpandExampleProps = Omit<ScrollExpandProps, "children">;

export const examples = [
  {
    label: "A photograph that opens to full bleed",
    overlay: {
      heading: "Every pixel, everywhere",
      body: "The frame opens as you scroll and hands the stage to your media.",
    },
    props: {
      src: photo,
      alt: "Mountains under a starry sky",
      title: "Built to scale",
      hint: "Scroll inside the frame",
    },
  },
  {
    label: "A wide resting frame on a light scrim",
    overlay: {
      heading: "Designed to be lived with",
      body: "A lighter scrim keeps dark overlay text readable on bright media.",
    },
    props: {
      src: chair,
      alt: "A soft lounge chair in a bright room",
      title: "Sit with it",
      appearance: "light",
      startWidth: 64,
      startHeight: 70,
      zoom: 1.15,
    },
  },
  {
    label: "A tinted scrim, a longer hold, and a call to action",
    overlay: {
      heading: "Into the forest",
      body: "A longer hold keeps the full-bleed moment on screen before the section releases.",
    },
    props: {
      src: forest,
      alt: "A forest path in soft light",
      title: "Take the long way",
      hint: "Keep scrolling",
      appearance: "tint",
      startWidth: 34,
      startHeight: 46,
      hold: 0.8,
      smoothing: 180,
    },
  },
] as const satisfies readonly {
  label: string;
  overlay: { heading: string; body: string };
  props: ScrollExpandExampleProps;
}[];
