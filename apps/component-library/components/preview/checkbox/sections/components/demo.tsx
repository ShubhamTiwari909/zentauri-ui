"use client";

import { useState } from "react";
import { Checkbox } from "@zentauri-ui/zentauri-components/ui/checkbox";

import type { CheckboxDemoProps } from "./types";

export function CheckboxDemo({
  appearance,
  size,
  indeterminate,
  controlled,
}: CheckboxDemoProps) {
  const [checked, setChecked] = useState(true);

  if (controlled) {
    return (
      <Checkbox
        appearance={appearance}
        size={size}
        checked={checked}
        onCheckedChange={setChecked}
      >
        Controlled checkbox
      </Checkbox>
    );
  }

  return (
    <Checkbox
      appearance={appearance}
      size={size}
      defaultChecked={!indeterminate}
      indeterminate={indeterminate}
    >
      {indeterminate ? "Partially selected" : `${appearance} checkbox`}
    </Checkbox>
  );
}
