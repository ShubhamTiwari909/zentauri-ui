import {
  DescriptionListBase,
  DescriptionListItemBase,
  DescriptionListTermBase,
  DescriptionListDetailsBase,
} from "./description-list-base";
import type { DescriptionListProps } from "./types";
export const DescriptionListItem = DescriptionListItemBase;
export const DescriptionListTerm = DescriptionListTermBase;
export const DescriptionListDetails = DescriptionListDetailsBase;
const DescriptionListRoot = (props: DescriptionListProps) => (
  <DescriptionListBase {...props} />
);
DescriptionListRoot.displayName = "DescriptionList";
export const DescriptionList = Object.assign(DescriptionListRoot, {
  Item: DescriptionListItem,
  Term: DescriptionListTerm,
  Details: DescriptionListDetails,
});
