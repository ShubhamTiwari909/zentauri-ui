import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";
import type { orbitSystemVariants } from "./variants";

export type OrbitSystemVariantProps = VariantProps<typeof orbitSystemVariants>;
export type OrbitSystemAppearance = NonNullable<
  OrbitSystemVariantProps["appearance"]
>;
export type OrbitSystemSize = NonNullable<OrbitSystemVariantProps["size"]>;

export type OrbitSystemProps = Omit<ComponentPropsWithRef<"div">, "onChange"> &
  OrbitSystemVariantProps & {
    /** Content rendered at the center of the orbital plane. */
    center?: ReactNode;
    /** Continuously advance the items. Defaults to true; respects reduced motion. */
    autoRotate?: boolean;
    /** Suspend orbital motion. */
    paused?: boolean;
    /** Enable dragging, zooming and item selection. Defaults to true. */
    interactive?: boolean;
    /** Initial camera tilt in degrees, clamped to 15–75. Defaults to 55. */
    tilt?: number;
    /** Initial camera magnification, clamped to 0.5–2. Defaults to 1. */
    zoom?: number;
    /** Controlled selected item id. */
    selectedId?: string | null;
    /** Initial selected item id. */
    defaultSelectedId?: string | null;
    onSelectionChange?: (id: string | null) => void;
    /** Show pause and zoom buttons. Defaults to true. */
    showControls?: boolean;
  };

export type OrbitProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Radius of the ring in pixels. */
  radius: number;
  /** Seconds per revolution. Defaults to 28. */
  duration?: number;
  /** Motion direction. Defaults to clockwise. */
  direction?: "clockwise" | "counterclockwise";
  /** Rotational offset in degrees. */
  phase?: number;
  /** Accessible ring label. */
  label?: string;
  children?: ReactNode;
};

export type OrbitItemProps = Omit<
  ComponentPropsWithRef<"button">,
  "onSelect"
> & {
  /** Stable id used for controlled selection. Defaults to a generated id. */
  id?: string;
  /** Spoken item label when content is not text. */
  label?: string;
  /** Position around the ring in degrees. Evenly spaced when omitted. */
  angle?: number;
  onSelect?: (id: string) => void;
};
