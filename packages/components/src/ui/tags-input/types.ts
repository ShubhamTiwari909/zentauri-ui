import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { tagsInputVariants } from "./variants";

export type TagsInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "size" | "value" | "defaultValue" | "onChange" | "type"
> &
  VariantProps<typeof tagsInputVariants> & {
    value?: readonly string[];
    defaultValue?: readonly string[];
    onValueChange?: (tags: string[]) => void;
    maxTags?: number;
    validateTag?: (tag: string) => boolean;
    onInvalidTag?: (
      tag: string,
      reason: "duplicate" | "limit" | "invalid",
    ) => void;
    delimiters?: readonly string[];
  };
