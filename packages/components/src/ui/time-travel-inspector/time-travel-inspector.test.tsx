import { createRef } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { zuiTimeTravelInspectorAppearances } from "../../design-system/time-travel-inspector";
import {
  TimeTravelInspector,
  createTimeTravelHistory,
  diffTimeTravelStates,
  resolveTimeTravelState,
} from "./index";
import type { TimeTravelSnapshot, TimeTravelValue } from "./types";

const captures = [
  {
    id: "start",
    timestamp: 0,
    label: "Cart opened",
    state: { total: 0, items: [] },
  },
  {
    id: "add",
    timestamp: 100,
    label: "Item added",
    state: { total: 80, items: ["Bag"] },
  },
  {
    id: "discount",
    timestamp: 200,
    label: "Discount applied",
    state: { total: 60, items: ["Bag"] },
  },
  {
    id: "paid",
    timestamp: 300,
    label: "Payment received",
    state: { total: 60, items: ["Bag"], paid: true },
  },
];
const history = createTimeTravelHistory(captures, 2);
const statePanel = (container: HTMLElement) =>
  container.querySelector('[data-slot="time-travel-inspector-state"]')!;

describe("Time travel history", () => {
  it("stores periodic checkpoints and only incremental changes between them", () => {
    expect(history.map((event) => event.kind)).toEqual([
      "checkpoint",
      "delta",
      "checkpoint",
      "delta",
    ]);
    expect(history[3]).toMatchObject({
      changes: [{ op: "set", path: ["paid"], value: true }],
    });
    captures.forEach((capture, index) =>
      expect(resolveTimeTravelState(history, index)).toEqual(capture.state),
    );
  });
  it("replays both backward and forward without changing stored history", () => {
    const original = JSON.stringify(history);
    for (const index of [3, 0, 2, 1, 3])
      expect(resolveTimeTravelState(history, index)).toEqual(
        captures[index]!.state,
      );
    expect(JSON.stringify(history)).toBe(original);
  });
  it("does not replay deltas before the nearest checkpoint", () => {
    const events: TimeTravelSnapshot[] = [...history];
    events[1] = {
      id: "unused",
      timestamp: 1,
      label: "Unused",
      kind: "delta",
      get changes() {
        throw new Error("Should not replay old delta");
      },
    };
    expect(resolveTimeTravelState(events, 3)).toEqual(captures[3]!.state);
  });
  it("detaches stored captures and reconstructed states from caller mutations", () => {
    const input = { nested: { count: 1 } };
    const stored = createTimeTravelHistory([
      { id: "a", timestamp: 0, label: "A", state: input },
    ]);
    input.nested.count = 9;
    const restored = resolveTimeTravelState(stored, 0) as typeof input;
    restored.nested.count = 20;
    expect(resolveTimeTravelState(stored, 0)).toEqual({ nested: { count: 1 } });
  });
  it("preserves literal path keys, removal, null, false, zero and empty arrays", () => {
    const states: TimeTravelValue[] = [
      { "a.b": { "x/y": 1, remove: true }, list: [1, 2], flag: true },
      { "a.b": { "x/y": 0 }, list: [], flag: false, nil: null },
      null,
      0,
      false,
      [],
    ];
    const events = createTimeTravelHistory(
      states.map((state, index) => ({
        id: String(index),
        timestamp: index,
        label: "Event",
        state,
      })),
      10,
    );
    states.forEach((state, index) =>
      expect(resolveTimeTravelState(events, index)).toEqual(state),
    );
  });
  it("handles prototype-named JSON keys without changing object prototypes", () => {
    const state = JSON.parse('{"__proto__":{"polluted":true},"constructor":2}');
    const events = createTimeTravelHistory([
      { id: "a", timestamp: 0, label: "A", state: {} },
      { id: "b", timestamp: 1, label: "B", state },
      {
        id: "c",
        timestamp: 2,
        label: "C",
        state: JSON.parse('{"__proto__":{"polluted":false}}'),
      },
    ]);
    expect(resolveTimeTravelState(events, 1)).toEqual(state);
    expect(resolveTimeTravelState(events, 2)).toEqual(
      JSON.parse('{"__proto__":{"polluted":false}}'),
    );
    expect(Object.prototype).not.toHaveProperty("polluted");
  });
  it("treats equal arrays and object key reordering as unchanged", () => {
    expect(diffTimeTravelStates([{ a: 1, b: 2 }], [{ b: 2, a: 1 }])).toEqual(
      [],
    );
  });
  it("reports additions, removals and root replacements unambiguously", () => {
    expect(diffTimeTravelStates({ a: null }, { b: 0 })).toEqual([
      { path: ["a"], type: "removed", before: null },
      { path: ["b"], type: "added", after: 0 },
    ]);
    expect(diffTimeTravelStates(null, false)).toEqual([
      { path: [], type: "changed", before: null, after: false },
    ]);
  });
  it("rejects invalid checkpoint intervals", () => {
    for (const interval of [0, -1, 1.5, Infinity, NaN])
      expect(() => createTimeTravelHistory(captures, interval)).toThrow(
        RangeError,
      );
  });
  it("rejects duplicate IDs, descending and nonfinite timestamps", () => {
    expect(() => createTimeTravelHistory([captures[0]!, captures[0]!])).toThrow(
      /unique/,
    );
    expect(() => createTimeTravelHistory([captures[1]!, captures[0]!])).toThrow(
      /nondecreasing/,
    );
    expect(() =>
      createTimeTravelHistory([{ ...captures[0]!, timestamp: NaN }]),
    ).toThrow(/finite/);
  });
  it("allows equal timestamps with distinct IDs", () => {
    expect(
      createTimeTravelHistory([
        { ...captures[0]! },
        { ...captures[1]!, timestamp: 0 },
      ]),
    ).toHaveLength(2);
  });
  it("rejects out-of-range seeks and history without a checkpoint", () => {
    for (const index of [-1, 4, 0.5, NaN])
      expect(() => resolveTimeTravelState(history, index)).toThrow(RangeError);
    expect(() => resolveTimeTravelState([history[1]!], 0)).toThrow(
      /checkpoint/,
    );
  });
  it("rejects patch paths through absent parents and arrays", () => {
    for (const path of [
      ["missing", "child"],
      ["items", "0"],
    ]) {
      expect(() =>
        resolveTimeTravelState(
          [
            history[0]!,
            {
              id: "b",
              timestamp: 1,
              label: "B",
              kind: "delta",
              changes: [{ op: "set", path, value: 1 }],
            },
          ],
          1,
        ),
      ).toThrow(/parent|objects/);
    }
  });
});

describe("TimeTravelInspector", () => {
  it("defaults to the latest event and compares with the previous event", () => {
    const { container } = render(<TimeTravelInspector snapshots={history} />);
    expect(screen.getByRole("slider", { name: "Snapshot" })).toHaveValue("3");
    expect(statePanel(container)).toHaveTextContent('"paid": true');
    expect(screen.getByText("/paid · added")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next event" })).toBeDisabled();
  });
  it("synchronizes the scrubber, state, diff, renderer and open callback", () => {
    const onOpen = vi.fn();
    const onChange = vi.fn();
    const { container } = render(
      <TimeTravelInspector
        snapshots={history}
        onSelectedIdChange={onChange}
        onOpenState={onOpen}
        renderPreview={({ snapshot, state }) => (
          <div data-testid="preview">
            {snapshot.id}: {JSON.stringify(state)}
          </div>
        )}
      />,
    );
    fireEvent.change(screen.getByRole("slider"), { target: { value: "1" } });
    expect(onChange).toHaveBeenCalledWith("add");
    expect(statePanel(container)).toHaveTextContent('"total": 80');
    expect(screen.getByTestId("preview")).toHaveTextContent('add: {"total":80');
    expect(screen.getByText("/total · changed")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Open historical state" }),
    );
    expect(onOpen).toHaveBeenCalledWith(
      expect.objectContaining({ index: 1, state: captures[1]!.state }),
    );
  });
  it("supports zero timestamps, one event, and numeric renderer output", () => {
    render(
      <TimeTravelInspector snapshots={[history[0]!]} renderPreview={() => 0} />,
    );
    expect(screen.getByRole("slider")).toBeDisabled();
    expect(
      screen.getByRole("heading", { name: "State at 0 ms" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Visual preview" }),
    ).toHaveTextContent("0");
    expect(
      screen.getByRole("button", { name: "Previous event" }),
    ).toBeDisabled();
  });
  it("supports empty histories and preserves a numeric empty state", () => {
    const { rerender } = render(<TimeTravelInspector snapshots={[]} />);
    expect(screen.getByText("No snapshots recorded yet.")).toBeInTheDocument();
    rerender(<TimeTravelInspector snapshots={[]} emptyState={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.queryByRole("slider")).not.toBeInTheDocument();
  });
  it("retains controlled selection until the parent supplies the new value", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <TimeTravelInspector
        snapshots={history}
        selectedId="start"
        onSelectedIdChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next event" }));
    expect(onChange).toHaveBeenCalledWith("add");
    expect(screen.getByRole("slider")).toHaveValue("0");
    rerender(<TimeTravelInspector snapshots={history} selectedId="add" />);
    expect(screen.getByRole("slider")).toHaveValue("1");
  });
  it("compares arbitrary timestamps in either direction and supports identical endpoints", () => {
    render(<TimeTravelInspector snapshots={history} defaultSelectedId="add" />);
    fireEvent.change(screen.getByRole("combobox", { name: "Compare from" }), {
      target: { value: "event:paid" },
    });
    expect(screen.getByText("/paid · removed")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("combobox", { name: "Compare from" }), {
      target: { value: "event:add" },
    });
    expect(
      screen.getByText("No state changes between these events."),
    ).toBeInTheDocument();
  });
  it("supports controlled comparisons and emits null for automatic comparison", () => {
    const onChange = vi.fn();
    render(
      <TimeTravelInspector
        snapshots={history}
        comparisonId="start"
        onComparisonIdChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole("combobox", { name: "Compare from" }), {
      target: { value: "previous" },
    });
    expect(onChange).toHaveBeenCalledWith(null);
    expect(screen.getByRole("combobox", { name: "Compare from" })).toHaveValue(
      "event:start",
    );
  });
  it("bookmarks, jumps to, and removes an event", () => {
    const onChange = vi.fn();
    render(
      <TimeTravelInspector
        snapshots={history}
        defaultSelectedId="add"
        onBookmarksChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Bookmark event" }));
    expect(onChange).toHaveBeenLastCalledWith(["add"]);
    fireEvent.click(screen.getByRole("button", { name: "Next event" }));
    fireEvent.change(
      screen.getByRole("combobox", { name: "Jump to bookmark (1)" }),
      { target: { value: "add" } },
    );
    expect(screen.getByRole("slider")).toHaveValue("1");
    fireEvent.click(screen.getByRole("button", { name: "Bookmarked" }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
  it("supports controlled bookmarks and ignores absent or duplicate IDs", () => {
    const onChange = vi.fn();
    render(
      <TimeTravelInspector
        snapshots={history}
        bookmarks={["add", "add", "missing"]}
        defaultSelectedId="add"
        onBookmarksChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Bookmarked" }));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(screen.getByRole("button", { name: "Bookmarked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      within(
        screen.getByRole("combobox", { name: "Jump to bookmark (1)" }),
      ).getAllByRole("option"),
    ).toHaveLength(2);
  });
  it("preserves selection by ID across appends and falls back after removal", () => {
    const { rerender } = render(
      <TimeTravelInspector
        snapshots={history.slice(0, 2)}
        defaultSelectedId="add"
      />,
    );
    rerender(
      <TimeTravelInspector snapshots={history} defaultSelectedId="add" />,
    );
    expect(screen.getByRole("slider")).toHaveValue("1");
    rerender(
      <TimeTravelInspector snapshots={[history[0]!]} defaultSelectedId="add" />,
    );
    expect(screen.getByRole("slider")).toHaveValue("0");
  });
  it("supports keyboard activation of navigation and bookmark controls", async () => {
    const user = userEvent.setup();
    render(
      <TimeTravelInspector snapshots={history} defaultSelectedId="start" />,
    );
    screen.getByRole("button", { name: "Next event" }).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("slider")).toHaveValue("1");
    screen.getByRole("button", { name: "Bookmark event" }).focus();
    await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "Bookmarked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("bounds nearby event rendering for large histories", () => {
    const events = createTimeTravelHistory(
      Array.from({ length: 1000 }, (_, index) => ({
        id: String(index),
        timestamp: index,
        label: `Event ${index}`,
        state: index,
      })),
    );
    render(<TimeTravelInspector snapshots={events} defaultSelectedId="500" />);
    expect(
      within(screen.getByRole("list", { name: "Nearby events" })).getAllByRole(
        "button",
      ),
    ).toHaveLength(7);
  });
  it("keeps the selected event visible by scrolling only the event strip", () => {
    render(
      <TimeTravelInspector snapshots={history} defaultSelectedId="start" />,
    );
    const track = screen.getByRole("list", { name: "Nearby events" });
    const events = within(track).getAllByRole("button");
    vi.spyOn(track, "getBoundingClientRect").mockReturnValue(
      new DOMRect(0, 0, 200, 40),
    );
    vi.spyOn(events[1]!, "getBoundingClientRect").mockReturnValue(
      new DOMRect(240, 0, 100, 40),
    );
    fireEvent.click(screen.getByRole("button", { name: "Next event" }));
    expect(track.scrollLeft).toBe(140);
    vi.spyOn(events[0]!, "getBoundingClientRect").mockReturnValue(
      new DOMRect(-140, 0, 100, 40),
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous event" }));
    expect(track.scrollLeft).toBe(0);
  });
  it("forwards refs, native props and class names", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TimeTravelInspector
        snapshots={[]}
        ref={ref}
        className="custom"
        aria-label="Checkout replay"
      />,
    );
    expect(ref.current).toHaveClass("custom");
    expect(ref.current).toHaveAttribute("aria-label", "Checkout replay");
  });
  it.each(
    Object.keys(
      zuiTimeTravelInspectorAppearances,
    ) as (keyof typeof zuiTimeTravelInspectorAppearances)[],
  )("renders the %s appearance", (appearance) => {
    const { container } = render(
      <TimeTravelInspector snapshots={[history[0]!]} appearance={appearance} />,
    );
    expect(container.firstChild).toHaveAttribute("data-appearance", appearance);
  });
  it.each(["sm", "md", "lg"] as const)("renders size %s", (size) => {
    const { container } = render(
      <TimeTravelInspector snapshots={[]} size={size} />,
    );
    expect(container.firstChild).toHaveAttribute("data-size", size);
  });
});
