import type { VariantProps } from "class-variance-authority";

import { tabsListVariants, tabsTriggerVariants } from "@zentauri-ui/zentauri-components/ui/tabs";

export type TabsListVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>;
export type TabsListSize = NonNullable<VariantProps<typeof tabsListVariants>["size"]>;
export type TabsListAppearance = NonNullable<
  VariantProps<typeof tabsTriggerVariants>["appearance"]
>;

export type TabsDemoProps = {
  variant: TabsListVariant;
  size: TabsListSize;
  appearance: TabsListAppearance;
};
