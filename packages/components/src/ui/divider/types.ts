import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { dividerVariants } from "./variants";

export type DividerVariantProps = VariantProps<typeof dividerVariants>;

export interface DividerBaseProps extends ComponentPropsWithRef<"div"> {
  appearance?: DividerVariantProps["appearance"];
  orientation?: DividerVariantProps["orientation"];
  size?: DividerVariantProps["size"];
  /** Optional label between divider lines. */
  label?: ReactNode;
  children?: ReactNode;
  as?: ElementType;
}

export type DividerProps = Omit<DividerBaseProps, "as">;
