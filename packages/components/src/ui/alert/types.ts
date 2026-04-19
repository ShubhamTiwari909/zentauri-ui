import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { alertVariants } from "./variants";

export type AlertAnimation = "none" | "slide-down" | "fade" | "pop";
export type AlertAppearance = VariantProps<typeof alertVariants>["appearance"]; 
export type AlertSize = VariantProps<typeof alertVariants>["size"];

export interface AlertBaseProps extends ComponentPropsWithRef<"div"> {
  appearance?: AlertAppearance;
  size?: AlertSize;
  closable?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  triggerClassName?: string;
  // Accept the wrapper element/component as a prop — defaults to "div"
  as?: ElementType;
}


export type AlertSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type AlertProps = Omit<AlertBaseProps, "as">;

