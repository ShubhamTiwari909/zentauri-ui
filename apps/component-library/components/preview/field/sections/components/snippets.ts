import type { FieldDemoProps } from "./demo";
export function fieldSnippet({ appearance, size }: FieldDemoProps): string {
  return `import { Field } from "@zentauri-ui/zentauri-components/ui/field";

<Field label="Project name" description="Shown to your team" appearance="${appearance}" size="${size}">{(control) => <input {...control} placeholder="Project Atlas" />}</Field>`;
}
