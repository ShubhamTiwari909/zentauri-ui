import type { ElementType, HTMLAttributes, ReactNode, RefObject } from "react";

import type { zuiTabsTriggerAppearances } from "../../design-system/tabs";

export type TabsValue = string;
export type TabsAppearance = keyof typeof zuiTabsTriggerAppearances;

export type TabsProps = {
  value?: TabsValue;
  defaultValue?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "underline" | "pills";
  size?: "sm" | "md" | "lg";
  appearance?: TabsAppearance;
  children: ReactNode;
  className?: string;
};

export type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export type TabsTriggerProps = {
  value: TabsValue;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export type TabsContentProps = {
  as?: ElementType;
  value: TabsValue;
  children: ReactNode;
  className?: string;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "role" | "id" | "aria-labelledby"
>;

export type TabsContextType = {
  value: TabsValue | undefined;
  setValue: (value: TabsValue) => void;
  listRef: RefObject<HTMLDivElement | null>;
  orientation: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "underline" | "pills";
  appearance?: TabsAppearance;
  tabTriggerId: (value: TabsValue) => string;
  tabPanelId: (value: TabsValue) => string;
};
