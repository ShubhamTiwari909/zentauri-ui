import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { scrollAreaVariants } from "./variants";

export type ScrollAreaVariantProps = VariantProps<typeof scrollAreaVariants>;

export type ScrollAreaProps = ScrollAreaVariantProps &
  ComponentPropsWithRef<"div"> & {
    viewportClassName?: string;
  };
