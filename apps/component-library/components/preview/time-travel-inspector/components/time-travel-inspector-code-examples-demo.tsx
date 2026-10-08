"use client";

import { useState } from "react";
import {
  TimeTravelInspector,
  type TimeTravelRenderContext,
  type TimeTravelInspectorProps,
} from "@zentauri-ui/zentauri-components/ui/time-travel-inspector";
import {
  CHECKOUT_HISTORY,
  formatCheckoutTime,
  type CheckoutState,
} from "./time-travel-inspector-code-examples.data";

function CheckoutPreview({ state }: { state: CheckoutState }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em]">
          Fieldwork / Store
        </span>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
          {state.status}
        </span>
      </div>
      <div className="my-5 flex items-center gap-4">
        <div
          className="grid size-16 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 40 40"
            className="size-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M10 15h20l2 21H8l2-21Z" />
            <path d="M15 17V10a5 5 0 0 1 10 0v7" />
          </svg>
        </div>
        <div>
          <p className="font-semibold">Everyday carry tote</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Sand / Organic canvas
          </p>
          <p className="mt-1 text-xs">{state.quantity} × $80.00</p>
        </div>
      </div>
      <dl className="space-y-2 text-xs">
        {[
          ["Subtotal", state.subtotal],
          ["Discount", -state.discount],
          ["Shipping", state.shipping],
        ].map(([label, amount]) => (
          <div key={label} className="flex justify-between">
            <dt>{label}</dt>
            <dd>
              {Number(amount) < 0 ? "−" : ""}$
              {Math.abs(Number(amount)).toFixed(2)}
            </dd>
          </div>
        ))}
        <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold dark:border-slate-700">
          <dt>Total</dt>
          <dd>${state.total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}

export function TimeTravelInspectorDemo(
  props: Pick<TimeTravelInspectorProps, "appearance" | "size">,
) {
  const [opened, setOpened] = useState<TimeTravelRenderContext | null>(null);
  return (
    <div className="space-y-4">
      <TimeTravelInspector
        snapshots={CHECKOUT_HISTORY}
        defaultSelectedId="discount"
        defaultBookmarks={["discount"]}
        formatTimestamp={formatCheckoutTime}
        onOpenState={setOpened}
        renderPreview={({ state }) => (
          <CheckoutPreview state={state as CheckoutState} />
        )}
        {...props}
      />
      {opened && (
        <section
          aria-label="Opened historical checkout"
          className="rounded-xl border border-sky-300 bg-sky-50 p-4 text-slate-900 dark:border-sky-800 dark:bg-slate-950 dark:text-white"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              Historical checkout ·{" "}
              {formatCheckoutTime(opened.snapshot.timestamp)}
            </p>
            <button
              type="button"
              onClick={() => setOpened(null)}
              className="rounded border border-current px-2 py-1 text-xs"
            >
              Close historical state
            </button>
          </div>
          <CheckoutPreview state={opened.state as CheckoutState} />
          <p className="mt-3 text-xs">
            This view stays at the opened event while you continue scrubbing.
          </p>
        </section>
      )}
    </div>
  );
}
