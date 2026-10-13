"use client";

import { useState } from "react";
import { useTextOverflow } from "@zentauri-ui/zentauri-components/hooks/useTextOverflow";
import { TruncateText } from "@zentauri-ui/zentauri-components/ui/typography";

export function TextOverflowDemo() {
  const [width, setWidth] = useState(280);
  const [short, setShort] = useState(false);
  const text = short
    ? "Short text."
    : "A longer string can overflow its container as the available width changes. The complete string stays in the document.";
  const { ref, isOverflowing, hasMeasured } = useTextOverflow<HTMLDivElement>({
    measurementKey: text,
  });
  return (
    <div className="space-y-4 text-slate-900 dark:text-slate-100">
      <label className="block text-sm">
        Text width: {width}px
        <input
          type="range"
          min={160}
          max={640}
          value={width}
          onChange={(event) => setWidth(Number(event.target.value))}
          className="mt-2 block w-full"
        />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={short}
          onChange={(event) => setShort(event.target.checked)}
        />{" "}
        Short text
      </label>
      <div
        style={{ width, maxWidth: "100%" }}
        className="min-w-0 rounded-lg border border-slate-400 p-4 dark:border-slate-600"
      >
        <TruncateText as="div" ref={ref}>
          {text}
        </TruncateText>
      </div>
      <p role="status">
        {hasMeasured
          ? isOverflowing
            ? "Text overflows"
            : "Text fits"
          : "Waiting for measurement"}
      </p>
    </div>
  );
}
