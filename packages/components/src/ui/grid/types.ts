import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, CSSProperties } from "react";
import type { gridVariants, gridItemVariants } from "./variants";

export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GridResponsive<T> = { base: T } & Partial<
  Record<Exclude<GridBreakpoint, "base">, T>
>;
export type GridResponsiveValue<T> = T | GridResponsive<T>;
export type GridGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type GridSpan = number | "full";
export type GridLayout =
  | { mode: "fixed"; columns: number }
  | { mode: "auto"; minItemWidth?: number | string; repeat?: "fit" | "fill" }
  | {
      mode: "custom";
      columns: string;
      rows?: string;
      areas?: readonly string[];
    };
type GridVariantProps = VariantProps<typeof gridVariants>;
type GridItemVariantProps = VariantProps<typeof gridItemVariants>;
export type GridAppearance = NonNullable<GridItemVariantProps["appearance"]>;

type GridOwnProps = GridVariantProps & {
  /** Complete descriptors replace earlier layouts; omitted breakpoints inherit. @default { mode: "fixed", columns: 1 } */
  layout?: GridResponsiveValue<GridLayout>;
  /** Stack one item per row below the consumer's sm breakpoint, ignoring item placement. Set false to retain the configured mobile layout. @default true */
  stackOnMobile?: boolean;
  /** Token spacing on both axes. @default "md" */
  gap?: GridResponsiveValue<GridGap>;
  /** Overrides gap on the column axis at every resolved breakpoint. */
  columnGap?: GridResponsiveValue<GridGap>;
  /** Overrides gap on the row axis at every resolved breakpoint. */
  rowGap?: GridResponsiveValue<GridGap>;
  /** Implicit row sizing. @default "auto" */
  autoRows?: CSSProperties["gridAutoRows"];
};
export type GridProps = GridOwnProps &
  (
    | ({ as?: "div" } & Omit<
        ComponentPropsWithRef<"div">,
        keyof GridOwnProps | "as"
      >)
    | ({ as: "section" } & Omit<
        ComponentPropsWithRef<"section">,
        keyof GridOwnProps | "as"
      >)
    | ({ as: "ul" } & Omit<
        ComponentPropsWithRef<"ul">,
        keyof GridOwnProps | "as"
      >)
    | ({ as: "ol" } & Omit<
        ComponentPropsWithRef<"ol">,
        keyof GridOwnProps | "as"
      >)
  );

type GridItemOwnProps = GridItemVariantProps & {
  /** Fixed-layout spans clamp to available columns. Auto layouts support 1 or full. @default 1 */
  colSpan?: GridResponsiveValue<GridSpan>;
  /** Positive integer span of implicit or explicit rows. @default 1 */
  rowSpan?: GridResponsiveValue<number>;
  /** Positive line number; auto layouts use automatic placement. @default "auto" */
  columnStart?: GridResponsiveValue<number | "auto">;
  /** Positive line number or automatic placement. @default "auto" */
  rowStart?: GridResponsiveValue<number | "auto">;
  /** Named custom-layout area; auto clears an inherited area. @default "auto" */
  area?: GridResponsiveValue<string | "auto">;
};
export type GridItemProps = GridItemOwnProps &
  (
    | ({ as?: "div" } & Omit<
        ComponentPropsWithRef<"div">,
        keyof GridItemOwnProps | "as"
      >)
    | ({ as: "article" } & Omit<
        ComponentPropsWithRef<"article">,
        keyof GridItemOwnProps | "as"
      >)
    | ({ as: "li" } & Omit<
        ComponentPropsWithRef<"li">,
        keyof GridItemOwnProps | "as"
      >)
  );
