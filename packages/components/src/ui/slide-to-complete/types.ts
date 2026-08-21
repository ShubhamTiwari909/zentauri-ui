import type { VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithRef,
  CSSProperties,
  KeyboardEvent,
  MutableRefObject,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";

import type { zuiSlideToCompleteAppearances } from "../../design-system/slide-to-complete";
import type { slideToCompleteVariants } from "./variants";

export type SlideToCompleteState =
  | "idle"
  | "dragging"
  | "completing"
  | "loading"
  | "completed"
  | "error"
  | "resetting"
  | "disabled";

export type SlideToCompleteVariantProps = VariantProps<
  typeof slideToCompleteVariants
>;

export type SlideToCompleteSize = NonNullable<
  SlideToCompleteVariantProps["size"]
>;

export type SlideToCompleteAppearance =
  keyof typeof zuiSlideToCompleteAppearances;

export type SlideToCompleteDirection = "ltr" | "rtl";

export type SlideToCompleteCssProperties = CSSProperties & {
  "--slide-progress"?: number;
  "--slide-threshold"?: number;
  "--slide-thumb-position"?: string;
};

export type SlideToCompleteRootProps = Omit<
  ComponentPropsWithRef<"div">,
  "onChange" | "children" | "dir" | "defaultValue"
> & {
  appearance?: SlideToCompleteAppearance;
  size?: SlideToCompleteSize;
  /** Normalized 0-1 point at which dragging auto-completes. Defaults to 0.9. */
  threshold?: number;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  /** Snap the thumb back to the start when released before the threshold. Defaults to true. */
  resetOnRelease?: boolean;
  direction?: SlideToCompleteDirection;
  value?: boolean;
  defaultValue?: boolean;
  onValueChange?: (completed: boolean) => void;
  onComplete?: () => void | Promise<void>;
  onProgressChange?: (progress: number) => void;
  onDragStart?: () => void;
  onReset?: () => void;
  children?: ReactNode;
};

export type SlideToCompleteProps = Omit<
  SlideToCompleteRootProps,
  "children"
> & {
  label?: ReactNode;
  thumbIcon?: ReactNode;
  children?: ReactNode;
};

export type SlideToCompleteTrackProps = ComponentPropsWithRef<"div">;

export type SlideToCompleteProgressProps = ComponentPropsWithRef<"div">;

export type SlideToCompleteLabelProps = ComponentPropsWithRef<"span">;

export type SlideToCompleteThumbProps = Omit<
  ComponentPropsWithRef<"button">,
  "onDrag" | "onDragStart" | "onDragEnd"
>;

export type SlideToCompleteIconProps = ComponentPropsWithRef<"span">;

export type SlideToCompleteContextValue = {
  state: SlideToCompleteState;
  progress: number;
  threshold: number;
  isDragging: boolean;
  isCompleted: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  direction: SlideToCompleteDirection;
  appearance: SlideToCompleteAppearance;
  size: SlideToCompleteSize;
  labelId: string;
  accessibleLabel: string;
  hasLabel: boolean;
  maxDragDistance: number;
  trackRef: MutableRefObject<HTMLDivElement | null>;
  thumbRef: MutableRefObject<HTMLButtonElement | null>;
  registerLabel: () => () => void;
  registerTrack: (node: HTMLDivElement | null) => void;
  registerThumb: (node: HTMLButtonElement | null) => void;
  startDrag: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  updateDrag: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  endDrag: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  cancelDrag: (event: ReactPointerEvent<HTMLButtonElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  complete: () => void;
  reset: () => void;
};

export type SlideToCompleteRef = HTMLDivElement;
