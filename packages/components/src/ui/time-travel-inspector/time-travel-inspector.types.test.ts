import { expectTypeOf, it } from "vitest";
import type {
  TimeTravelChange,
  TimeTravelPatch,
  TimeTravelSnapshot,
  TimeTravelValue,
} from "./types";

// Compile-time assertions checked by the package's check-types command.
// Deliberately never invoked: the assignments verify rejected mutations.
function verifyContract(
  snapshot: TimeTravelSnapshot,
  patch: TimeTravelPatch,
  change: TimeTravelChange,
) {
  // @ts-expect-error Event identity is immutable.
  snapshot.id = "other";
  // @ts-expect-error Event timestamps are immutable.
  snapshot.timestamp = 10;
  // @ts-expect-error Event labels are immutable.
  snapshot.label = "Other";
  if (snapshot.kind === "checkpoint") {
    // @ts-expect-error Checkpoints cannot be changed in place.
    snapshot.state = null;
  } else {
    // @ts-expect-error Delta lists cannot be replaced in place.
    snapshot.changes = [];
    // @ts-expect-error Delta lists cannot be appended in place.
    snapshot.changes.push({ op: "set", path: [], value: null });
  }
  // @ts-expect-error Event kinds are immutable.
  snapshot.kind = "checkpoint";
  // @ts-expect-error Patch paths are immutable.
  patch.path = ["other"];
  if (patch.op === "set") {
    // @ts-expect-error Patch values are immutable.
    patch.value = null;
  }
  // @ts-expect-error A remove operation must identify an object key.
  const rootRemove: TimeTravelPatch = { op: "remove", path: [] };
  // @ts-expect-error Added changes require their new value.
  const missingAfter: TimeTravelChange = { type: "added", path: ["key"] };
  // @ts-expect-error Removed changes require their old value.
  const missingBefore: TimeTravelChange = { type: "removed", path: ["key"] };
  // @ts-expect-error Changed values require both sides.
  const incompleteChange: TimeTravelChange = {
    type: "changed",
    path: [],
    before: null,
  };
  let value: TimeTravelValue;
  if (change.type === "added") value = change.after;
  else if (change.type === "removed") value = change.before;
  else {
    value = change.before;
    value = change.after;
  }
  return { rootRemove, missingAfter, missingBefore, incompleteChange, value };
}

it("compile-time only (check-types): immutable history, nonempty removals, and narrowed change values", () => {
  expectTypeOf(verifyContract).toBeFunction();
});
