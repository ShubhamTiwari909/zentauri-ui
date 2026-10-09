import type {
  TimeTravelCapture,
  TimeTravelChange,
  TimeTravelPatch,
  TimeTravelSnapshot,
  TimeTravelValue,
} from "./types";

export type {
  TimeTravelCapture,
  TimeTravelChange,
  TimeTravelEvent,
  TimeTravelPatch,
  TimeTravelSnapshot,
  TimeTravelValue,
} from "./types";

const isObject = (
  value: TimeTravelValue,
): value is { readonly [key: string]: TimeTravelValue } =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const owns = (value: object, key: string) =>
  Object.prototype.hasOwnProperty.call(value, key);

/** Clone JSON without losing keys such as __proto__, or sharing mutable input objects. */
function clone(value: TimeTravelValue): TimeTravelValue {
  if (Array.isArray(value)) return value.map(clone);
  if (isObject(value))
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, clone(child)]),
    );
  return value;
}

/** Equality-only walk: stop at the first difference without building change lists. */
function hasDiff(a: TimeTravelValue, b: TimeTravelValue): boolean {
  if (Object.is(a, b)) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return true;
    for (let index = 0; index < a.length; index++) {
      if (hasDiff(a[index]!, b[index]!)) return true;
    }
    return false;
  }
  if (isObject(a) && isObject(b)) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return true;
    for (const key of keys) {
      if (!owns(b, key) || hasDiff(a[key]!, b[key]!)) return true;
    }
    return false;
  }
  return true;
}

/** Compare two JSON states. Paths preserve literal keys; arrays are a single change. */
export function diffTimeTravelStates(
  before: TimeTravelValue,
  after: TimeTravelValue,
): TimeTravelChange[] {
  const changes: TimeTravelChange[] = [];
  function visit(a: TimeTravelValue, b: TimeTravelValue, path: string[]) {
    if (Object.is(a, b)) return;
    if (isObject(a) && isObject(b)) {
      for (const key of Object.keys(a)) {
        if (!owns(b, key))
          changes.push({
            path:
              path[0] === undefined ? [key] : [path[0], ...path.slice(1), key],
            type: "removed",
            before: a[key]!,
          });
      }
      for (const key of Object.keys(b)) {
        if (!owns(a, key))
          changes.push({ path: [...path, key], type: "added", after: b[key]! });
        else visit(a[key]!, b[key]!, [...path, key]);
      }
    } else if (hasDiff(a, b)) {
      changes.push({ path, type: "changed", before: a, after: b });
    }
  }
  visit(before, after, []);
  return changes;
}

/** Validate event metadata without reconstructing all historical states. */
export function indexTimeTravelHistory(
  snapshots: readonly TimeTravelSnapshot[],
): Map<string, number> {
  const ids = new Map<string, number>();
  let previous = -Infinity;
  snapshots.forEach((snapshot, index) => {
    if (!snapshot.id || ids.has(snapshot.id))
      throw new Error("Time travel events require unique, nonempty IDs.");
    if (!Number.isFinite(snapshot.timestamp) || snapshot.timestamp < previous)
      throw new Error(
        "Time travel timestamps must be finite and nondecreasing.",
      );
    if (index === 0 && snapshot.kind !== "checkpoint")
      throw new Error("Time travel history must start with a checkpoint.");
    ids.set(snapshot.id, index);
    previous = snapshot.timestamp;
  });
  return ids;
}

/** Store full state every checkpointInterval events and object-key deltas in between. */
export function createTimeTravelHistory(
  captures: readonly TimeTravelCapture[],
  checkpointInterval = 20,
): TimeTravelSnapshot[] {
  if (!Number.isSafeInteger(checkpointInterval) || checkpointInterval < 1)
    throw new RangeError("checkpointInterval must be a positive safe integer.");
  const history: TimeTravelSnapshot[] = captures.map((capture, index) => {
    const { id, timestamp, label, state } = capture;
    if (index % checkpointInterval === 0)
      return { id, timestamp, label, kind: "checkpoint", state: clone(state) };
    const changes: TimeTravelPatch[] = diffTimeTravelStates(
      captures[index - 1]!.state,
      state,
    ).map((change) =>
      change.type === "removed"
        ? { op: "remove", path: change.path }
        : { op: "set", path: change.path, value: clone(change.after) },
    );
    return { id, timestamp, label, kind: "delta", changes };
  });
  indexTimeTravelHistory(history);
  return history;
}

function applyPatch(
  state: TimeTravelValue,
  patch: TimeTravelPatch,
  depth = 0,
): TimeTravelValue {
  if (depth === patch.path.length) {
    if (patch.op === "remove")
      throw new Error("Cannot remove the root state; set it to null instead.");
    return clone(patch.value);
  }
  const key = patch.path[depth]!;
  if (!isObject(state))
    throw new Error(
      "Time travel patch paths must traverse existing objects; replace arrays atomically.",
    );
  const result = { ...state };
  if (depth === patch.path.length - 1) {
    if (patch.op === "remove") delete result[key];
    else
      Object.defineProperty(result, key, {
        value: clone(patch.value),
        enumerable: true,
        configurable: true,
        writable: true,
      });
  } else {
    if (!owns(state, key))
      throw new Error("Time travel patch parent does not exist.");
    Object.defineProperty(result, key, {
      value: applyPatch(state[key]!, patch, depth + 1),
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }
  return result;
}

/** Replay only the nearest checkpoint and its following deltas. Input is never mutated. */
export function resolveTimeTravelState(
  snapshots: readonly TimeTravelSnapshot[],
  index: number,
): TimeTravelValue {
  if (!Number.isInteger(index) || index < 0 || index >= snapshots.length)
    throw new RangeError("Snapshot index is out of range.");
  let checkpoint = index;
  while (checkpoint >= 0 && snapshots[checkpoint]!.kind !== "checkpoint")
    checkpoint--;
  const first = snapshots[checkpoint];
  if (!first || first.kind !== "checkpoint")
    throw new Error("Time travel history must start with a checkpoint.");
  let state = clone(first.state);
  for (let cursor = checkpoint + 1; cursor <= index; cursor++) {
    const snapshot = snapshots[cursor]!;
    if (snapshot.kind === "delta")
      for (const patch of snapshot.changes) state = applyPatch(state, patch);
  }
  return state;
}
