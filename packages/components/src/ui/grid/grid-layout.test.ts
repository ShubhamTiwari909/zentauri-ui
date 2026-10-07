import { describe, expect, it, vi } from "vitest";
import {
  gridAreaNames,
  gridItemStyle,
  gridRootStyle,
  normalizeGridLayout,
  resolveGridLayouts,
  resolveGridResponsive,
} from "./grid-layout";
import type { GridLayout, GridResponsive } from "./types";

describe("Grid responsive configuration", () => {
  it.each<GridLayout>([
    { mode: "fixed", columns: 4 },
    { mode: "auto", minItemWidth: 100 },
    { mode: "custom", columns: "2fr 1fr", rows: "5rem", areas: ["main aside"] },
  ])(
    "stacks $mode below sm and restores the inherited descriptor",
    (layout) => {
      const layouts = resolveGridLayouts(
        { base: layout, md: { mode: "fixed", columns: 6 } },
        true,
      );
      expect(layouts.base).toEqual({ mode: "fixed", columns: 1 });
      expect(layouts.sm).toEqual(normalizeGridLayout(layout));
      expect(layouts.md).toEqual({ mode: "fixed", columns: 6 });
      const style = gridRootStyle(layouts, {});
      expect(style["--_zui-grid-rows-base"]).toBe("none");
      expect(style["--_zui-grid-areas-base"]).toBe("none");
      expect(resolveGridLayouts(layout, false).base).toEqual(
        normalizeGridLayout(layout),
      );
    },
  );
  it("resets all mobile placement and restores responsive placement from sm", () => {
    const layouts = resolveGridLayouts({ mode: "fixed", columns: 6 }, true);
    const style = gridItemStyle(
      layouts,
      {
        colSpan: { base: 3, md: 4 },
        rowSpan: 2,
        columnStart: 2,
        rowStart: 4,
      },
      true,
    );
    expect(style["--_zui-grid-item-column-start-base"]).toBe("auto");
    expect(style["--_zui-grid-item-column-end-base"]).toBe("span 1");
    expect(style["--_zui-grid-item-row-start-base"]).toBe("auto");
    expect(style["--_zui-grid-item-row-end-base"]).toBe("span 1");
    expect(style["--_zui-grid-item-column-start-sm"]).toBe("2");
    expect(style["--_zui-grid-item-column-end-sm"]).toBe("span 3");
    expect(style["--_zui-grid-item-row-start-sm"]).toBe("4");
    expect(style["--_zui-grid-item-row-end-sm"]).toBe("span 2");
    expect(style["--_zui-grid-item-column-end-md"]).toBe("span 4");
  });
  it("clears named areas on mobile and restores them at sm", () => {
    const style = gridItemStyle(
      resolveGridLayouts(
        {
          mode: "custom",
          columns: "1fr 1fr",
          areas: ["main aside"],
        },
        true,
      ),
      { area: "aside" },
      true,
    );
    expect(style["--_zui-grid-item-column-start-base"]).toBe("auto");
    expect(style["--_zui-grid-item-row-start-base"]).toBe("auto");
    expect(style["--_zui-grid-item-column-start-sm"]).toBe("aside");
    expect(style["--_zui-grid-item-row-start-sm"]).toBe("aside");
  });
  it("inherits mobile-first independently of object insertion order", () => {
    expect(resolveGridResponsive({ xl: 4, base: 1, md: 2 }, 1)).toEqual({
      base: 1,
      sm: 1,
      md: 2,
      lg: 2,
      xl: 4,
      "2xl": 4,
    });
  });
  it("uses a deterministic fallback for missing base and ignores unknown breakpoints", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(
      resolveGridResponsive(
        { md: 3, unknown: 4 } as unknown as GridResponsive<number>,
        1,
      ).base,
    ).toBe(1);
    expect(warning).toHaveBeenCalled();
    warning.mockRestore();
  });
  it.each([0, -1, NaN, Infinity, 1.5])(
    "rejects invalid fixed columns %s",
    (columns) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(normalizeGridLayout({ mode: "fixed", columns })).toEqual({
        mode: "fixed",
        columns: 1,
      });
      vi.restoreAllMocks();
    },
  );
  it("bounds convenience columns to 24", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(normalizeGridLayout({ mode: "fixed", columns: 99 })).toEqual({
      mode: "fixed",
      columns: 24,
    });
    vi.restoreAllMocks();
  });
  it("resets rows and areas when a custom layout becomes fixed", () => {
    const layouts = resolveGridLayouts({
      base: { mode: "custom", columns: "1fr", rows: "5rem", areas: ["main"] },
      md: { mode: "fixed", columns: 2 },
    });
    const style = gridRootStyle(layouts, {});
    expect(style["--_zui-grid-rows-base"]).toBe("5rem");
    expect(style["--_zui-grid-areas-base"]).toBe('"main"');
    expect(style["--_zui-grid-rows-md"]).toBe("none");
    expect(style["--_zui-grid-areas-md"]).toBe("none");
  });
  it("keeps axis overrides active when the general gap changes", () => {
    const style = gridRootStyle(resolveGridLayouts(undefined), {
      gap: { base: "sm", lg: "xl" },
      rowGap: "none",
      columnGap: { base: "md", xl: "lg" },
    });
    expect(style["--_zui-grid-row-gap-lg"]).toBe("0px");
    expect(style["--_zui-grid-column-gap-lg"]).toBe(
      "var(--zui-grid-gap-md,1rem)",
    );
    expect(style["--_zui-grid-column-gap-xl-dark"]).toBe(
      "var(--zui-grid-gap-lg-dark,1.5rem)",
    );
  });
  it("uses paired themed minimum widths and protects narrow auto containers", () => {
    const style = gridRootStyle(resolveGridLayouts({ mode: "auto" }), {});
    expect(style["--_zui-grid-columns-base"]).toContain(
      "min(var(--zui-grid-min-item-width,16rem), 100%)",
    );
    expect(style["--_zui-grid-columns-base-dark"]).toContain(
      "--zui-grid-min-item-width-dark",
    );
    expect(
      gridRootStyle(
        resolveGridLayouts({ mode: "auto", minItemWidth: 200, repeat: "fill" }),
        {},
      )["--_zui-grid-columns-base"],
    ).toContain("auto-fill, minmax(min(200px, 100%)");
  });
  it.each([0, -2, NaN, ""])(
    "falls back from invalid auto width %s",
    (width) => {
      vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(
        normalizeGridLayout({ mode: "auto", minItemWidth: width }).mode,
      ).toBe("auto");
      expect(
        gridRootStyle(
          resolveGridLayouts({ mode: "auto", minItemWidth: width }),
          {},
        )["--_zui-grid-columns-base"],
      ).toContain("--zui-grid-min-item-width");
      vi.restoreAllMocks();
    },
  );
});

describe("Grid item placement", () => {
  it("reclamps scalar spans at every root breakpoint", () => {
    const styles = gridItemStyle(
      resolveGridLayouts({
        base: { mode: "fixed", columns: 1 },
        md: { mode: "fixed", columns: 6 },
      }),
      { colSpan: 4 },
    );
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("span 1");
    expect(styles["--_zui-grid-item-column-end-md"]).toBe("span 4");
  });
  it("clamps explicit starts and the remaining span without adding implicit columns", () => {
    const styles = gridItemStyle(
      resolveGridLayouts({ mode: "fixed", columns: 4 }),
      { colSpan: 4, columnStart: 3 },
    );
    expect(styles["--_zui-grid-item-column-start-base"]).toBe("3");
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("span 2");
    expect(
      gridItemStyle(resolveGridLayouts({ mode: "fixed", columns: 2 }), {
        columnStart: 99,
      })["--_zui-grid-item-column-start-base"],
    ).toBe("2");
  });
  it("full width overrides starts but preserves row placement", () => {
    const styles = gridItemStyle(resolveGridLayouts(undefined), {
      colSpan: "full",
      columnStart: 99,
      rowSpan: 2,
      rowStart: 3,
    });
    expect(styles["--_zui-grid-item-column-start-base"]).toBe("1");
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("-1");
    expect(styles["--_zui-grid-item-row-start-base"]).toBe("3");
    expect(styles["--_zui-grid-item-row-end-base"]).toBe("span 2");
  });
  it("resets wide numeric spans and starts in intrinsic auto mode", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const styles = gridItemStyle(resolveGridLayouts({ mode: "auto" }), {
      colSpan: 4,
      columnStart: 2,
    });
    expect(styles["--_zui-grid-item-column-start-base"]).toBe("auto");
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("span 1");
    vi.restoreAllMocks();
  });
  it("restores spans after a named area is explicitly cleared", () => {
    const styles = gridItemStyle(
      resolveGridLayouts({
        mode: "custom",
        columns: "1fr 1fr",
        areas: ["main aside"],
      }),
      { area: { base: "main", md: "auto" }, colSpan: 2 },
    );
    expect(styles["--_zui-grid-item-column-start-base"]).toBe("main");
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("main");
    expect(styles["--_zui-grid-item-column-start-md"]).toBe("auto");
    expect(styles["--_zui-grid-item-column-end-md"]).toBe("span 2");
  });
  it("ignores an area when the root switches to fixed mode", () => {
    const styles = gridItemStyle(
      resolveGridLayouts({
        base: { mode: "custom", columns: "1fr", areas: ["main"] },
        md: { mode: "fixed", columns: 2 },
      }),
      { area: "main" },
    );
    expect(styles["--_zui-grid-item-row-start-md"]).toBe("auto");
  });
  it("falls back for missing area names and invalid numeric placement", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const styles = gridItemStyle(
      resolveGridLayouts({ mode: "custom", columns: "1fr", areas: ["main"] }),
      { area: "absent", colSpan: -1, rowSpan: 0, columnStart: -2, rowStart: 0 },
    );
    expect(styles["--_zui-grid-item-column-end-base"]).toBe("span 1");
    expect(styles["--_zui-grid-item-row-end-base"]).toBe("span 1");
    expect(styles["--_zui-grid-item-column-start-base"]).toBe("auto");
    expect(styles["--_zui-grid-item-row-start-base"]).toBe("auto");
    vi.restoreAllMocks();
  });
  it.each([["a a", "a b"], ["a b", "a"], ["auto"], ['bad"name'], []])(
    "rejects invalid area matrix %j",
    (...rows) => {
      expect(gridAreaNames(rows as string[])).toBeNull();
    },
  );
  it("accepts dots and rectangular area names", () => {
    expect(gridAreaNames(["main main aside", "footer footer ."])).toEqual([
      "main",
      "aside",
      "footer",
    ]);
  });
  it("ignores invalid custom areas without discarding valid columns", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const layout = normalizeGridLayout({
      mode: "custom",
      columns: "1fr 1fr",
      areas: ["a a", "a b"],
    }) as Extract<GridLayout, { mode: "custom" }>;
    expect(layout.columns).toBe("1fr 1fr");
    expect(layout.areas).toBeUndefined();
    vi.restoreAllMocks();
  });
});
