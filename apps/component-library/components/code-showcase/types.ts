import { ButtonProps } from "@/components/ui/buttons/types";
import { inputVariants } from "@/components/ui/inputs/variants";
import type { VariantProps } from "class-variance-authority";
import type { InputAnimation } from "@/components/ui/inputs/types";
import type { HTMLInputTypeAttribute, ReactNode } from "react";

export type PreviewCodeShowcaseProps = {
  code: string;
  children: ReactNode;
};

export type ButtonCodeShowcaseProps = {
  code: string;
  appearance: ButtonProps["appearance"];
  animation: ButtonProps["animation"];
  label: string;
  buttonClassName?: string;
  size?: ButtonProps["size"];
};

export type InputCodeShowcaseProps = {
  code: string;
  ring?: boolean;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  appearance?: VariantProps<typeof inputVariants>["appearance"];
  size?: VariantProps<typeof inputVariants>["size"];
  as?: VariantProps<typeof inputVariants>["as"];
  rows?: number;
  animation?: InputAnimation;
  inputClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string;
  /** When set, shown in the “output” tab instead of a configured `Input` (e.g. controlled usage). */
  preview?: ReactNode;
};
