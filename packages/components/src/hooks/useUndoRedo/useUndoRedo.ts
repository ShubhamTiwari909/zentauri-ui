"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

export type UndoRedoAction =
  | "set"
  | "replace"
  | "undo"
  | "redo"
  | "jump"
  | "clear";

export interface UndoRedoSnapshot<T> {
  past: readonly T[];
  present: T;
  future: readonly T[];
}

export interface UseUndoRedoOptions<T> {
  /** Maximum number of past states retained. Oldest entries are dropped. Default 100. */
  maxHistory?: number;
  /**
   * Equality check used to skip no-op commits (`set()` with an equal value records
   * nothing). Default: `Object.is`.
   */
  isEqual?: (a: T, b: T) => boolean;
  /**
   * When > 0, `set()` calls arriving within this window are merged into ONE history
   * entry (transaction grouping — e.g. typing "hello" is one undo step, not five).
   * The present value always updates immediately; only history-entry creation is
   * grouped. Default 0 (every `set()` is its own entry).
   */
  groupWithinMs?: number;
  /** Called after every history-affecting operation with the new snapshot. */
  onChange?: (snapshot: UndoRedoSnapshot<T>, action: UndoRedoAction) => void;
}

export interface UseUndoRedoReturn<T> {
  /** Current value. */
  state: T;
  /** Commit a new value (or updater) as a history entry. Clears the redo stack. */
  set: (value: T | ((prev: T) => T)) => void;
  /**
   * Update the present value WITHOUT creating a history entry (e.g. transient
   * drag positions, live previews). Does not clear the redo stack.
   */
  replace: (value: T | ((prev: T) => T)) => void;
  /** Step back. No-op when `canUndo` is false. */
  undo: () => void;
  /** Step forward. No-op when `canRedo` is false. */
  redo: () => void;
  /**
   * Jump to an absolute point in the timeline. Index 0 = oldest past entry,
   * `past.length` = present, `past.length + future.length` = newest future entry.
   * Out-of-range indices clamp.
   */
  jumpTo: (index: number) => void;
  /** Reset history. With an argument, also resets the present value. */
  clear: (...args: [] | [T]) => void;
  canUndo: boolean;
  canRedo: boolean;
  /** Read-only view of the timeline (for history panels / debug UIs). */
  history: UndoRedoSnapshot<T>;
}

interface InternalState<T> {
  past: T[];
  present: T;
  future: T[];
}

type InternalAction<T> =
  | {
      type: "set";
      value: T | ((prev: T) => T);
      isEqual: (a: T, b: T) => boolean;
      maxHistory: number;
    }
  | {
      type: "set-grouped";
      value: T | ((prev: T) => T);
      isEqual: (a: T, b: T) => boolean;
    }
  | { type: "replace"; value: T | ((prev: T) => T) }
  | { type: "undo" }
  | { type: "redo" }
  | { type: "jump"; index: number; maxHistory: number }
  | { type: "clear"; value: T; hasValue: boolean };

function resolveValue<T>(value: T | ((prev: T) => T), prev: T): T {
  return typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
}

// Keeps only the most recent `maxHistory` entries — applied every time `past` grows.
function capPast<T>(past: T[], maxHistory: number): T[] {
  if (maxHistory <= 0) {
    return [];
  }
  return past.length > maxHistory ? past.slice(past.length - maxHistory) : past;
}

function reducer<T>(
  state: InternalState<T>,
  action: InternalAction<T>,
): InternalState<T> {
  switch (action.type) {
    case "set": {
      const next = resolveValue(action.value, state.present);
      if (action.isEqual(state.present, next)) {
        // Returning the same reference is a React useReducer bail-out — no render, no onChange.
        return state;
      }
      return {
        past: capPast([...state.past, state.present], action.maxHistory),
        present: next,
        future: [],
      };
    }
    case "set-grouped": {
      const next = resolveValue(action.value, state.present);
      if (action.isEqual(state.present, next)) {
        return state;
      }
      return { ...state, present: next, future: [] };
    }
    case "replace": {
      const next = resolveValue(action.value, state.present);
      return { ...state, present: next };
    }
    case "undo": {
      if (state.past.length === 0) {
        return state;
      }
      const previous = state.past[state.past.length - 1] as T;
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "redo": {
      if (state.future.length === 0) {
        return state;
      }
      const nextPresent = state.future[0] as T;
      return {
        past: [...state.past, state.present],
        present: nextPresent,
        future: state.future.slice(1),
      };
    }
    case "jump": {
      const timeline = [...state.past, state.present, ...state.future];
      const requestedIndex = Number.isFinite(action.index)
        ? Math.trunc(action.index)
        : 0;
      const clamped = Math.min(
        Math.max(requestedIndex, 0),
        timeline.length - 1,
      );
      return {
        past: capPast(timeline.slice(0, clamped), action.maxHistory),
        present: timeline[clamped] as T,
        future: timeline.slice(clamped + 1),
      };
    }
    case "clear": {
      return {
        past: [],
        present: action.hasValue ? action.value : state.present,
        future: [],
      };
    }
    default:
      return state;
  }
}

function init<T>(initialValue: T | (() => T)): InternalState<T> {
  const present =
    typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  return { past: [], present, future: [] };
}

const defaultIsEqual = <T>(a: T, b: T) => Object.is(a, b);

/**
 * Generic undo/redo history state manager: bounded depth, transaction grouping, and
 * jump-to-index over a timeline of snapshots.
 *
 * - `set` records a new history entry and clears the redo stack (the classic
 *   branch-discard behavior of committing after an undo).
 * - `replace` updates the present value without touching history — for transient
 *   values (drag positions, live previews) that should not be individually undoable.
 * - `groupWithinMs` merges rapid `set` calls (e.g. keystrokes) into a single undo
 *   step; the present value still updates on every call.
 * - History stores references, not clones — treat `T` as immutable, same contract
 *   as React state.
 * - SSR-safe: no browser APIs are touched.
 *
 * @param initialValue - Initial present value, or a lazy initializer.
 * @param options - {@link UseUndoRedoOptions}
 * @returns {@link UseUndoRedoReturn}
 */
export function useUndoRedo<T>(
  initialValue: T | (() => T),
  options: UseUndoRedoOptions<T> = {},
): UseUndoRedoReturn<T> {
  const {
    maxHistory = 100,
    isEqual = defaultIsEqual,
    groupWithinMs = 0,
    onChange,
  } = options;

  const [state, dispatch] = useReducer(
    reducer as (
      state: InternalState<T>,
      action: InternalAction<T>,
    ) => InternalState<T>,
    initialValue,
    init,
  );

  // Latest-value refs so the callbacks below stay referentially stable across renders.
  const optionsRef = useRef({ maxHistory, isEqual, groupWithinMs });
  optionsRef.current = { maxHistory, isEqual, groupWithinMs };
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const presentRef = useRef(state.present);
  presentRef.current = state.present;

  const lastSetAtRef = useRef<number | null>(null);
  const lastActionWasSetRef = useRef(false);
  const pendingActionRef = useRef<UndoRedoAction | null>(null);

  useEffect(() => {
    const action = pendingActionRef.current;
    if (action === null) {
      return;
    }
    pendingActionRef.current = null;
    onChangeRef.current?.(
      { past: state.past, present: state.present, future: state.future },
      action,
    );
  }, [state]);

  const set = useCallback((value: T | ((prev: T) => T)) => {
    const { groupWithinMs, isEqual, maxHistory } = optionsRef.current;
    const resolved = resolveValue(value, presentRef.current);
    if (isEqual(presentRef.current, resolved)) {
      // No-op: skip the grouping bookkeeping below, so a later real edit
      // still opens a fresh history entry instead of merging into one that
      // this call never created.
      return;
    }
    const now = performance.now();
    const withinWindow =
      groupWithinMs > 0 &&
      lastSetAtRef.current !== null &&
      now - lastSetAtRef.current <= groupWithinMs;
    const grouped = withinWindow && lastActionWasSetRef.current;
    lastSetAtRef.current = now;
    lastActionWasSetRef.current = true;
    presentRef.current = resolved;
    pendingActionRef.current = "set";
    dispatch(
      grouped
        ? { type: "set-grouped", value, isEqual }
        : { type: "set", value, isEqual, maxHistory },
    );
  }, []);

  const replace = useCallback((value: T | ((prev: T) => T)) => {
    presentRef.current = resolveValue(value, presentRef.current);
    lastActionWasSetRef.current = false;
    pendingActionRef.current = "replace";
    dispatch({ type: "replace", value });
  }, []);

  const undo = useCallback(() => {
    lastActionWasSetRef.current = false;
    pendingActionRef.current = "undo";
    dispatch({ type: "undo" });
  }, []);

  const redo = useCallback(() => {
    lastActionWasSetRef.current = false;
    pendingActionRef.current = "redo";
    dispatch({ type: "redo" });
  }, []);

  const jumpTo = useCallback((index: number) => {
    lastActionWasSetRef.current = false;
    pendingActionRef.current = "jump";
    dispatch({
      type: "jump",
      index,
      maxHistory: optionsRef.current.maxHistory,
    });
  }, []);

  // Rest params (rather than an `initialValue?: T` parameter) so `args.length`
  // distinguishes `clear()` from `clear(undefined)`.
  const clear = useCallback((...args: [] | [T]) => {
    lastActionWasSetRef.current = false;
    pendingActionRef.current = "clear";
    dispatch({
      type: "clear",
      value: args[0] as T,
      hasValue: args.length > 0,
    });
  }, []);

  return {
    state: state.present,
    set,
    replace,
    undo,
    redo,
    jumpTo,
    clear,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
    history: { past: state.past, present: state.present, future: state.future },
  };
}
