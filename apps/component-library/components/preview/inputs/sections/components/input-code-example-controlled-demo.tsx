"use client";
import { useState } from "react";

import { Input } from "@zentauri-ui/zentauri-components/ui";

export function InputsControlledDemo() {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Type to update state"
      aria-label="Controlled field"
      animation="press"
      className="w-full"
    />
  );
}
