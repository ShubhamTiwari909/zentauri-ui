import type { AnimatedNumberProps } from "@zentauri-ui/zentauri-components/ui/animated-number";

export type AnimatedNumberDemoAppearance = NonNullable<
  AnimatedNumberProps["appearance"]
>;
export type AnimatedNumberDemoSize = NonNullable<AnimatedNumberProps["size"]>;
export type AnimatedNumberDemoType = NonNullable<AnimatedNumberProps["type"]>;

export type AnimatedNumberDemoProps = {
  appearance: AnimatedNumberDemoAppearance;
  size?: AnimatedNumberDemoSize;
  type?: AnimatedNumberDemoType;
  counter?: boolean;
};
