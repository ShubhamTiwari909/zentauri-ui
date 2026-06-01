import type { ProgressProps } from "@zentauri-ui/zentauri-components/ui/progress";

export type ProgressAppearance = NonNullable<ProgressProps["appearance"]>;
export type ProgressSize = NonNullable<ProgressProps["size"]>;
export type ProgressShape = NonNullable<ProgressProps["shape"]>;

export type ProgressDemoProps = {
  appearance: ProgressAppearance;
  size: ProgressSize;
  shape: ProgressShape;
  striped: boolean;
  animated: boolean;
};
