import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import type { hashGeneratorVariants } from "./variants";

export type HashGeneratorAlgorithm =
  | "sha1"
  | "sha224"
  | "sha256"
  | "sha384"
  | "sha512";

export type HashGeneratorVariantProps = VariantProps<
  typeof hashGeneratorVariants
>;

export interface HashGeneratorBaseProps extends ComponentPropsWithRef<"div"> {
  algorithm?: HashGeneratorAlgorithm;
  value?: string;
  onValueChange?: (value: string) => void;
  readOnly?: boolean;
  showCopyButton?: boolean;
  appearance?: HashGeneratorVariantProps["appearance"];
  size?: HashGeneratorVariantProps["size"];
}

export type HashGeneratorProps = HashGeneratorBaseProps;

export const ALGORITHM_LABELS: Record<HashGeneratorAlgorithm, string> = {
  sha1: "SHA-1",
  sha224: "SHA-224",
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
} as const;
