import { createRef, useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";
import { ResizablePanels, ResizablePanel, ResizableHandle } from "./index";
import { zuiResizablePanelsPanelAppearances } from "../../design-system/resizable-panels";
import { assertNoAxeViolations } from "../../test-utils/axe";
import type { ResizablePanelsAppearance, ResizablePanelsProps } from "./types";

function Example(
  props: ResizablePanelsProps & {
    collapsible?: boolean;
    handleDisabled?: boolean;
  } = {},
) {
  const { collapsible, handleDisabled, ...root } = props;
  return (
    <ResizablePanels data-testid="root" {...root}>
      <ResizablePanel id="left" minSize={20} collapsible={collapsible}>
        0<button>Pane action</button>
      </ResizablePanel>
      <ResizableHandle aria-label="Left pane size" disabled={handleDisabled} />
      <ResizablePanel id="right" minSize={20}>
        Right
      </ResizablePanel>
    </ResizablePanels>
  );
}
const handle = () => screen.getByRole("separator");
const size = () => Number(handle().getAttribute("aria-valuenow"));
function geometry() {
  const root = screen.getByTestId("root");
  vi.spyOn(root, "getBoundingClientRect").mockReturnValue({
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    right: 1020,
    bottom: 1020,
    width: 1020,
    height: 1020,
    toJSON: () => ({}),
  });
  vi.spyOn(handle(), "getBoundingClientRect").mockReturnValue({
    x: 500,
    y: 500,
    left: 500,
    top: 500,
    right: 520,
    bottom: 520,
    width: 20,
    height: 20,
    toJSON: () => ({}),
  });
  Object.defineProperty(handle(), "setPointerCapture", {
    configurable: true,
    value: vi.fn(),
  });
}
// jsdom has no PointerEvent implementation; preserve the pointer identity/coordinates.
function pointer(type: string, values: Record<string, unknown> = {}) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  for (const [key, value] of Object.entries({
    pointerId: 1,
    button: 0,
    isPrimary: true,
    clientX: 500,
    clientY: 500,
    ...values,
  }))
    Object.defineProperty(event, key, { value });
  fireEvent(handle(), event);
}

describe("ResizablePanels", () => {
  it("renders defaults, native content, and a named separator controlling its primary pane", () => {
    render(<Example />);
    expect(handle()).toHaveAttribute("aria-controls", "left");
    expect(handle()).toHaveAttribute("aria-orientation", "vertical");
    expect(handle()).toHaveAttribute("aria-valuemin", "20");
    expect(handle()).toHaveAttribute("aria-valuemax", "80");
    expect(size()).toBe(50);
    expect(screen.getByRole("button")).toHaveTextContent("Pane action");
    expect(document.getElementById("left")).toHaveTextContent("0");
    expect(handle()).toHaveAttribute("data-slot", "resizable-handle");
  });
  it("renders empty and single-panel groups without unnecessary handles", () => {
    const { rerender } = render(<ResizablePanels data-testid="empty" />);
    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
    rerender(
      <ResizablePanels>
        <ResizablePanel id="solo">Solo</ResizablePanel>
      </ResizablePanels>,
    );
    expect(document.getElementById("solo")).toHaveAttribute("data-size", "100");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
  it("preserves native refs, styles, classes, and custom zero-valued handle content", () => {
    const root = createRef<HTMLDivElement>(),
      pane = createRef<HTMLDivElement>(),
      grip = createRef<HTMLDivElement>();
    render(
      <ResizablePanels
        ref={root}
        className="custom-root"
        style={{ height: 300 }}
      >
        <ResizablePanel
          id="a"
          ref={pane}
          className="custom-pane"
          style={{ color: "red" }}
        >
          A
        </ResizablePanel>
        <ResizableHandle ref={grip} className="custom-handle">
          {0}
        </ResizableHandle>
        <ResizablePanel id="b">B</ResizablePanel>
      </ResizablePanels>,
    );
    expect(root.current).toHaveClass("custom-root");
    expect(root.current).toHaveStyle({ height: "300px" });
    expect(pane.current).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(grip.current).toHaveClass("custom-handle");
    expect(grip.current).toHaveTextContent("0");
  });
  it("supports fragments and rejects invalid composition and out-of-root slots", () => {
    render(
      <ResizablePanels>
        <>
          <ResizablePanel id="a">A</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel id="b">B</ResizablePanel>
        </>
      </ResizablePanels>,
    );
    expect(size()).toBe(50);
    expect(() => render(<ResizablePanel id="outside" />)).toThrow(
      "direct children",
    );
    expect(() =>
      render(
        <ResizablePanels>
          <span>Invalid</span>
        </ResizablePanels>,
      ),
    ).toThrow("Panel, Handle, Panel");
  });
  it("resizes with arrows, accelerated steps, Home/End, and reports completed keyboard changes", () => {
    const change = vi.fn(),
      end = vi.fn();
    render(
      <Example
        defaultSizes={[30, 70]}
        onSizesChange={change}
        onResizeEnd={end}
      />,
    );
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(32);
    fireEvent.keyDown(handle(), { key: "ArrowLeft", shiftKey: true });
    expect(size()).toBe(20);
    fireEvent.keyDown(handle(), { key: "End" });
    expect(size()).toBe(80);
    fireEvent.keyDown(handle(), { key: "Home" });
    expect(size()).toBe(20);
    expect(change).toHaveBeenLastCalledWith([20, 80]);
    expect(end).toHaveBeenLastCalledWith([20, 80]);
  });
  it("maps vertical keys and separator orientation correctly", () => {
    render(<Example orientation="vertical" keyboardStep={5} />);
    expect(handle()).toHaveAttribute("aria-orientation", "horizontal");
    fireEvent.keyDown(handle(), { key: "ArrowDown" });
    expect(size()).toBe(55);
    fireEvent.keyDown(handle(), { key: "ArrowUp" });
    expect(size()).toBe(50);
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(50);
  });
  it("reverses horizontal movement in RTL", () => {
    render(<Example style={{ direction: "rtl" }} />);
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(48);
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    pointer("pointerup");
    expect(size()).toBe(38);
  });
  it("uses a safe keyboard step and ignores unrelated or modified keys", () => {
    render(<Example keyboardStep={NaN} />);
    fireEvent.keyDown(handle(), { key: "ArrowRight", ctrlKey: true });
    fireEvent.keyDown(handle(), { key: "Enter" });
    fireEvent.keyDown(handle(), { key: "x" });
    expect(size()).toBe(50);
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(52);
  });
  it("toggles collapse, makes zero-width content inert, and restores the previous size", () => {
    render(
      <ResizablePanels defaultSizes={[35, 65]}>
        <ResizablePanel id="left" minSize={20} collapsible>
          Left
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel id="right" minSize={0}>
          Right
        </ResizablePanel>
      </ResizablePanels>,
    );
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(size()).toBe(0);
    expect(document.getElementById("left")).toHaveAttribute("inert");
    expect(document.getElementById("left")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(size()).toBe(35);
    expect(document.getElementById("left")).not.toHaveAttribute("inert");
  });
  it("does not resize on an infeasible collapse toggle", () => {
    const change = vi.fn();
    render(
      <ResizablePanels onSizesChange={change}>
        <ResizablePanel id="a" collapsible minSize={20} />
        <ResizableHandle />
        <ResizablePanel id="b" maxSize={80} />
      </ResizablePanels>,
    );
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(size()).toBe(50);
    expect(change).not.toHaveBeenCalled();
  });
  it.each([
    {
      orientation: "horizontal",
      dir: "ltr",
      collapsedSize: 0,
      expand: "ArrowRight",
      shrink: "ArrowLeft",
    },
    {
      orientation: "horizontal",
      dir: "rtl",
      collapsedSize: 0,
      expand: "ArrowLeft",
      shrink: "ArrowRight",
    },
    {
      orientation: "vertical",
      dir: "ltr",
      collapsedSize: 5,
      expand: "ArrowDown",
      shrink: "ArrowUp",
    },
  ] as const)(
    "crosses collapsed gaps on the first keypress in $orientation/$dir",
    ({ orientation, dir, collapsedSize, expand, shrink }) => {
      render(
        <ResizablePanels
          orientation={orientation}
          dir={dir}
          style={{ direction: dir }}
          defaultSizes={[collapsedSize, 100 - collapsedSize]}
        >
          <ResizablePanel
            id="a"
            collapsible
            minSize={20}
            collapsedSize={collapsedSize}
          />
          <ResizableHandle />
          <ResizablePanel id="b" minSize={0} />
        </ResizablePanels>,
      );
      fireEvent.keyDown(handle(), { key: expand });
      expect(size()).toBe(20);
      fireEvent.keyDown(handle(), { key: shrink });
      expect(size()).toBe(collapsedSize);
    },
  );
  it("opens and collapses the trailing pane with directional arrow steps", () => {
    render(
      <ResizablePanels defaultSizes={[80, 20]}>
        <ResizablePanel id="a" minSize={0} />
        <ResizableHandle />
        <ResizablePanel id="b" collapsible minSize={20} collapsedSize={5} />
      </ResizablePanels>,
    );
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(95);
    fireEvent.keyDown(handle(), { key: "ArrowLeft" });
    expect(size()).toBe(80);
  });
  it("remembers accepted controlled sizes when a consumer collapses externally", () => {
    const change = vi.fn();
    const controlled = (sizes: number[], minSize = 20) => (
      <ResizablePanels sizes={sizes} onSizesChange={change}>
        <ResizablePanel id="a" minSize={minSize} collapsible />
        <ResizableHandle />
        <ResizablePanel id="b" minSize={20} />
      </ResizablePanels>
    );
    const { rerender } = render(controlled([37, 63]));
    rerender(controlled([0, 100]));
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(change).toHaveBeenLastCalledWith([37, 63]);
    expect(size()).toBe(0);
    rerender(controlled([0, 100], 45));
    fireEvent.keyDown(handle(), { key: "Enter" });
    expect(change).toHaveBeenLastCalledWith([45, 55]);
    expect(size()).toBe(0);
  });
  it.each(["root", "handle"])("disables %s resize input", (target) => {
    render(
      <Example
        disabled={target === "root"}
        handleDisabled={target === "handle"}
      />,
    );
    expect(handle()).toHaveAttribute("aria-disabled", "true");
    expect(handle()).toHaveAttribute("tabindex", "-1");
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    expect(size()).toBe(50);
  });
  it("supports controlled updates and parent rejection without mutating the controlled value", () => {
    const change = vi.fn();
    const { rerender } = render(
      <Example sizes={[40, 60]} onSizesChange={change} />,
    );
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(change).toHaveBeenLastCalledWith([42, 58]);
    expect(size()).toBe(40);
    rerender(<Example sizes={[42, 58]} onSizesChange={change} />);
    expect(size()).toBe(42);
  });
  it("works with a parent updating controlled sizes immediately", () => {
    function Controlled() {
      const [sizes, setSizes] = useState([30, 70]);
      return <Example sizes={sizes} onSizesChange={setSizes} />;
    }
    render(<Controlled />);
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    expect(size()).toBe(32);
  });
  it("measures pane space excluding handles and commits a captured pointer gesture", () => {
    const end = vi.fn();
    render(<Example onResizeEnd={end} />);
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    expect(size()).toBe(60);
    expect(screen.getByTestId("root")).toHaveAttribute("data-resizing", "true");
    pointer("pointerup");
    expect(end).toHaveBeenCalledWith([60, 40]);
    expect(screen.getByTestId("root")).not.toHaveAttribute("data-resizing");
  });
  it("supports touch coordinates and vertical pointer resizing", () => {
    render(<Example orientation="vertical" />);
    geometry();
    pointer("pointerdown", { pointerType: "touch" });
    pointer("pointermove", { clientY: 600, pointerType: "touch" });
    expect(size()).toBe(60);
    pointer("pointerup");
  });
  it.each(["horizontal", "vertical"] as const)(
    "excludes %s root padding and asymmetric borders from drag geometry",
    (orientation) => {
      const horizontal = orientation === "horizontal";
      render(
        <Example
          orientation={orientation}
          style={
            horizontal
              ? {
                  paddingLeft: 50,
                  paddingRight: 50,
                  borderLeftWidth: 10,
                  borderRightWidth: 20,
                  borderStyle: "solid",
                }
              : {
                  paddingTop: 10,
                  paddingBottom: 30,
                  borderTopWidth: 3,
                  borderBottomWidth: 7,
                  borderStyle: "solid",
                }
          }
        />,
      );
      geometry();
      pointer("pointerdown");
      pointer("pointermove", horizontal ? { clientX: 587 } : { clientY: 595 });
      expect(size()).toBe(60);
      pointer("pointerup");
    },
  );
  it.each(["pointercancel", "lostpointercapture"])(
    "rolls back on %s without a completion callback",
    (type) => {
      const end = vi.fn();
      render(<Example onResizeEnd={end} />);
      geometry();
      pointer("pointerdown");
      pointer("pointermove", { clientX: 600 });
      expect(size()).toBe(60);
      pointer(type);
      expect(size()).toBe(50);
      expect(end).not.toHaveBeenCalled();
    },
  );
  it("ignores secondary buttons, non-primary pointers, foreign pointer IDs, and zero-sized containers", () => {
    render(<Example />);
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    expect(size()).toBe(50);
    geometry();
    pointer("pointerdown", { button: 2 });
    pointer("pointermove", { clientX: 600 });
    expect(size()).toBe(50);
    pointer("pointerdown", { isPrimary: false });
    pointer("pointermove", { clientX: 600 });
    expect(size()).toBe(50);
    pointer("pointerdown");
    pointer("pointermove", { pointerId: 2, clientX: 600 });
    expect(size()).toBe(50);
    pointer("pointerup");
  });
  it("lets native event handlers prevent resizing", () => {
    const down = vi.fn((e: React.PointerEvent<HTMLDivElement>) =>
      e.preventDefault(),
    );
    const change = vi.fn(),
      end = vi.fn();
    render(
      <ResizablePanels
        data-testid="root"
        onSizesChange={change}
        onResizeEnd={end}
      >
        <ResizablePanel id="a" />
        <ResizableHandle
          onKeyDown={(e) => e.preventDefault()}
          onPointerDown={down}
        />
        <ResizablePanel id="b" />
      </ResizablePanels>,
    );
    fireEvent.keyDown(handle(), { key: "ArrowRight" });
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    pointer("pointerup");
    expect(down).toHaveBeenCalledOnce();
    expect(handle().setPointerCapture).not.toHaveBeenCalled();
    expect(change).not.toHaveBeenCalled();
    expect(end).not.toHaveBeenCalled();
    expect(size()).toBe(50);
  });
  it("keeps nested groups independent and preserves panel identities on reorder", () => {
    const { rerender } = render(
      <ResizablePanels defaultSizes={[30, 70]}>
        <ResizablePanel id="outer-a">
          <ResizablePanels>
            <ResizablePanel id="inner-a" />
            <ResizableHandle aria-label="Inner" />
            <ResizablePanel id="inner-b" />
          </ResizablePanels>
        </ResizablePanel>
        <ResizableHandle aria-label="Outer" />
        <ResizablePanel id="outer-b" />
      </ResizablePanels>,
    );
    fireEvent.keyDown(screen.getByRole("separator", { name: "Inner" }), {
      key: "ArrowRight",
    });
    expect(screen.getByRole("separator", { name: "Outer" })).toHaveAttribute(
      "aria-valuenow",
      "30",
    );
    rerender(
      <ResizablePanels>
        <ResizablePanel id="outer-b" />
        <ResizableHandle />
        <ResizablePanel id="outer-a" />
      </ResizablePanels>,
    );
    expect(size()).toBe(70);
  });
  it("stops a pointer gesture when orientation changes", () => {
    const end = vi.fn();
    const { rerender } = render(<Example onResizeEnd={end} />);
    geometry();
    pointer("pointerdown");
    rerender(<Example orientation="vertical" onResizeEnd={end} />);
    pointer("pointermove", { clientY: 600 });
    pointer("pointerup");
    expect(size()).toBe(50);
    expect(end).not.toHaveBeenCalled();
  });
  it("finishes with the last requested pointer position when a controlled parent rejects changes", () => {
    const end = vi.fn();
    render(<Example sizes={[50, 50]} onResizeEnd={end} />);
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    pointer("pointermove", { clientX: 500 });
    pointer("pointerup");
    expect(end).toHaveBeenLastCalledWith([50, 50]);
  });
  it("removes an active gesture on unmount without committing it", () => {
    const end = vi.fn();
    const { unmount } = render(<Example onResizeEnd={end} />);
    geometry();
    pointer("pointerdown");
    pointer("pointermove", { clientX: 600 });
    unmount();
    expect(end).not.toHaveBeenCalled();
  });
  it("produces deterministic SSR markup and retains native labels", () => {
    const element = <Example defaultSizes={[25, 75]} />;
    expect(renderToString(element)).toBe(renderToString(element));
    expect(renderToString(element)).toContain('aria-controls="left"');
  });
  it.each(
    Object.keys(
      zuiResizablePanelsPanelAppearances,
    ) as ResizablePanelsAppearance[],
  )("ships panel and handle theme pairs for %s", (appearance) => {
    render(
      <ResizablePanels>
        <ResizablePanel id="a" appearance={appearance} padding="lg">
          A
        </ResizablePanel>
        <ResizableHandle appearance={appearance} />
        <ResizablePanel id="b" />
      </ResizablePanels>,
    );
    expect(document.getElementById("a")?.className).toContain(
      `--zui-resizable-panels-panel-${appearance}-`,
    );
    expect(handle().className).toContain(
      `--zui-resizable-panels-handle-${appearance}-`,
    );
    expect(handle().className).toContain("-dark,");
  });
  it("has accessible separator semantics without axe violations", async () => {
    const { container } = render(<Example />);
    await assertNoAxeViolations(container);
  });
});
