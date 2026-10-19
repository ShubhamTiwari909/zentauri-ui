import type { MaskedHeadingProps } from "@zentauri-ui/zentauri-components/ui/masked-heading";

export const demoImage = "/mountain-space-bg.jpg";
export const appearances = [
  "aurora",
  "sunset",
  "ocean",
  "forest",
  "ember",
  "candy",
  "midnight",
  "mono",
] as const;
export const reveals = ["rise", "wipe", "fade", "none"] as const;
export const triggers = ["view", "mount"] as const;
export const sizes = ["sm", "md", "lg", "xl"] as const;
export const aligns = ["start", "center", "end"] as const;

export type MaskedHeadingExampleProps = Omit<MaskedHeadingProps, "children">;

export const examples = [
  {
    label: "A gradient mesh, word by word",
    text: "Designed in the details",
    props: {},
  },
  {
    label: "A photograph wiped in from the inline start",
    text: "Beyond the horizon",
    props: { src: demoImage, reveal: "wipe", duration: 1300 },
  },
  {
    label: "Outlined letters that fill with light",
    text: "Light finds the edges",
    props: {
      reveal: "fade",
      outline: true,
      appearance: "sunset",
      duration: 1400,
    },
  },
  {
    label: "Still, centered, and motion-free",
    text: "Quiet by design",
    props: {
      reveal: "none",
      drift: 0,
      parallax: 0,
      align: "center",
      appearance: "mono",
      size: "md",
    },
  },
] as const satisfies readonly {
  label: string;
  text: string;
  props: MaskedHeadingExampleProps;
}[];
