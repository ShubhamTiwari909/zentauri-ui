import { cn } from "../../lib/utils";
import {
  zuiTypographyDescriptionItemBase,
  zuiTypographyDescriptionTermBase,
  zuiTypographyDescriptionDetailsBase,
} from "../../design-system/typography";
import type {
  DescriptionListProps,
  DescriptionListItemProps,
  DescriptionListTermProps,
  DescriptionListDetailsProps,
} from "./types";
import { descriptionListVariants } from "./variants";

export const DescriptionListBase = ({
  layout,
  size,
  tone,
  separators,
  className,
  ...props
}: DescriptionListProps) => (
  <dl
    {...props}
    data-slot="typography-description-list"
    className={cn(
      descriptionListVariants({ layout, size, tone, separators }),
      className,
    )}
  />
);
export const DescriptionListItemBase = ({
  className,
  ...props
}: DescriptionListItemProps) => (
  <div
    {...props}
    data-slot="typography-description-item"
    className={cn(zuiTypographyDescriptionItemBase, className)}
  />
);
export const DescriptionListTermBase = ({
  className,
  ...props
}: DescriptionListTermProps) => (
  <dt
    {...props}
    data-slot="typography-description-term"
    className={cn(zuiTypographyDescriptionTermBase, className)}
  />
);
export const DescriptionListDetailsBase = ({
  className,
  ...props
}: DescriptionListDetailsProps) => (
  <dd
    {...props}
    data-slot="typography-description-details"
    className={cn(zuiTypographyDescriptionDetailsBase, className)}
  />
);
DescriptionListBase.displayName = "DescriptionList";
DescriptionListItemBase.displayName = "DescriptionListItem";
DescriptionListTermBase.displayName = "DescriptionListTerm";
DescriptionListDetailsBase.displayName = "DescriptionListDetails";
