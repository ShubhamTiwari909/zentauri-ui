"use client";

import { SlideToComplete } from "@zentauri-ui/zentauri-components/ui/slide-to-complete";

import type { SlideToCompleteDemoProps } from "./types";

export function SlideToCompleteDemo({
  appearance,
  size,
  threshold,
  label = "Slide to approve",
  disabled = false,
  loading = false,
}: SlideToCompleteDemoProps) {
  return (
    <SlideToComplete
      appearance={appearance}
      size={size}
      threshold={threshold}
      label={label}
      disabled={disabled}
      loading={loading}
    />
  );
}
