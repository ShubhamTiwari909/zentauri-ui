import type { SortableListProps } from "@zentauri-ui/zentauri-components/ui/sortable-list";

export const SORTABLE_LIST_APPEARANCES = [
  "default",
  "subtle",
  "primary",
  "outline",
  "ghost",
  "card",
  "separated",
  "blue",
  "cyan",
  "green",
  "emerald",
  "purple",
  "pink",
  "orange",
  "red",
  "amber",
  "slate",
  "gradient-blue",
  "gradient-purple",
  "gradient-green",
  "glass",
] as const satisfies readonly NonNullable<
  SortableListProps<{ id: string; title: string }>["appearance"]
>[];

export const SORTABLE_LIST_SIZES = [
  "sm",
  "md",
  "lg",
] as const satisfies readonly NonNullable<
  SortableListProps<{ id: string; title: string }>["size"]
>[];

export const SORTABLE_LIST_ITEM_SETS = {
  tasks: [
    { id: "design", title: "Design tokens" },
    { id: "build", title: "Build component" },
    { id: "publish", title: "Publish package" },
  ],
  launch: [
    { id: "draft", title: "Draft release notes" },
    { id: "review", title: "Review changes" },
    { id: "ship", title: "Ship the release" },
  ],
} as const;
