import type { TagsInputDemoProps } from "./demo";
export function tagsinputSnippet({
  appearance,
  size,
}: TagsInputDemoProps): string {
  return `import { TagsInput } from "@zentauri-ui/zentauri-components/ui/tags-input";

<TagsInput appearance="${appearance}" size="${size}" aria-label="Tags" defaultValue={["design", "frontend"]} />`;
}
