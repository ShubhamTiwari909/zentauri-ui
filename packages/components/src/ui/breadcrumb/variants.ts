import { cva } from "class-variance-authority";

import {
  zuiBreadcrumbAppearances,
  zuiBreadcrumbItemBase,
  zuiBreadcrumbLinkBase,
  zuiBreadcrumbListBase,
  zuiBreadcrumbNavBase,
  zuiBreadcrumbPageBase,
  zuiBreadcrumbSeparatorBase,
  zuiBreadcrumbSeparatorSizes,
} from "../../design-system/breadcrumb";

export const breadcrumbNavVariants = cva(zuiBreadcrumbNavBase, {
  variants: {
    appearance: zuiBreadcrumbAppearances,
  },
  defaultVariants: {
    appearance: "default",
  },
});

export const breadcrumbListVariants = cva(zuiBreadcrumbListBase);

export const breadcrumbItemVariants = cva(zuiBreadcrumbItemBase);

export const breadcrumbLinkVariants = cva(zuiBreadcrumbLinkBase);

export const breadcrumbPageVariants = cva(zuiBreadcrumbPageBase);

export const breadcrumbSeparatorVariants = cva(zuiBreadcrumbSeparatorBase, {
  variants: {
    size: zuiBreadcrumbSeparatorSizes,
  },
  defaultVariants: {
    size: "md",
  },
});
