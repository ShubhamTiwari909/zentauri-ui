"use client";
import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  AppearanceControls,
  type FormAppearance,
  type FormSize,
} from "@/components/preview/form-fields/appearance-controls";
import { FieldDemo } from "./demo";
import { fieldSnippet } from "./snippets";
import { FIELD_APPEARANCES, FIELD_SIZES } from "./data";

export function FieldPlayground() {
  const [appearance, setAppearance] = useState<FormAppearance>(
    FIELD_APPEARANCES[0],
  );
  const [size, setSize] = useState<FormSize>(FIELD_SIZES[1]);
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
      <PreviewCodeShowcase code={fieldSnippet({ appearance, size })}>
        <div className="max-w-md">
          <FieldDemo appearance={appearance} size={size} />
        </div>
      </PreviewCodeShowcase>
    </>
  );
}
