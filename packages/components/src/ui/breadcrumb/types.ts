import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";

import type { breadcrumbSeparatorVariants, breadcrumbNavVariants, breadcrumbLinkVariants, breadcrumbPageVariants } from "./variants";

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav"> & {
  "aria-label"?: string;
} & { ref?: Ref<HTMLElement> };

export type BreadcrumbListProps = ComponentPropsWithoutRef<"ol">;

export type BreadcrumbItemProps = ComponentPropsWithoutRef<"li">;

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<"a"> & VariantProps<typeof breadcrumbLinkVariants> & {
  appearance?: BreadcrumbAppearance;
} & { ref?: Ref<HTMLAnchorElement> };

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof breadcrumbPageVariants> & {
  appearance?: BreadcrumbAppearance;
} & { ref?: Ref<HTMLSpanElement> };

export type SeparatorVariantProps = VariantProps<typeof breadcrumbSeparatorVariants>;

export type BreadcrumbAppearance = NonNullable<VariantProps<typeof breadcrumbNavVariants>["appearance"]>;

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<"span"> &
  SeparatorVariantProps & {
    children?: ReactNode;
  };
