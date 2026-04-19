import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

import type { emptyStateVariants } from "./variants";

type EmptyStateVariantProps = VariantProps<typeof emptyStateVariants>;

export type EmptyStateProps = EmptyStateVariantProps &
  (Omit<ComponentPropsWithRef<"section">, "children"> & {
    children?: ReactNode;
    as?: ElementType;
  });

export type EmptyStateSectionProps = {
  className?: string;
  children?: ReactNode;
};

export type EmptyStateSize = NonNullable<EmptyStateProps["size"]>;
