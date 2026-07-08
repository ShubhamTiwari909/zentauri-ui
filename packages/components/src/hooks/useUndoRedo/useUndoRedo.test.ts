import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useUndoRedo } from "./useUndoRedo";

describe("useUndoRedo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts with the initial value and empty history", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    expect(result.current.state).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.history).toEqual({
      past: [],
      present: 0,
      future: [],
    });
  });

  it("calls a lazy initializer exactly once", () => {
    const init = vi.fn(() => 42);
    const { result, rerender } = renderHook(() => useUndoRedo(init));
    rerender();
    expect(init).toHaveBeenCalledTimes(1);
    expect(result.current.state).toBe(42);
  });

  it("undoes and redoes through a multi-step sequence with correct flags", () => {
    const { result } = renderHook(() => useUndoRedo(0));

    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.set(3));
    expect(result.current.state).toBe(3);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);

    act(() => result.current.undo());
    expect(result.current.state).toBe(2);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.undo());
    act(() => result.current.undo());
    expect(result.current.state).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.redo());
    expect(result.current.state).toBe(1);
    act(() => result.current.redo());
    act(() => result.current.redo());
    expect(result.current.state).toBe(3);
    expect(result.current.canRedo).toBe(false);
  });

  it("clears the redo stack when a new set happens after undo (branch discard)", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.undo());
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.set(99));
    expect(result.current.state).toBe(99);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.history.future).toEqual([]);
  });

  it("resolves functional updaters against the latest present across calls in one act", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => {
      result.current.set((prev) => prev + 1);
      result.current.set((prev) => prev + 1);
    });
    expect(result.current.state).toBe(2);
    act(() => result.current.undo());
    expect(result.current.state).toBe(1);
  });

  it("skips no-op commits with the default Object.is comparator", () => {
    const { result } = renderHook(() => useUndoRedo(5));
    act(() => result.current.set(5));
    expect(result.current.canUndo).toBe(false);
    expect(result.current.history.past).toEqual([]);
  });

  it("skips no-op commits with a custom isEqual comparator", () => {
    const isEqual = (a: { id: number }, b: { id: number }) => a.id === b.id;
    const { result } = renderHook(() =>
      useUndoRedo({ id: 1, extra: "a" }, { isEqual }),
    );
    act(() => result.current.set({ id: 1, extra: "b" }));
    expect(result.current.canUndo).toBe(false);
    expect(result.current.state).toEqual({ id: 1, extra: "a" });
  });

  it("caps history at maxHistory, dropping the oldest entries", () => {
    const maxHistory = 5;
    const { result } = renderHook(() => useUndoRedo(0, { maxHistory }));

    for (let i = 1; i <= maxHistory + 5; i++) {
      act(() => result.current.set(i));
    }
    expect(result.current.history.past).toHaveLength(maxHistory);

    for (let i = 0; i < maxHistory; i++) {
      act(() => result.current.undo());
    }
    // The oldest 5 commits (1..5) were dropped, so undo stops at value 5.
    expect(result.current.state).toBe(5);
    expect(result.current.canUndo).toBe(false);
  });

  it("replace updates state without adding a past entry or touching future", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => result.current.set(1));
    act(() => result.current.undo());
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.replace(50));
    expect(result.current.state).toBe(50);
    expect(result.current.history.past).toEqual([]);
    expect(result.current.canRedo).toBe(true);
  });

  it("groups rapid set calls into one history entry within groupWithinMs", () => {
    let time = 0;
    vi.spyOn(performance, "now").mockImplementation(() => time);

    const { result } = renderHook(() =>
      useUndoRedo("", { groupWithinMs: 500 }),
    );

    time = 0;
    act(() => result.current.set("h"));
    time = 100;
    act(() => result.current.set("he"));
    expect(result.current.history.past).toEqual([""]);

    // Undo right after the grouped typing restores the pre-group value.
    act(() => result.current.undo());
    expect(result.current.state).toBe("");
    act(() => result.current.redo());

    time = 1000;
    act(() => result.current.set("hel"));
    expect(result.current.history.past).toEqual(["", "he"]);
  });

  it("jumpTo moves to an absolute index and clamps out-of-range values", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    act(() => result.current.set(3));
    act(() => result.current.undo());
    // timeline: [0, 1] past, 2 present, [3] future

    act(() => result.current.jumpTo(0));
    expect(result.current.state).toBe(0);
    expect(result.current.history).toEqual({
      past: [],
      present: 0,
      future: [1, 2, 3],
    });

    act(() => result.current.jumpTo(100));
    expect(result.current.state).toBe(3);
    expect(result.current.history).toEqual({
      past: [0, 1, 2],
      present: 3,
      future: [],
    });

    act(() => result.current.jumpTo(-5));
    expect(result.current.state).toBe(0);
  });

  it("clear() empties history keeping present; clear(value) resets present too", () => {
    const { result } = renderHook(() => useUndoRedo(0));
    act(() => result.current.set(1));
    act(() => result.current.set(2));

    act(() => result.current.clear());
    expect(result.current.state).toBe(2);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);

    act(() => result.current.set(3));
    act(() => result.current.clear(0));
    expect(result.current.state).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it("fires onChange with the right action labels", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useUndoRedo(0, { onChange }));

    act(() => result.current.set(1));
    act(() => result.current.undo());
    act(() => result.current.redo());
    act(() => result.current.replace(9));
    act(() => result.current.jumpTo(0));
    act(() => result.current.clear());

    const actions = onChange.mock.calls.map((call) => call[1]);
    expect(actions).toEqual([
      "set",
      "undo",
      "redo",
      "replace",
      "jump",
      "clear",
    ]);
  });

  it("does not fire onChange for a no-op set", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useUndoRedo(5, { onChange }));
    act(() => result.current.set(5));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("keeps callback identities stable across re-renders", () => {
    const { result, rerender } = renderHook(() => useUndoRedo(0));
    const first = {
      set: result.current.set,
      replace: result.current.replace,
      undo: result.current.undo,
      redo: result.current.redo,
      jumpTo: result.current.jumpTo,
      clear: result.current.clear,
    };
    rerender();
    expect(result.current.set).toBe(first.set);
    expect(result.current.replace).toBe(first.replace);
    expect(result.current.undo).toBe(first.undo);
    expect(result.current.redo).toBe(first.redo);
    expect(result.current.jumpTo).toBe(first.jumpTo);
    expect(result.current.clear).toBe(first.clear);
  });
});
