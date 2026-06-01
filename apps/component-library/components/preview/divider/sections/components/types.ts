import type { DividerProps } from "@zentauri-ui/zentauri-components/ui/divider";

export type DividerAppearance = NonNullable<DividerProps["appearance"]>;
export type DividerOrientation = NonNullable<DividerProps["orientation"]>;
export type DividerSize = NonNullable<DividerProps["size"]>;

export type DividerDemoProps = {
  appearance: DividerAppearance;
  orientation: DividerOrientation;
  size: DividerSize;
  withLabel: boolean;
};
