import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import type { stepperIndicatorVariants, stepperVariants } from "./variants";

type StepperVariantProps = VariantProps<typeof stepperVariants>;

export type StepperProps = StepperVariantProps & {
  size?: VariantProps<typeof stepperIndicatorVariants>["size"];
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

export type StepperItemProps = ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
};

export type StepperIndicatorProps = ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
  appearance?: StepperAppearance;
};

export type StepperTitleProps = ComponentPropsWithoutRef<"div">;

export type StepperDescriptionProps = ComponentPropsWithoutRef<"p">;

export type StepperAppearance = VariantProps<typeof stepperIndicatorVariants>["appearance"];

export type StepperCtx = {
  orientation: NonNullable<StepperProps["orientation"]>;
  size: NonNullable<StepperProps["size"]>;
  total: number;
};