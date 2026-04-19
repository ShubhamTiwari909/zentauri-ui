"use client";
import { useState } from "react";

import { InputAnimated } from "@zentauri-ui/zentauri-components/ui/inputs/animated";

export function InputsControlledDemo() {
  const [value, setValue] = useState("");
  return (
    <InputAnimated
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Type to update state"
      aria-label="Controlled field"
      animation="press"
      className="w-full"
    />
  );
}
