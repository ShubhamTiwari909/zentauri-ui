import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { Grid, GridItem } from "./index";
import { zuiGridItemAppearances } from "../../design-system/grid";
import type { GridAppearance } from "./types";
import { assertNoAxeViolations } from "../../test-utils/axe";

// These compile-time fixtures are checked by the package's check-types task.
function nativeTypeChecks() {
  const divRef = createRef<HTMLDivElement>();
  const listRef = createRef<HTMLUListElement>();
  <Grid ref={divRef} />;
  <Grid as="ul" ref={listRef} />;
  // @ts-expect-error A list root must not accept a div ref.
  <Grid as="ul" ref={divRef} />;
  // @ts-expect-error Fixed layout descriptors do not accept auto width options.
  <Grid layout={{ mode: "fixed", columns: 2, minItemWidth: 100 }} />;
  // @ts-expect-error Responsive configuration requires a base.
  <Grid layout={{ md: { mode: "fixed", columns: 2 } }} />;
  // @ts-expect-error Article wrappers have no native list value attribute.
  <GridItem as="article" value={3} />;
}
void nativeTypeChecks;

describe("Grid", () => {
  it("stacks by default without forwarding the mobile setting to the DOM", () => {
    const { container } = render(
      <Grid layout={{ mode: "fixed", columns: 4 }}>
        <GridItem colSpan={3} columnStart={2} rowSpan={2} rowStart={4}>
          Stacked
        </GridItem>
      </Grid>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--_zui-grid-columns-base")).toBe(
      "repeat(1, minmax(0, 1fr))",
    );
    expect(root.style.getPropertyValue("--_zui-grid-columns-sm")).toBe(
      "repeat(4, minmax(0, 1fr))",
    );
    expect(root).not.toHaveAttribute("stackOnMobile");
    expect(
      screen
        .getByText("Stacked")
        .style.getPropertyValue("--_zui-grid-item-row-start-base"),
    ).toBe("auto");
    expect(
      screen
        .getByText("Stacked")
        .style.getPropertyValue("--_zui-grid-item-column-end-base"),
    ).toBe("span 1");
  });
  it("updates the mobile setting without losing configured areas or rows", () => {
    const layout = {
      mode: "custom",
      columns: "2fr 1fr",
      rows: "5rem",
      areas: ["main aside"],
    } as const;
    const content = <GridItem area="aside">Aside</GridItem>;
    const { container, rerender } = render(
      <Grid layout={layout}>{content}</Grid>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--_zui-grid-areas-base")).toBe("none");
    rerender(
      <Grid layout={layout} stackOnMobile={false}>
        {content}
      </Grid>,
    );
    expect(root.style.getPropertyValue("--_zui-grid-columns-base")).toBe(
      "2fr 1fr",
    );
    expect(root.style.getPropertyValue("--_zui-grid-rows-base")).toBe("5rem");
    expect(root.style.getPropertyValue("--_zui-grid-areas-base")).toBe(
      '"main aside"',
    );
    expect(
      screen
        .getByText("Aside")
        .style.getPropertyValue("--_zui-grid-item-column-start-base"),
    ).toBe("aside");
    expect(root).not.toHaveAttribute("stackOnMobile");
    rerender(<Grid layout={layout}>{content}</Grid>);
    expect(root.style.getPropertyValue("--_zui-grid-areas-base")).toBe("none");
    expect(
      screen
        .getByText("Aside")
        .style.getPropertyValue("--_zui-grid-item-column-start-base"),
    ).toBe("auto");
  });
  it.each([true, false])(
    "isolates nested mobile settings when the outer setting is %s",
    (outerStack) => {
      render(
        <Grid layout={{ mode: "fixed", columns: 4 }} stackOnMobile={outerStack}>
          <GridItem colSpan={3}>
            Outer
            <Grid
              layout={{ mode: "fixed", columns: 2 }}
              stackOnMobile={!outerStack}
            >
              <GridItem colSpan={2}>Inner</GridItem>
            </Grid>
            <Grid layout={{ mode: "fixed", columns: 2 }}>
              <GridItem colSpan={2}>Default inner</GridItem>
            </Grid>
          </GridItem>
        </Grid>,
      );
      expect(
        screen
          .getByText("Outer")
          .style.getPropertyValue("--_zui-grid-item-column-end-base"),
      ).toBe(outerStack ? "span 1" : "span 3");
      expect(
        screen
          .getByText("Inner")
          .style.getPropertyValue("--_zui-grid-item-column-end-base"),
      ).toBe(outerStack ? "span 2" : "span 1");
      expect(
        screen
          .getByText("Default inner")
          .style.getPropertyValue("--_zui-grid-item-column-end-base"),
      ).toBe("span 1");
    },
  );
  it("renders neutral slots and preserves zero content with no widget roles", () => {
    const { container } = render(
      <Grid>
        <GridItem>{0}</GridItem>
      </Grid>,
    );
    const root = container.querySelector('[data-slot="grid"]')!;
    const item = screen.getByText("0");
    expect(root).toHaveClass("grid-flow-row");
    expect(item).toHaveAttribute("data-slot", "grid-item");
    expect(root).not.toHaveAttribute("role");
    expect(item).not.toHaveAttribute("tabindex");
    expect(item).not.toHaveClass("overflow-hidden");
    expect(Grid.displayName).toBe("Grid");
    expect(GridItem.displayName).toBe("GridItem");
  });
  it("renders an empty root without an invented message", () => {
    const { container } = render(<Grid />);
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });
  it("forwards selected-element refs, native attributes, and native callbacks", () => {
    const root = createRef<HTMLOListElement>();
    const item = createRef<HTMLLIElement>();
    const click = vi.fn();
    render(
      <Grid as="ol" ref={root} aria-label="Results" start={2}>
        <GridItem as="li" ref={item} value={4}>
          <button onClick={click}>Action</button>
        </GridItem>
      </Grid>,
    );
    expect(root.current?.tagName).toBe("OL");
    expect(item.current?.tagName).toBe("LI");
    expect(root.current).toHaveAttribute("start", "2");
    expect(item.current).toHaveAttribute("value", "4");
    fireEvent.click(screen.getByRole("button"));
    expect(click).toHaveBeenCalledOnce();
  });
  it("merges consumer className and style with style taking explicit precedence", () => {
    const { container } = render(
      <Grid className="max-w-xl" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <GridItem className="font-bold" style={{ gridColumn: "1 / -1" }}>
          Item
        </GridItem>
      </Grid>,
    );
    expect(container.firstElementChild).toHaveClass("max-w-xl");
    expect(container.firstElementChild).toHaveStyle({
      gridTemplateColumns: "2fr 1fr",
    });
    expect(screen.getByText("Item")).toHaveStyle({ gridColumn: "1 / -1" });
    expect(screen.getByText("Item")).toHaveClass("font-bold");
  });
  it("isolates nested layout maps and private variables", () => {
    render(
      <Grid layout={{ mode: "fixed", columns: 8 }} stackOnMobile={false}>
        <GridItem colSpan={4}>
          Outer
          <Grid layout={{ mode: "fixed", columns: 2 }} stackOnMobile={false}>
            <GridItem colSpan={4}>Inner</GridItem>
          </Grid>
        </GridItem>
      </Grid>,
    );
    expect(
      screen
        .getByText("Inner")
        .style.getPropertyValue("--_zui-grid-item-column-end-base"),
    ).toBe("span 2");
    expect(
      screen
        .getByText("Outer")
        .style.getPropertyValue("--_zui-grid-item-column-end-base"),
    ).toBe("span 4");
  });
  it("recomputes placement on root changes and renders keyed content changes", () => {
    const { rerender } = render(
      <Grid layout={{ mode: "fixed", columns: 4 }} stackOnMobile={false}>
        <GridItem key="a" colSpan={3}>
          A
        </GridItem>
      </Grid>,
    );
    rerender(
      <Grid layout={{ mode: "fixed", columns: 1 }} stackOnMobile={false}>
        <GridItem key="a" colSpan={3}>
          A
        </GridItem>
        <GridItem key="b">B</GridItem>
      </Grid>,
    );
    expect(
      screen
        .getByText("A")
        .style.getPropertyValue("--_zui-grid-item-column-end-base"),
    ).toBe("span 1");
    expect(screen.getByText("B")).toBeInTheDocument();
  });
  it("supports raw children without cloning or filtering", () => {
    render(
      <Grid>
        <span>Raw</span>
        <GridItem>Managed</GridItem>
      </Grid>,
    );
    expect(screen.getByText("Raw")).not.toHaveAttribute("data-slot");
  });
  it("ignores out-of-root placement and warns only in development", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { rerender } = render(<GridItem colSpan={2}>Outside</GridItem>);
    expect(
      screen
        .getByText("Outside")
        .style.getPropertyValue("--_zui-grid-item-column-end-base"),
    ).toBe("");
    expect(warning).toHaveBeenCalledOnce();
    rerender(<GridItem colSpan={3}>Outside</GridItem>);
    expect(warning).toHaveBeenCalledOnce();
    vi.stubEnv("NODE_ENV", "production");
    rerender(<GridItem>Outside</GridItem>);
    expect(warning).toHaveBeenCalledOnce();
    vi.unstubAllEnvs();
    warning.mockRestore();
  });
  it("generates the same deterministic responsive contract during server rendering", () => {
    const element = (
      <Grid
        layout={{ base: { mode: "fixed", columns: 1 }, md: { mode: "auto" } }}
      >
        <GridItem>SSR</GridItem>
      </Grid>
    );
    expect(renderToString(element)).toContain(
      "--_zui-grid-columns-md:repeat(auto-fit",
    );
    expect(renderToString(element)).toContain("md:[grid-template-columns:");
  });
  it.each(Object.keys(zuiGridItemAppearances) as GridAppearance[])(
    "ships paired theme tokens for appearance %s",
    (appearance) => {
      render(
        <Grid>
          <GridItem appearance={appearance} padding="md">
            Surface
          </GridItem>
        </Grid>,
      );
      const item = screen.getByText("Surface");
      expect(item.className).toContain(`--zui-grid-${appearance}-`);
      expect(item.className).toContain("-dark,");
      expect(item.className).toContain("--zui-grid-item-padding-md");
    },
  );
  it("supports semantic list composition without axe violations", async () => {
    const { container } = render(
      <Grid as="ul" aria-label="Actions">
        <GridItem as="li">
          <a href="#profile">Profile</a>
        </GridItem>
        <GridItem as="li">
          <button>Save</button>
        </GridItem>
      </Grid>,
    );
    await assertNoAxeViolations(container);
  });

  it("leaves native keyboard focus and activation with the children", async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(
      <Grid>
        <GridItem>
          <a href="#account">Account</a>
        </GridItem>
        <GridItem>
          <button onClick={action}>Save</button>
        </GridItem>
        <GridItem>
          <label>
            Name
            <input />
          </label>
        </GridItem>
      </Grid>,
    );
    await user.tab();
    expect(screen.getByRole("link")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(action).toHaveBeenCalledOnce();
    await user.tab();
    expect(screen.getByRole("textbox")).toHaveFocus();
    await user.keyboard("Ada");
    expect(screen.getByRole("textbox")).toHaveValue("Ada");
  });
});
