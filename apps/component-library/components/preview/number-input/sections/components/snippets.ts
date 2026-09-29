import type { NumberInputDemoProps } from "./demo";
export function numberinputSnippet({
  appearance,
  size,
}: NumberInputDemoProps): string {
  return `import { NumberInput } from "@zentauri-ui/zentauri-components/ui/number-input";

<NumberInput appearance="${appearance}" size="${size}" aria-label="Quantity" defaultValue={2} min={0} max={10} step={0.5} />`;
}
