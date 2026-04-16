import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";

import type { DrawerAnimation } from "./animations";
import type { drawerContentVariants, drawerTriggerVariants } from "./variants";

type DrawerContentVariantProps = VariantProps<typeof drawerContentVariants>;

export type { DrawerAnimation };

export type DrawerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type DrawerTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
  appearance?: VariantProps<typeof drawerTriggerVariants>["appearance"];
};

export type DrawerContentProps = DrawerContentVariantProps & {
  animation?: DrawerAnimation;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  id?: string;
  style?: CSSProperties;
};

export type DrawerSectionProps = {
  className?: string;
  children?: ReactNode;
};
