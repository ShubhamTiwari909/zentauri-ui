import type {
  BentoGridAnimation,
  BentoGridItemProps,
  BentoGridProps,
  BentoGridSpan,
} from "@zentauri-ui/zentauri-components/ui/bento-grid";

export type BentoGridAppearance = NonNullable<BentoGridItemProps["appearance"]>;
export type BentoGridGap = NonNullable<BentoGridProps["gap"]>;

export type BentoGridDemoProps = {
  cols: number;
  gap: BentoGridGap;
  animation: BentoGridAnimation;
  span: BentoGridSpan;
  appearance: BentoGridAppearance;
};
