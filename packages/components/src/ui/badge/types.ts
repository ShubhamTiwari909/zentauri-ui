import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  ElementType,
  MouseEventHandler,
  ReactNode,
} from "react";

import type { badgeVariants } from "./variants";

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export interface BadgeBaseProps extends ComponentPropsWithRef<"span"> {
  appearance?: BadgeVariantProps["appearance"];
  size?: BadgeVariantProps["size"];
  shape?: BadgeVariantProps["shape"];
  closable?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  closeLabel?: string;
  children?: ReactNode;
  "aria-label"?: string;
  as?: ElementType;
}

export type BadgeProps = Omit<BadgeBaseProps, "as">;
