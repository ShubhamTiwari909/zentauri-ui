"use client";
import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  AppearanceControls,
  type FormAppearance,
  type FormSize,
} from "@/components/preview/form-fields/appearance-controls";
import { NumberInputDemo } from "./demo";
import { numberinputSnippet } from "./snippets";
import { NUMBERINPUT_APPEARANCES, NUMBERINPUT_SIZES } from "./data";

export function NumberInputPlayground() {
  const [appearance, setAppearance] = useState<FormAppearance>(
    NUMBERINPUT_APPEARANCES[0],
  );
  const [size, setSize] = useState<FormSize>(NUMBERINPUT_SIZES[1]);
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
      <PreviewCodeShowcase code={numberinputSnippet({ appearance, size })}>
        <div className="max-w-md">
          <NumberInputDemo appearance={appearance} size={size} />
        </div>
      </PreviewCodeShowcase>
    </>
  );
}
