import type { ListProps } from "./types";

import { ListBase, ListItemBase } from "./list-base";

export const ListItem = ListItemBase;

function ListRoot(props: ListProps) {
  return <ListBase {...props} />;
}

export const List = Object.assign(ListRoot, {
  Item: ListItem,
});

ListRoot.displayName = "List";
