import type { ComponentPropsWithRef } from "react";
import type { VariantProps } from "class-variance-authority";
import type {
  resizablePanelsVariants,
  resizablePanelVariants,
  resizableHandleVariants,
} from "./variants";

type PanelVariants = VariantProps<typeof resizablePanelVariants>;
type HandleVariants = VariantProps<typeof resizableHandleVariants>;
export type ResizablePanelsAppearance = NonNullable<
  PanelVariants["appearance"]
>;
export type ResizablePanelsOrientation = "horizontal" | "vertical";

export type ResizablePanelsProps = Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue"
> &
  Omit<VariantProps<typeof resizablePanelsVariants>, "orientation"> & {
    /** Layout axis; vertical groups need an explicit height. @default "horizontal" */
    orientation?: ResizablePanelsOrientation;
    /** Controlled percentages in panel order. Invalid values are normalized within constraints. */
    sizes?: readonly number[];
    /** Initial percentages in panel order; defaults to equal shares. */
    defaultSizes?: readonly number[];
    /** Called with requested percentages when the user resizes. */
    onSizesChange?: (sizes: number[]) => void;
    /** Last requested percentages at pointer-up or after a keyboard resize. Not called on cancellation. */
    onResizeEnd?: (sizes: number[]) => void;
    /** Disable all resize handles. @default false */
    disabled?: boolean;
    /** Arrow-key step in percentage points; Shift multiplies it by ten. @default 2 */
    keyboardStep?: number;
  };

export type ResizablePanelProps = ComponentPropsWithRef<"div"> &
  PanelVariants & {
    /** Stable native DOM id, unique in the document; connects the preceding pane to its handle. */
    id: string;
    /** Minimum expanded percentage. All expanded minima must total at most 100. @default 10 */
    minSize?: number;
    /** Maximum percentage. All maxima must total at least 100. @default 100 */
    maxSize?: number;
    /** Allow the pane to snap below its expanded minimum; Enter on the following handle toggles it. @default false */
    collapsible?: boolean;
    /** Collapsed percentage, between zero and minSize. Zero makes content inert and hidden. @default 0 */
    collapsedSize?: number;
  };

export type ResizableHandleProps = ComponentPropsWithRef<"div"> &
  Omit<HandleVariants, "orientation"> & {
    /** Disable this handle independently. @default false */
    disabled?: boolean;
    /** Render the default visual grip when children are absent. @default true */
    withGrip?: boolean;
  };
