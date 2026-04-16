"use client";
import PreviewCodeShowcase from '@/components/code-showcase/PreviewCodeShowcase';
import { variantLeadComment } from '@/components/common/variant-code-prefix';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@zentauri-ui/zentauri-components/ui';
import React, { useState } from 'react'

const SelectCodeExamplesControlled = () => {
  const [controlledValues, setControlledValues] = useState<string[]>(["react"]);
    
  return (
    <PreviewCodeShowcase
    code={`${variantLeadComment("Controlled · value + onChange, emerald trigger")}
const [value, setValue] = useState<string[]>(["react"]);

<Select multiple value={value} onChange={setValue}>
<SelectTrigger variant="emerald" size="lg">
<SelectValue placeholder="Libraries" />
</SelectTrigger>
<SelectContent appearance="default" size="sm">
<SelectItem value="react">React</SelectItem>
<SelectItem value="vue">Vue</SelectItem>
<SelectItem value="svelte">Svelte</SelectItem>
</SelectContent>
</Select>`}
  >
    <Select multiple value={controlledValues} onChange={setControlledValues}>
      <SelectTrigger variant="emerald" size="lg">
        <SelectValue placeholder="Libraries" />
      </SelectTrigger>
      <SelectContent appearance="default" size="sm">
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
      </SelectContent>
    </Select>
  </PreviewCodeShowcase>
  )
}

export default SelectCodeExamplesControlled;
