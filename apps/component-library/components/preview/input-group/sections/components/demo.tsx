"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupAction,
} from "@zentauri-ui/zentauri-components/ui/input-group";
import type {
  FormAppearance,
  FormSize,
} from "@/components/preview/form-fields/appearance-controls";
export type InputGroupDemoProps = {
  appearance: FormAppearance;
  size: FormSize;
};
export function InputGroupDemo({ appearance, size }: InputGroupDemoProps) {
  const [amount, setAmount] = useState("");
  return (
    <div>
      <InputGroup appearance={appearance} size={size}>
        <InputGroupAddon>$</InputGroupAddon>
        <InputGroupInput
          aria-label="Amount"
          placeholder="0.00"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <InputGroupAction
          aria-label="Clear amount"
          onClick={() => setAmount("")}
        >
          ×
        </InputGroupAction>
      </InputGroup>
    </div>
  );
}
