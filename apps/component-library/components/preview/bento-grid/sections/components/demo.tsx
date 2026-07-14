"use client";

import { useState } from "react";

import { BentoGrid } from "@zentauri-ui/zentauri-components/ui/bento-grid";
import { BentoGridAnimated } from "@zentauri-ui/zentauri-components/ui/bento-grid/animated";

import { BENTO_GRID_FILLER_ITEMS } from "./data";
import { Tile } from "./tile";
import type { BentoGridDemoProps } from "./types";

const featuredDetail = (
  <div className="space-y-2 pr-8">
    <h3 className="text-lg font-semibold">Featured metric</h3>
    <p className="text-sm leading-6">
      This detail view opens from the featured card. In the animated entry it
      shared-element-morphs from the card; in the static entry it opens as a
      plain overlay. Either way focus is trapped here and returns to the card on
      close.
    </p>
  </div>
);

export function BentoGridDemo({
  cols,
  gap,
  animation,
  span,
  appearance,
}: BentoGridDemoProps) {
  // Lets the reflow layer be seen live: removing/restoring items makes
  // neighbors animate to their new grid positions.
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const visibleFillers = BENTO_GRID_FILLER_ITEMS.filter(
    (item) => !hidden.has(item.id),
  );

  const toggleButton = animation !== "none" && (
    <button
      type="button"
      onClick={() =>
        setHidden((prev) => (prev.size > 0 ? new Set() : new Set(["c", "e"])))
      }
      className="mb-4 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 ring-1 ring-slate-300 hover:ring-slate-400 dark:text-white dark:ring-white/20 dark:hover:ring-white/40"
    >
      {hidden.size > 0 ? "Restore items" : "Remove two items"}
    </button>
  );

  if (animation === "none") {
    return (
      <div className="w-full">
        <BentoGrid cols={cols} gap={gap}>
          <BentoGrid.Item id="a" span={span} appearance={appearance}>
            <Tile title="Featured" body={`span ${span}`} />
          </BentoGrid.Item>
          {BENTO_GRID_FILLER_ITEMS.map((item) => (
            <BentoGrid.Item
              key={item.id}
              id={item.id}
              appearance={item.appearance}
            >
              <Tile title={item.title} />
            </BentoGrid.Item>
          ))}
        </BentoGrid>
      </div>
    );
  }

  return (
    <div className="w-full">
      {toggleButton}
      <BentoGridAnimated cols={cols} gap={gap} animation={animation}>
        <BentoGridAnimated.Item
          key="a"
          id="a"
          span={span}
          appearance={appearance}
          expandable
          detail={featuredDetail}
        >
          <Tile
            title="Featured"
            body={
              animation === "morph"
                ? "Hover to expand · click for detail"
                : animation === "bento"
                  ? "Hover to expand"
                  : `span ${span}`
            }
          />
        </BentoGridAnimated.Item>
        {visibleFillers.map((item) => (
          <BentoGridAnimated.Item
            key={item.id}
            id={item.id}
            appearance={item.appearance}
          >
            <Tile title={item.title} />
          </BentoGridAnimated.Item>
        ))}
      </BentoGridAnimated>
    </div>
  );
}
