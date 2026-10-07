import { createRef, Fragment, useState } from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Toolbar,
  ToolbarButton,
  ToolbarToggle,
  ToolbarLink,
  ToolbarItem,
  ToolbarGroup,
  ToolbarSeparator,
} from ".";
import {
  zuiToolbarAppearances,
  zuiToolbarItemSizes,
} from "../../design-system/toolbar";
import { Button } from "../buttons";

function Actions(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar aria-label="Document actions" {...props}>
      <ToolbarButton>Save</ToolbarButton>
      <ToolbarButton>Export</ToolbarButton>
      <ToolbarButton>Print</ToolbarButton>
    </Toolbar>
  );
}
const buttons = () => screen.getAllByRole("button");

describe("Toolbar", () => {
  it("renders semantic defaults and one tab stop", () => {
    render(<Actions />);
    const root = screen.getByRole("toolbar", { name: "Document actions" });
    expect(root).toHaveAttribute("aria-orientation", "horizontal");
    expect(root).toHaveAttribute("data-slot", "toolbar");
    expect(buttons().map((b) => b.tabIndex)).toEqual([0, -1, -1]);
    expect(buttons()[0]).toHaveAttribute("type", "button");
  });
  it("preserves aria-labelledby, aria-controls, refs and class overrides", () => {
    const root = createRef<HTMLDivElement>();
    const button = createRef<HTMLButtonElement>();
    render(
      <>
        <h2 id="name">Commands</h2>
        <Toolbar
          ref={root}
          aria-labelledby="name"
          aria-controls="editor"
          className="p-8"
        >
          <ToolbarButton ref={button} className="custom-action">
            Save
          </ToolbarButton>
        </Toolbar>
        <textarea id="editor" />
      </>,
    );
    expect(root.current).toBe(
      screen.getByRole("toolbar", { name: "Commands" }),
    );
    expect(root.current).toHaveAttribute("aria-controls", "editor");
    expect(root.current).toHaveClass("p-8");
    expect(button.current).toHaveClass("custom-action");
  });
  it("tabs into the first control and out of the whole toolbar", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Before</button>
        <Actions />
        <button>After</button>
      </>,
    );
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Export" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "After" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Export" })).toHaveFocus();
  });
  it("moves in DOM order through groups, links, and separators", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Commands">
        <ToolbarGroup aria-label="Editing">
          <ToolbarButton>Cut</ToolbarButton>
          <ToolbarButton>Copy</ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarLink href="#help">Help</ToolbarLink>
      </Toolbar>,
    );
    await user.tab();
    await user.keyboard("{ArrowRight}{ArrowRight}");
    expect(screen.getByRole("link", { name: "Help" })).toHaveFocus();
    expect(screen.getByRole("group", { name: "Editing" })).toBeVisible();
  });
  it.each([true, false])("supports looping=%s", async (loop) => {
    const user = userEvent.setup();
    render(<Actions loop={loop} />);
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(buttons()[loop ? 2 : 0]).toHaveFocus();
    await user.keyboard("{End}{ArrowRight}");
    expect(buttons()[loop ? 0 : 2]).toHaveFocus();
  });
  it("supports Home and End", async () => {
    const user = userEvent.setup();
    render(<Actions />);
    await user.tab();
    await user.keyboard("{End}");
    expect(buttons()[2]).toHaveFocus();
    await user.keyboard("{Home}");
    expect(buttons()[0]).toHaveFocus();
  });
  it("leaves perpendicular and modified arrow keys alone", () => {
    render(<Actions />);
    buttons()[0]!.focus();
    for (const props of [
      { key: "ArrowDown" },
      { key: "ArrowRight", ctrlKey: true },
      { key: "ArrowRight", altKey: true },
      { key: "ArrowRight", metaKey: true },
      { key: "ArrowRight", shiftKey: true },
    ]) {
      expect(fireEvent.keyDown(buttons()[0]!, props)).toBe(true);
      expect(buttons()[0]).toHaveFocus();
    }
  });
  it("supports vertical orientation", async () => {
    const user = userEvent.setup();
    render(<Actions orientation="vertical" />);
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(buttons()[1]).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    expect(buttons()[0]).toHaveFocus();
    expect(fireEvent.keyDown(buttons()[0]!, { key: "ArrowRight" })).toBe(true);
    expect(screen.getByRole("toolbar")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });
  it.each(["explicit", "inherited"])("supports %s RTL", async (mode) => {
    const user = userEvent.setup();
    render(
      <div dir={mode === "inherited" ? "rtl" : undefined}>
        <Actions dir={mode === "explicit" ? "rtl" : undefined} />
      </div>,
    );
    await user.tab();
    await user.keyboard("{ArrowLeft}");
    expect(buttons()[1]).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(buttons()[0]).toHaveFocus();
  });
  it("keeps vertical navigation independent of RTL", async () => {
    const user = userEvent.setup();
    render(<Actions dir="rtl" orientation="vertical" />);
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(buttons()[1]).toHaveFocus();
  });
  it("skips native and aria-disabled items", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions">
        <ToolbarButton disabled>Disabled</ToolbarButton>
        <ToolbarButton>Save</ToolbarButton>
        <ToolbarLink href="#help" disabled>
          Help
        </ToolbarLink>
        <ToolbarButton>Print</ToolbarButton>
      </Toolbar>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Print" })).toHaveFocus();
    expect(screen.getByRole("link")).toHaveAttribute("tabindex", "-1");
  });
  it("skips hidden, inert, and CSS-hidden ancestors", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Actions">
        <div hidden>
          <ToolbarButton>Hidden</ToolbarButton>
        </div>
        <div inert>
          <ToolbarButton>Inert</ToolbarButton>
        </div>
        <div style={{ display: "none" }}>
          <ToolbarButton>CSS hidden</ToolbarButton>
        </div>
        <ToolbarButton>Save</ToolbarButton>
        <ToolbarButton>Print</ToolbarButton>
      </Toolbar>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Print" })).toHaveFocus();
  });
  it("observes hidden and disabled changes in descendants", async () => {
    const { container } = render(<Actions />);
    const [first, second] = buttons();
    first!.setAttribute("hidden", "");
    await waitFor(() => expect(second).toHaveAttribute("tabindex", "0"));
    second!.setAttribute("disabled", "");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Print" })).toHaveAttribute(
        "tabindex",
        "0",
      ),
    );
    expect(
      container.querySelectorAll('[data-toolbar-item][tabindex="0"]'),
    ).toHaveLength(1);
  });
  it("updates tab stops when items are inserted, removed, or reordered", async () => {
    function Example({ values }: { values: string[] }) {
      return (
        <Toolbar aria-label="Dynamic">
          {values.map((v) => (
            <ToolbarButton key={v}>{v}</ToolbarButton>
          ))}
        </Toolbar>
      );
    }
    const { rerender } = render(<Example values={["Save", "Print"]} />);
    screen.getByRole("button", { name: "Print" }).focus();
    rerender(<Example values={["Export", "Print", "Save"]} />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Print" })).toHaveAttribute(
        "tabindex",
        "0",
      ),
    );
    rerender(<Example values={["Export", "Save"]} />);
    await waitFor(() =>
      expect(buttons().map((b) => b.tabIndex)).toEqual([0, -1]),
    );
  });
  it("focuses an available replacement when the focused item is disabled", async () => {
    render(<Actions />);
    buttons()[0]!.focus();
    buttons()[0]!.setAttribute("disabled", "");
    await waitFor(() => expect(buttons()[1]).toHaveFocus());
  });
  it("root disabled blocks actions, toggles, custom items and links", async () => {
    const change = vi.fn();
    const click = vi.fn();
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Disabled" disabled>
        <ToolbarButton onClick={click}>Save</ToolbarButton>
        <ToolbarToggle onPressedChange={change}>Bold</ToolbarToggle>
        <ToolbarLink href="#help" onClick={click}>
          Help
        </ToolbarLink>
        <ToolbarItem native={false}>
          <button onClick={click}>Custom</button>
        </ToolbarItem>
      </Toolbar>,
    );
    expect(buttons()[0]).toBeDisabled();
    await user.click(screen.getByRole("link"));
    fireEvent.click(buttons()[2]!);
    fireEvent.click(buttons()[1]!);
    expect(click).not.toHaveBeenCalled();
    expect(change).not.toHaveBeenCalled();
    expect(screen.getByRole("toolbar")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByRole("link")).toHaveAttribute("tabindex", "-1");
  });
  it("removes disabled link targets and restores them when enabled", () => {
    const { rerender } = render(
      <Toolbar aria-label="Links">
        <ToolbarLink href="#help" disabled>
          Help
        </ToolbarLink>
      </Toolbar>,
    );
    expect(screen.getByRole("link")).not.toHaveAttribute("href");
    rerender(
      <Toolbar aria-label="Links">
        <ToolbarLink href="#help">Help</ToolbarLink>
      </Toolbar>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "#help");
  });
  it("handles empty and fully disabled toolbars without adding a tab stop", () => {
    const { rerender, container } = render(<Toolbar aria-label="Empty" />);
    expect(screen.getByRole("toolbar")).not.toHaveAttribute("tabindex");
    rerender(
      <Toolbar aria-label="Disabled">
        <ToolbarButton disabled>Save</ToolbarButton>
      </Toolbar>,
    );
    expect(container.querySelectorAll('[tabindex="0"]')).toHaveLength(0);
  });
  it("does not hijack nested toolbar navigation", async () => {
    const user = userEvent.setup();
    render(
      <Toolbar aria-label="Outer">
        <ToolbarButton>Outer start</ToolbarButton>
        <Toolbar aria-label="Inner">
          <ToolbarButton>Inner start</ToolbarButton>
          <ToolbarButton>Inner end</ToolbarButton>
        </Toolbar>
        <ToolbarButton>Outer end</ToolbarButton>
      </Toolbar>,
    );
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: "Outer end" })).toHaveFocus();
    const inner = within(
      screen.getByRole("toolbar", { name: "Inner" }),
    ).getAllByRole("button");
    inner[0]!.focus();
    await user.keyboard("{ArrowRight}");
    expect(inner[1]).toHaveFocus();
  });
  it("respects parent and child prevented keyboard handlers", () => {
    const parent = vi.fn((e) => e.preventDefault());
    render(<Actions onKeyDown={parent} />);
    buttons()[0]!.focus();
    fireEvent.keyDown(buttons()[0]!, { key: "ArrowRight" });
    expect(parent).toHaveBeenCalledOnce();
    expect(buttons()[0]).toHaveFocus();
  });
  it("allows a composed popup trigger to reserve keyboard events", () => {
    render(
      <Toolbar aria-label="Menus">
        <ToolbarItem>
          <button onKeyDown={(e) => e.preventDefault()}>Menu</button>
        </ToolbarItem>
        <ToolbarButton>Save</ToolbarButton>
      </Toolbar>,
    );
    buttons()[0]!.focus();
    fireEvent.keyDown(buttons()[0]!, { key: "ArrowRight" });
    expect(buttons()[0]).toHaveFocus();
  });
  it("leaves popup contents and native editing keys alone", () => {
    render(
      <Toolbar aria-label="Mixed">
        <ToolbarItem native={false}>
          <input aria-label="Query" />
        </ToolbarItem>
        <div role="menu">
          <button role="menuitem">Popup action</button>
        </div>
        <ToolbarButton>Save</ToolbarButton>
      </Toolbar>,
    );
    const input = screen.getByRole("textbox");
    input.focus();
    expect(fireEvent.keyDown(input, { key: "Home" })).toBe(true);
    const menuItem = screen.getByRole("menuitem");
    menuItem.focus();
    expect(fireEvent.keyDown(menuItem, { key: "ArrowRight" })).toBe(true);
    expect(menuItem).toHaveFocus();
  });
  it("toggles uncontrolled state with click, Enter and Space", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Toolbar aria-label="Formatting">
        <ToolbarToggle onPressedChange={change}>Bold</ToolbarToggle>
      </Toolbar>,
    );
    await user.tab();
    expect(buttons()[0]).toHaveAttribute("aria-pressed", "false");
    await user.keyboard(" ");
    expect(buttons()[0]).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{Enter}");
    expect(buttons()[0]).toHaveAttribute("aria-pressed", "false");
    await user.click(buttons()[0]!);
    expect(change.mock.calls).toEqual([[true], [false], [true]]);
  });
  it("supports defaultPressed and controlled state without changing on navigation", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(
      <Toolbar aria-label="Formatting">
        <ToolbarToggle defaultPressed>Bold</ToolbarToggle>
        <ToolbarToggle pressed={false} onPressedChange={change}>
          Italic
        </ToolbarToggle>
      </Toolbar>,
    );
    await user.tab();
    await user.keyboard("{ArrowRight}");
    expect(change).not.toHaveBeenCalled();
    expect(buttons()[0]).toHaveAttribute("aria-pressed", "true");
    await user.keyboard(" ");
    expect(change).toHaveBeenCalledWith(true);
    expect(buttons()[1]).toHaveAttribute("aria-pressed", "false");
    rerender(
      <Toolbar aria-label="Formatting">
        <ToolbarToggle>Bold</ToolbarToggle>
        <ToolbarToggle pressed onPressedChange={change}>
          Italic
        </ToolbarToggle>
      </Toolbar>,
    );
    expect(buttons()[1]).toHaveAttribute("aria-pressed", "true");
  });
  it("lets a consumer prevent a toggle change", async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    render(
      <Toolbar aria-label="Format">
        <ToolbarToggle
          onClick={(e) => e.preventDefault()}
          onPressedChange={change}
        >
          Bold
        </ToolbarToggle>
      </Toolbar>,
    );
    await user.click(buttons()[0]!);
    expect(change).not.toHaveBeenCalled();
    expect(buttons()[0]).toHaveAttribute("aria-pressed", "false");
  });
  it("does not submit a surrounding form by default", async () => {
    const user = userEvent.setup();
    const submit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={submit}>
        <Toolbar aria-label="Actions">
          <ToolbarButton type={undefined}>Save</ToolbarButton>
          <ToolbarToggle type={undefined}>Bold</ToolbarToggle>
        </Toolbar>
      </form>,
    );
    await user.click(buttons()[0]!);
    await user.click(buttons()[1]!);
    expect(submit).not.toHaveBeenCalled();
  });
  it("preserves explicit native submit semantics", async () => {
    const user = userEvent.setup();
    const submit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={submit}>
        <Toolbar aria-label="Submit">
          <ToolbarButton type="submit">Save</ToolbarButton>
        </Toolbar>
      </form>,
    );
    await user.click(buttons()[0]!);
    expect(submit).toHaveBeenCalledOnce();
  });
  it("preserves child and wrapper click handlers and refs when composing Button", async () => {
    const user = userEvent.setup();
    const childClick = vi.fn();
    const wrapperClick = vi.fn();
    const childRef = createRef<HTMLButtonElement>();
    const wrapperRef = createRef<HTMLElement>();
    const { unmount } = render(
      <Toolbar aria-label="Composed">
        <ToolbarItem
          ref={wrapperRef}
          onClick={wrapperClick}
          className="custom-wrapper"
        >
          <Button ref={childRef} onClick={childClick} className="child-style">
            Save
          </Button>
        </ToolbarItem>
      </Toolbar>,
    );
    await user.click(buttons()[0]!);
    expect(childClick).toHaveBeenCalledOnce();
    expect(wrapperClick).toHaveBeenCalledOnce();
    expect(childRef.current).toBe(buttons()[0]);
    expect(wrapperRef.current).toBe(buttons()[0]);
    expect(buttons()[0]).toHaveClass("child-style", "custom-wrapper");
    unmount();
    expect(childRef.current).toBeNull();
    expect(wrapperRef.current).toBeNull();
  });
  it("respects a prevented child click", async () => {
    const user = userEvent.setup();
    const click = vi.fn();
    render(
      <Toolbar aria-label="Composed">
        <ToolbarItem onClick={click}>
          <button onClick={(e) => e.preventDefault()}>Save</button>
        </ToolbarItem>
      </Toolbar>,
    );
    await user.click(buttons()[0]!);
    expect(click).not.toHaveBeenCalled();
  });
  it("supports callback-ref cleanup for composed controls", () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { unmount } = render(
      <Toolbar aria-label="Refs">
        <ToolbarItem>
          <button ref={ref}>Save</button>
        </ToolbarItem>
      </Toolbar>,
    );
    expect(ref).toHaveBeenCalledWith(buttons()[0]);
    unmount();
    expect(cleanup).toHaveBeenCalledOnce();
  });
  it("preserves numeric children and icon-only accessible names", () => {
    render(
      <Toolbar aria-label="Content">
        <ToolbarButton>{0}</ToolbarButton>
        <ToolbarButton aria-label="Save">
          <span aria-hidden>★</span>
        </ToolbarButton>
      </Toolbar>,
    );
    expect(screen.getByRole("button", { name: "0" })).toHaveTextContent("0");
    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
  });
  it.each(["horizontal", "vertical"] as const)(
    "renders appropriate separators for %s orientation",
    (orientation) => {
      render(
        <Toolbar aria-label="Actions" orientation={orientation}>
          <ToolbarSeparator />
          <ToolbarSeparator decorative={false} />
        </Toolbar>,
      );
      expect(screen.getByRole("separator")).toHaveAttribute(
        "aria-orientation",
        orientation === "horizontal" ? "vertical" : "horizontal",
      );
      expect(
        document.querySelector('[data-slot="toolbar-separator"]'),
      ).toHaveAttribute("aria-hidden", "true");
    },
  );
  it.each(
    Object.keys(
      zuiToolbarAppearances,
    ) as (keyof typeof zuiToolbarAppearances)[],
  )("supports %s appearance", (appearance) => {
    render(<Actions appearance={appearance} />);
    const root = screen.getByRole("toolbar");
    for (const token of zuiToolbarAppearances[appearance].match(
      /--zui-toolbar-[\w-]+/g,
    )!)
      expect(root.className).toContain(token);
  });
  it.each(
    Object.keys(zuiToolbarItemSizes) as (keyof typeof zuiToolbarItemSizes)[],
  )("inherits %s sizing", (size) => {
    render(<Actions size={size} />);
    expect(buttons()[0]!.className).toContain(
      `--zui-toolbar-item-height-${size}`,
    );
  });
  it("supports wrapping and orientation changes", () => {
    const { rerender } = render(<Actions wrap />);
    expect(screen.getByRole("toolbar")).toHaveClass("flex-wrap");
    rerender(<Actions orientation="vertical" wrap={false} />);
    expect(screen.getByRole("toolbar")).toHaveClass("flex-col", "flex-nowrap");
  });
  it("retains one tab stop through unrelated parent renders", async () => {
    function Example() {
      const [n, setN] = useState(0);
      return (
        <>
          <button onClick={() => setN(n + 1)}>Render {n}</button>
          <Actions />
        </>
      );
    }
    const user = userEvent.setup();
    render(<Example />);
    screen.getByRole("button", { name: "Export" }).focus();
    await user.click(screen.getByRole("button", { name: "Render 0" }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Export" })).toHaveAttribute(
        "tabindex",
        "0",
      ),
    );
  });
  it("requires Toolbar context and rejects fragmented item composition", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => render(<ToolbarButton>Outside</ToolbarButton>)).toThrow(
      "inside Toolbar",
    );
    expect(() =>
      render(
        <Toolbar aria-label="Invalid">
          <ToolbarItem>
            <Fragment>
              <button>A</button>
              <button>B</button>
            </Fragment>
          </ToolbarItem>
        </Toolbar>,
      ),
    ).toThrow("one focusable element");
    consoleError.mockRestore();
  });
});
