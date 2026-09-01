import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  CSSProperties,
  HTMLAttributeAnchorTarget,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  RefObject,
} from "react";

import type {
  zuiCircularMenuAppearances,
  zuiCircularMenuLabelPlacements,
} from "../../design-system/circular-menu";
import type { CircularMenuDirection, CircularMenuPosition } from "./geometry";
import type { circularMenuVariants } from "./variants";

export type { CircularMenuDirection, CircularMenuPosition };

export type CircularMenuVariantProps = VariantProps<
  typeof circularMenuVariants
>;

export type CircularMenuSize = NonNullable<CircularMenuVariantProps["size"]>;

export type CircularMenuAppearance = keyof typeof zuiCircularMenuAppearances;

export type CircularMenuLabelPlacement =
  keyof typeof zuiCircularMenuLabelPlacements;

/** How the ring is opened. `always` keeps it open (static or spinning ring). */
export type CircularMenuTriggerMode = "hover" | "click" | "always";

/** Whether items counter-rotate to stay upright while the ring spins. */
export type CircularMenuItemRotation = "upright" | "follow";

export type CircularMenuState = "open" | "closed";

export type CircularMenuItemData = {
  /** Stable key and default accessible id source. */
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  /** Renders the item as an anchor instead of a button. */
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
  /** Overrides the ring appearance for this item only. */
  appearance?: CircularMenuAppearance;
  onSelect?: () => void;
};

/** Custom properties written inline by the root and by each item. */
export type CircularMenuCssProperties = CSSProperties & {
  "--zui-circular-menu-size"?: string;
  "--zui-circular-menu-radius"?: string;
  "--zui-circular-menu-item-size"?: string;
  "--zui-circular-menu-spin-duration"?: string;
  "--zui-circular-menu-stagger"?: string;
  "--zui-circular-menu-item-x"?: string;
  "--zui-circular-menu-item-y"?: string;
  "--zui-circular-menu-item-angle"?: string;
  "--zui-circular-menu-item-index"?: string;
};

export type CircularMenuRootProps = Omit<
  ComponentPropsWithRef<"div">,
  "children" | "onSelect"
> & {
  appearance?: CircularMenuAppearance;
  size?: CircularMenuSize;
  /** Ring radius in pixels. Defaults to the size variant's radius. */
  radius?: number;
  /** Item diameter in pixels. Defaults to the size variant's item size. */
  itemSize?: number;
  /** Square box edge in pixels. Defaults to `2 * (radius + itemSize / 2)`. */
  boxSize?: number;
  /** Angle of the first item in degrees. `0` = 12 o'clock, positive = clockwise. */
  startAngle?: number;
  /** Arc covered by the items in degrees. `360` closes the ring. */
  sweep?: number;
  direction?: CircularMenuDirection;
  /** Defaults to `"click"`. `"hover"` still opens on click and on focus. */
  trigger?: CircularMenuTriggerMode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Defaults to `true`. */
  closeOnSelect?: boolean;
  /** Defaults to `true`. */
  closeOnEscape?: boolean;
  /** Defaults to `true`. */
  closeOnOutside?: boolean;
  /** Rotate the whole ring continuously. */
  spin?: boolean;
  /** Seconds per revolution. Defaults to `12`. */
  spinDuration?: number;
  /** Defaults to `true`. */
  spinPauseOnHover?: boolean;
  /** Defaults to `"upright"`, which counter-rotates icons and labels. */
  itemRotation?: CircularMenuItemRotation;
  /** Draw a line from the center to each item. */
  showSpokes?: boolean;
  /** Defaults to `"tooltip"`, which reveals the label on hover and focus. */
  labelPlacement?: CircularMenuLabelPlacement;
  /** Per-item open/close delay in milliseconds. Defaults to `40`. */
  stagger?: number;
  /** Trigger content, and the accessible name of the menu. */
  label?: ReactNode;
  /** Shorthand data API. Ignored when the root is composed from children. */
  items?: CircularMenuItemData[];
  /** Runs after the selected item's own `onSelect`. */
  onSelect?: (item: CircularMenuItemData, index: number) => void;
  disabled?: boolean;
  children?: ReactNode;
};

export type CircularMenuProps = CircularMenuRootProps;

export type CircularMenuTriggerProps = ComponentPropsWithRef<"button">;

export type CircularMenuListProps = ComponentPropsWithRef<"div">;

export type CircularMenuItemProps = Omit<
  ComponentPropsWithRef<"button">,
  "onSelect"
> & {
  /** Renders the item as an anchor instead of a button. */
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  appearance?: CircularMenuAppearance;
  onSelect?: () => void;
};

export type CircularMenuItemIconProps = ComponentPropsWithRef<"span">;

export type CircularMenuItemLabelProps = ComponentPropsWithRef<"span"> & {
  placement?: CircularMenuLabelPlacement;
};

export type CircularMenuSpokeProps = ComponentPropsWithRef<"span"> & {
  appearance?: CircularMenuAppearance;
};

export type CircularMenuContextValue = {
  isOpen: boolean;
  isDisabled: boolean;
  state: CircularMenuState;
  appearance: CircularMenuAppearance;
  size: CircularMenuSize;
  triggerMode: CircularMenuTriggerMode;
  activeIndex: number;
  spin: boolean;
  /** `true` when icons and labels must counter-rotate against the spinning ring. */
  counterSpin: boolean;
  /** Seconds per revolution, needed by the animated entry's frame loop. */
  spinDuration: number;
  spinPauseOnHover: boolean;
  itemRotation: CircularMenuItemRotation;
  labelPlacement: CircularMenuLabelPlacement;
  showSpokes: boolean;
  triggerId: string;
  listId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setActiveIndex: (index: number) => void;
  registerItem: (index: number, node: HTMLElement | null) => void;
  focusItem: (index: number) => void;
  /**
   * Runs the item's own `onSelect`, then the root `onSelect`, then closes when
   * `closeOnSelect` is set. Composed items (no `items` array) are reported to
   * the root callback as `{ id: String(index) }`.
   */
  selectItem: (index: number, itemOnSelect?: () => void) => void;
  handleListKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
  handleTriggerKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>) => void;
};

/**
 * Ring layout parameters. Provided by the root and consumed by
 * `CircularMenu.List`, which solves one position per child.
 */
export type CircularMenuLayoutContextValue = {
  radius: number;
  startAngle: number;
  sweep: number;
  direction: CircularMenuDirection;
  itemSize: number;
};

export type CircularMenuRef = HTMLDivElement;
