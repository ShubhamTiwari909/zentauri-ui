"use client";

import { createContext, useContext } from "react";

import type { RadioGroupAppearance, RadioGroupSize } from "./types";

export type RadioGroupContextValue = {
  value: string | undefined;
  name: string;
  disabled?: boolean;
  required?: boolean;
  appearance?: RadioGroupAppearance;
  size?: RadioGroupSize;
  onValueChange: (value: string) => void;
};

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
