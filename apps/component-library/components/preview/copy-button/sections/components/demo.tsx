"use client";

import { CopyButton } from "@zentauri-ui/zentauri-components/ui/copy-button";

import type { CopyButtonDemoProps } from "./types";

export function CopyButtonDemo({
  appearance,
  size,
  iconOnly = true,
}: CopyButtonDemoProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <CopyButton
        appearance={appearance}
        iconOnly={iconOnly}
        label="Copy"
        size={size}
        value={`zentauri-${appearance}`}
      />
      <CopyButton
        appearance={appearance}
        iconOnly={false}
        label="Copy link"
        size={size}
        value={`https://zentauri.dev/${appearance}`}
      />
    </div>
  );
}
