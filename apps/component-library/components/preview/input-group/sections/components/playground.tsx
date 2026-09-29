"use client";
import { useState } from "react";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  AppearanceControls,
  type FormAppearance,
  type FormSize,
} from "@/components/preview/form-fields/appearance-controls";
import { InputGroupDemo } from "./demo";
import { inputgroupSnippet } from "./snippets";
import { INPUTGROUP_APPEARANCES, INPUTGROUP_SIZES } from "./data";

export function InputGroupPlayground() {
  const [appearance, setAppearance] = useState<FormAppearance>(
    INPUTGROUP_APPEARANCES[0],
  );
  const [size, setSize] = useState<FormSize>(INPUTGROUP_SIZES[1]);
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
      <PreviewCodeShowcase code={inputgroupSnippet({ appearance, size })}>
        <div className="max-w-md">
          <InputGroupDemo appearance={appearance} size={size} />
        </div>
      </PreviewCodeShowcase>
    </>
  );
}
