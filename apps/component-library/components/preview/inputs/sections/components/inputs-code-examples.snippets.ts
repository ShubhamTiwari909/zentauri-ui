import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type {
  AnimationPreset,
  AppearanceInputRow,
  SizeInputRow,
} from "./inputs-code-examples.types";

export function inputAppearanceSnippet(row: AppearanceInputRow): string {
  return row.appearance === "default"
    ? `${variantLeadComment(`appearance · default (implicit)`)}<Input placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`
    : `${variantLeadComment(`appearance · ${row.appearance}`)}<Input appearance="${row.appearance}" placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`;
}

export function inputAnimationSnippet(preset: AnimationPreset): string {
  const [label, animation] = preset;
  return `${variantLeadComment(`animation · ${animation}`)}<InputAnimated animation="${animation}" placeholder="${label} motion" aria-label="${label} motion" className="w-full" />`;
}

export function inputSizeSnippet(row: SizeInputRow): string {
  return `${variantLeadComment(`size · ${row.size}`)}<Input size="${row.size}" placeholder="${row.label}" aria-label="${row.label} size" className="w-full" />`;
}

export function inputTextareaSnippet(): string {
  return `${variantLeadComment(`as · textarea, animation · glow`)}<InputAnimated as="textarea" rows={4} placeholder="Describe the change" aria-label="Multiline (textarea)" animation="glow" className="w-full" />`;
}

export function inputPasswordSnippet(): string {
  return `${variantLeadComment(`type · password, animation · glow`)}<InputAnimated type="password" animation="glow" placeholder="••••••••" aria-label="Password" className="w-full" />`;
}

export function inputDisabledSnippet(): string {
  return `${variantLeadComment(`state · disabled`)}<Input disabled defaultValue="Cannot edit" aria-label="Disabled" className="w-full" />`;
}

export function inputReadOnlySnippet(): string {
  return `${variantLeadComment(`state · readOnly`)}<Input readOnly defaultValue="Read only" aria-label="Read only" className="w-full" />`;
}

export function inputControlledSnippet(): string {
  return `${variantLeadComment(`pattern · controlled value`)}
const [value, setValue] = useState("");

<InputAnimated
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type to update state"
  aria-label="Controlled field"
  animation="press"
  className="w-full"
/>`;
}

export function inputErrorMessageSnippet(): string {
  return `${variantLeadComment(`appearance · error, errorMessage slot`)}<Input errorMessage="This is an error message" placeholder="Error message" aria-label="Error message" className="w-full" />`;
}

export function inputNoRingSnippet(): string {
  return `${variantLeadComment(`ring · false`)}<Input ring={false} placeholder="No outline ring" aria-label="No outline ring" className="w-full" />`;
}

export function inputFileSnippet(): string {
  return `${variantLeadComment(`as · file, appearance · violet`)}<Input as="file" type="file" appearance="violet" size="md" aria-label="Upload file" className="w-full" />`;
}

export function inputCheckboxSnippet(): string {
  return `${variantLeadComment(`as · checkbox, appearance · info, size · lg`)}
<label>
  Accept Terms
  <Input
    as="checkbox"
    type="checkbox"
    name="plan"
    value="pro"
    appearance="info"
    size="lg"
    defaultChecked
    aria-label="Pro plan"
    className="w-auto shrink-0"
  />
</label>`;
}

export function inputRadioSnippet(): string {
  return `${variantLeadComment(`as · radio, appearance · info`)}
<Input
  as="radio"
  type="radio"
  name="plan"
  value="pro"
  appearance="info"
  size="md"
  defaultChecked
  aria-label="Pro plan"
  className="w-auto shrink-0"
/>`;
}

export function inputRadioGroupSnippet(): string {
  return `${variantLeadComment(`pattern · radio group, appearance · violet`)}
<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2 text-sm">
    <Input as="radio" type="radio" name="tier" value="starter" appearance="violet" size="md" aria-label="Starter" className="w-auto shrink-0" />
    Starter
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Input as="radio" type="radio" name="tier" value="pro" appearance="violet" size="md" defaultChecked aria-label="Pro" className="w-auto shrink-0" />
    Pro
  </label>
</div>`;
}

export function inputDateSnippet(): string {
  return `${variantLeadComment(`type · date, appearance · violet`)}
<Input as="input" type="date" appearance="violet" size="md" aria-label="Pick a date" className="w-auto shrink-0" />`;
}
