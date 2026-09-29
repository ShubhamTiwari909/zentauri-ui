import type { InputGroupDemoProps } from "./demo";
export function inputgroupSnippet({
  appearance,
  size,
}: InputGroupDemoProps): string {
  return `import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupAction } from "@zentauri-ui/zentauri-components/ui/input-group";

function AmountInput() {
  const [amount, setAmount] = useState("");
  return <InputGroup appearance="${appearance}" size="${size}">
    <InputGroupAddon>$</InputGroupAddon>
    <InputGroupInput aria-label="Amount" value={amount} onChange={(event) => setAmount(event.target.value)} />
    <InputGroupAction aria-label="Clear amount" onClick={() => setAmount("")}>×</InputGroupAction>
  </InputGroup>;
}`;
}
