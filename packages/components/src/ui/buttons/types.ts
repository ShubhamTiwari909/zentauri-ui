import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  MouseEventHandler,
  ReactElement,
} from "react";

import type { buttonVariants } from "./variants";

export type ButtonSharedStatic = VariantProps<typeof buttonVariants>;

export type ButtonProps =
  | (ButtonSharedStatic &
      Omit<
        ComponentPropsWithRef<"button">,
        "children" | "onClick" | "ref" | "type"
      > & {
        asChild: true;
        as?: never;
        children: ReactElement<{
          "aria-disabled"?: boolean | "false" | "true";
          className?: string;
          "data-slot"?: string;
          disabled?: boolean;
          onClick?: MouseEventHandler<HTMLElement>;
          tabIndex?: number;
        }>;
        onClick?: MouseEventHandler<HTMLElement>;
      })
  | (ButtonSharedStatic &
      ComponentPropsWithRef<"button"> & {
        as?: "button";
        asChild?: false;
      })
  | (ButtonSharedStatic &
      ComponentPropsWithRef<"a"> & { as: "link"; asChild?: false });
