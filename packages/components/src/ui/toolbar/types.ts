import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactElement,
  Ref,
} from "react";
import type { toolbarVariants, toolbarItemVariants } from "./variants";

export type ToolbarProps = Omit<
  ComponentPropsWithRef<"div">,
  "role" | "tabIndex"
> &
  VariantProps<typeof toolbarVariants> &
  VariantProps<typeof toolbarItemVariants> & {
    /** Wrap arrow navigation at the first and last items. Defaults to true. */
    loop?: boolean;
    /** Disable all managed items. Native disabled items are skipped. */
    disabled?: boolean;
  };
export type ToolbarButtonProps = Omit<
  ComponentPropsWithRef<"button">,
  "tabIndex"
>;
export type ToolbarToggleProps = Omit<ToolbarButtonProps, "aria-pressed"> & {
  /** Controlled pressed state. Arrow navigation never changes it. */
  pressed?: boolean;
  /** Initial uncontrolled pressed state. Defaults to false. */
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
};
export type ToolbarLinkProps = Omit<ComponentPropsWithRef<"a">, "tabIndex"> & {
  href: string;
  disabled?: boolean;
};
export type ToolbarItemProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "tabIndex"
> & {
  /** One focusable element that forwards props and ref to its DOM control. */
  children: ReactElement;
  disabled?: boolean;
  /** Forward native disabled to button-like controls. Set false for links/custom widgets. */
  native?: boolean;
  ref?: Ref<HTMLElement>;
};
export type ToolbarGroupProps = Omit<ComponentPropsWithRef<"div">, "role">;
export type ToolbarSeparatorProps = Omit<
  ComponentPropsWithRef<"div">,
  "role" | "children"
> & {
  /** Decorative by default; false exposes separator semantics and orientation. */
  decorative?: boolean;
};
