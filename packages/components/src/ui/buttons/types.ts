import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { buttonVariants } from "./variants";

export type ButtonSharedStatic = VariantProps<typeof buttonVariants>;

export type ButtonProps =
  | (ButtonSharedStatic & ComponentPropsWithRef<"button"> & {
      as?: "button";
    })
  | (ButtonSharedStatic & ComponentPropsWithRef<"a"> & { as: "link" });


