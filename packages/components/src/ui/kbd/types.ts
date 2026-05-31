import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { kbdKeyVariants } from "./variants";

export type KbdVariantProps = VariantProps<typeof kbdKeyVariants>;

export interface KbdBaseProps
  extends Omit<ComponentPropsWithRef<"span">, "children"> {
  /** Keys to render as individual keycaps, e.g. `["⌘", "K"]`. Takes precedence over `children`. */
  keys?: ReactNode[];
  /** Optional node rendered between keycaps (e.g. "+" or "then"). */
  separator?: ReactNode;
  appearance?: KbdVariantProps["appearance"];
  size?: KbdVariantProps["size"];
  /** Single keycap content when `keys` is not provided. */
  children?: ReactNode;
  as?: ElementType;
}

export type KbdProps = Omit<KbdBaseProps, "as">;
