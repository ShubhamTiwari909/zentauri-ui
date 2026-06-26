import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { passwordStrengthMeterVariants } from "./variants";

export type PasswordStrengthMeterVariantProps = VariantProps<
  typeof passwordStrengthMeterVariants
>;

export type PasswordStrengthMeterProps = PasswordStrengthMeterVariantProps &
  (Omit<ComponentPropsWithRef<"div">, "children"> & {
    value: number;
    min?: number;
    max?: number;
    label?: string;
    scoreLabel?: string;
    showScoreLabel?: boolean;
    animated?: boolean;
    segmented?: boolean;
    children?: ReactNode;
    as?: ElementType;
  });

export type PasswordStrengthMeterSectionProps = {
  className?: string;
  children?: ReactNode;
  as?: ElementType;
};

export type PasswordStrengthMeterCtx = {
  value: number;
  min: number;
  max: number;
  size: NonNullable<PasswordStrengthMeterProps["size"]>;
  shape: NonNullable<PasswordStrengthMeterProps["shape"]>;
  animated: boolean;
  segmented: boolean;
  appearance: NonNullable<PasswordStrengthMeterProps["appearance"]>;
  labelSlotId: string;
};
