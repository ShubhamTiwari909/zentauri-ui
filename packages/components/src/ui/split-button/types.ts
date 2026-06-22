import type {
  ComponentPropsWithRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import type { ButtonSharedStatic } from "../buttons";

export type SplitButtonAppearance = ButtonSharedStatic["appearance"];
export type SplitButtonSize = Extract<ButtonSharedStatic["size"], string>;
export type SplitButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success";

export interface SplitButtonItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface SplitButtonProps extends Omit<
  ComponentPropsWithRef<"div">,
  "children" | "onClick"
> {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  items: SplitButtonItem[];
  disabled?: boolean;
  loading?: boolean;
  appearance?: SplitButtonAppearance;
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerLabel?: string;
  triggerOn?: "click" | "hover";
}
