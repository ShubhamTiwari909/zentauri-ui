import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactElement } from "react";

import type { buttonVariants } from "./variants";

export type ButtonSharedStatic = VariantProps<typeof buttonVariants>;

export type ButtonProps =
  | (ButtonSharedStatic &
      Omit<ComponentPropsWithRef<"button">, "children" | "ref" | "type"> & {
        asChild: true;
        as?: never;
        children: ReactElement<{ className?: string; "data-slot"?: string }>;
      })
  | (ButtonSharedStatic &
      ComponentPropsWithRef<"button"> & {
        as?: "button";
        asChild?: false;
      })
  | (ButtonSharedStatic &
      ComponentPropsWithRef<"a"> & { as: "link"; asChild?: false });
