import type { SpinnerProps } from "@zentauri-ui/zentauri-components/ui/spinner";

export type SpinnerAppearance = NonNullable<SpinnerProps["appearance"]>;
export type SpinnerVariant = NonNullable<SpinnerProps["variant"]>;
export type SpinnerSize = NonNullable<SpinnerProps["size"]>;

export type SpinnerDemoProps = {
  appearance: SpinnerAppearance;
  variant: SpinnerVariant;
  size: SpinnerSize;
};
