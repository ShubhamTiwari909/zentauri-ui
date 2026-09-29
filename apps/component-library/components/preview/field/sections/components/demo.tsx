"use client";

import { Field } from "@zentauri-ui/zentauri-components/ui/field";
import type {
  FormAppearance,
  FormSize,
} from "@/components/preview/form-fields/appearance-controls";
export type FieldDemoProps = { appearance: FormAppearance; size: FormSize };
export function FieldDemo({ appearance, size }: FieldDemoProps) {
  return (
    <Field
      label="Project name"
      description="Shown to your team"
      appearance={appearance}
      size={size}
    >
      {(control) => (
        <input
          {...control}
          placeholder="Project Atlas"
          className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 outline-none dark:border-white/20"
        />
      )}
    </Field>
  );
}
