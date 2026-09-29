"use client";

import { TagsInput } from "@zentauri-ui/zentauri-components/ui/tags-input";
import type {
  FormAppearance,
  FormSize,
} from "@/components/preview/form-fields/appearance-controls";
export type TagsInputDemoProps = { appearance: FormAppearance; size: FormSize };
export function TagsInputDemo({ appearance, size }: TagsInputDemoProps) {
  return (
    <TagsInput
      appearance={appearance}
      size={size}
      aria-label="Tags"
      defaultValue={["design", "frontend"]}
      placeholder="Add a tag"
    />
  );
}
