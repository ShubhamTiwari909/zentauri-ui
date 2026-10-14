"use client";

import { useState } from "react";
import { useDebouncedCallback } from "@zentauri-ui/zentauri-components/hooks/useDebouncedCallback";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

export function DebouncedCallbackDemo() {
  const [draft, setDraft] = useState("");
  const [delay, setDelay] = useState(600);
  const [saved, setSaved] = useState<string | null>(null);
  const [saveCount, setSaveCount] = useState(0);
  const [message, setMessage] = useState("No changes scheduled.");
  const { debouncedCallback, cancel, flush, isPending } = useDebouncedCallback(
    (value: string) => {
      setSaved(value);
      setSaveCount((count) => count + 1);
      setMessage("Saved locally.");
    },
    delay,
  );

  return (
    <div className="space-y-5 rounded-xl border border-slate-300 p-5 text-slate-900 dark:border-slate-700 dark:text-slate-100">
      <h2 className="text-xl font-semibold">Debounced autosave</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Type a draft and pause to save it. Rapid changes produce one save. This
        demo keeps the saved value on this page.
      </p>
      <label className="block text-sm">
        Draft
        <input
          value={draft}
          onChange={(event) => {
            const value = event.target.value;
            setDraft(value);
            debouncedCallback(value);
          }}
          placeholder="Write a draft title…"
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        />
      </label>
      <label className="block text-sm">
        Delay for the next change
        <select
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
          className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
        >
          {[300, 600, 1000].map((value) => (
            <option key={value} value={value}>
              {value} ms
            </option>
          ))}
        </select>
      </label>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          disabled={!isPending}
          onClick={() => {
            flush();
          }}
        >
          Save now
        </Button>
        <Button
          type="button"
          appearance="outline"
          disabled={!isPending}
          onClick={() => {
            cancel();
            setMessage("Pending save cancelled. Draft retained.");
          }}
        >
          Cancel pending save
        </Button>
      </div>
      <p role="status" className="text-sm">
        {isPending ? "Save scheduled. Waiting for typing to stop." : message}
      </p>
      <dl className="space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-3">
          <dt className="font-medium">Saved draft:</dt>
          <dd className="min-w-0 wrap-anywhere" data-demo="saved-draft">
            {saved === null
              ? "Nothing saved yet"
              : saved === ""
                ? "(empty draft)"
                : saved}
          </dd>
        </div>
        <div className="flex gap-3">
          <dt className="font-medium">Completed saves:</dt>
          <dd data-demo="save-count" className="tabular-nums">
            {saveCount}
          </dd>
        </div>
      </dl>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Changing the delay keeps an already scheduled deadline. Cancel discards
        the scheduled call; it does not undo a completed save or stop an
        in-flight request.
      </p>
    </div>
  );
}
