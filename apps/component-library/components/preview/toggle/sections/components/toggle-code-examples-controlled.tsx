"use client";

import { useState } from "react";

import { ToggleAnimated } from "@zentauri-ui/zentauri-components/ui/toggle/animated";

export function ToggleControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <p className="mb-5 text-xs md:text-sm">
        Controlled:{" "}
        <span className="font-bold">{checked ? "Checked" : "Unchecked"}</span>
      </p>
      <ToggleAnimated
        checked={checked}
        onCheckedChange={setChecked}
        animation="spring"
        aria-label="Demo toggle"
      />
    </>
  );
}
