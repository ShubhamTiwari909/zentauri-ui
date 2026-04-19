import type { VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes, ReactNode, Ref, RefObject } from "react";

import type { drawerContentVariants, drawerTriggerVariants } from "./variants";

export type DrawerContentVariantProps = VariantProps<typeof drawerContentVariants>;

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

export type DrawerCtx = {
  open: boolean;
  setOpen: (next: boolean) => void;
  titleId: string;
  descriptionId: string;
  contentRef: RefObject<HTMLDivElement | null>;
};