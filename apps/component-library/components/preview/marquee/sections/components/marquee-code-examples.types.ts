import type { MarqueeProps } from "@zentauri-ui/zentauri-components/ui/marquee";

export type MarqueeDemoProps = {
  appearance?: NonNullable<MarqueeProps["appearance"]>;
  direction?: MarqueeProps["direction"];
  fade?: MarqueeProps["fade"];
  orientation?: NonNullable<MarqueeProps["orientation"]>;
  pauseOnHover?: boolean;
  size?: NonNullable<MarqueeProps["size"]>;
  speed?: number;
};
