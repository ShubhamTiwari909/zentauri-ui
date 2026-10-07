"use client";
import { createElement, useContext, useMemo, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import {
  zuiGridResponsiveClasses,
  zuiGridItemResponsiveClasses,
} from "../../design-system/grid";
import { GridContext } from "./grid-context";
import {
  gridRootStyle,
  gridItemStyle,
  resolveGridLayouts,
  warnGrid,
} from "./grid-layout";
import type { GridProps, GridItemProps } from "./types";
import { gridVariants, gridItemVariants } from "./variants";

export function GridBase({
  as = "div",
  layout,
  stackOnMobile = true,
  gap,
  columnGap,
  rowGap,
  autoRows,
  autoFlow,
  alignItems,
  justifyItems,
  className,
  style,
  ref,
  children,
  ...rest
}: GridProps): ReactElement {
  const layouts = useMemo(
    () => resolveGridLayouts(layout, stackOnMobile),
    [layout, stackOnMobile],
  );
  const contextValue = useMemo(
    () => ({ layouts, stackOnMobile }),
    [layouts, stackOnMobile],
  );
  return (
    <GridContext.Provider value={contextValue}>
      {createElement(
        as,
        {
          ...rest,
          ref,
          "data-slot": "grid",
          className: cn(
            gridVariants({ autoFlow, alignItems, justifyItems }),
            Object.values(zuiGridResponsiveClasses),
            className,
          ),
          style: {
            ...gridRootStyle(layouts, { gap, columnGap, rowGap, autoRows }),
            ...style,
          },
        },
        children,
      )}
    </GridContext.Provider>
  );
}
GridBase.displayName = "Grid";

export function GridItemBase({
  as = "div",
  colSpan,
  rowSpan,
  columnStart,
  rowStart,
  area,
  appearance,
  padding,
  alignSelf,
  justifySelf,
  className,
  style,
  ref,
  children,
  ...rest
}: GridItemProps): ReactElement {
  const context = useContext(GridContext);
  const layouts = context?.layouts;
  if (!layouts)
    warnGrid(
      "GridItem must be a direct grid child inside Grid; placement was ignored.",
    );
  return createElement(
    as,
    {
      ...rest,
      ref,
      "data-slot": "grid-item",
      className: cn(
        gridItemVariants({ appearance, padding, alignSelf, justifySelf }),
        layouts && Object.values(zuiGridItemResponsiveClasses),
        className,
      ),
      style: {
        ...(layouts
          ? gridItemStyle(
              layouts,
              {
                colSpan,
                rowSpan,
                columnStart,
                rowStart,
                area,
              },
              context?.stackOnMobile,
            )
          : {}),
        ...style,
      },
    },
    children,
  );
}
GridItemBase.displayName = "GridItem";
