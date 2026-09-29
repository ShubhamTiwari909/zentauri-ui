"use client";
import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  AppearanceControls,
  type FormAppearance,
  type FormSize,
} from "@/components/preview/form-fields/appearance-controls";
import { TagsInputDemo } from "./demo";
import { tagsinputSnippet } from "./snippets";
import { TAGSINPUT_APPEARANCES, TAGSINPUT_SIZES } from "./data";

export function TagsInputPlayground() {
  const [appearance, setAppearance] = useState<FormAppearance>(
    TAGSINPUT_APPEARANCES[0],
  );
  const [size, setSize] = useState<FormSize>(TAGSINPUT_SIZES[1]);
  return (
    <>
      <AppearanceControls
        appearance={appearance}
        size={size}
        onAppearanceChange={setAppearance}
        onSizeChange={setSize}
      />
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Selected: {appearance}, {size}
      </p>
      <PreviewCodeShowcase code={tagsinputSnippet({ appearance, size })}>
        <div className="max-w-md">
          <TagsInputDemo appearance={appearance} size={size} />
        </div>
      </PreviewCodeShowcase>
    </>
  );
}
