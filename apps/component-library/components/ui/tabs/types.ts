import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

import type { TabsAnimation } from "./animations";
import type { tabsContentVariants, tabsListVariants, tabsTriggerVariants } from "./variants";

export type { TabsAnimation };

type TabsListVariantProps = VariantProps<typeof tabsListVariants>;
type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>;
type TabsContentVariantProps = VariantProps<typeof tabsContentVariants>;

export type TabsProps = TabsListVariantProps & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  animation?: TabsAnimation;
  className?: string;
  children?: ReactNode;
};

export type TabsListProps = TabsListVariantProps &
  Omit<HTMLAttributes<HTMLDivElement>, "role"> & {
    ref?: Ref<HTMLDivElement>;
    "aria-label"?: string;
  };

export type TabsTriggerProps = TabsTriggerVariantProps &
  HTMLAttributes<HTMLButtonElement> & {
    value: string;
    ref?: Ref<HTMLButtonElement>;
  };

export type TabsContentProps = TabsContentVariantProps & {
  value: string;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  style?: CSSProperties;
};
