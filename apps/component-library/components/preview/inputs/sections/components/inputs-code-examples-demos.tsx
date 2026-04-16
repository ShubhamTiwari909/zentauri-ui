import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

import type { AnimationPreset, AppearanceInputRow, SizeInputRow } from "./inputs-code-examples.types";

export function InputsAppearanceDemo({ row }: { row: AppearanceInputRow }) {
  return (
    <Input
      appearance={row.appearance === "default" ? undefined : row.appearance}
      placeholder={`${row.label} field`}
      aria-label={row.label}
      animation="none"
      className="w-full"
    />
  );
}

export function InputsAnimationDemo({ preset }: { preset: AnimationPreset }) {
  const [label, animation] = preset;
  return (
    <Input
      animation={animation}
      placeholder={`${label} motion`}
      aria-label={`${label} motion`}
      className="w-full"
    />
  );
}

export function InputsSizeDemo({ row }: { row: SizeInputRow }) {
  return (
    <Input
      size={row.size}
      placeholder={row.label}
      aria-label={`${row.label} size`}
      animation="none"
      className="w-full"
    />
  );
}

export function InputsTextareaDemo() {
  return (
    <Input
      as="textarea"
      rows={4}
      animation="glow"
      placeholder="Describe the change"
      aria-label="Multiline (textarea)"
      className="w-full"
    />
  );
}

export function InputsPasswordDemo() {
  return (
    <Input
      type="password"
      animation="glow"
      placeholder="••••••••"
      aria-label="Password"
      className="w-full"
    />
  );
}

export function InputsDisabledDemo() {
  return (
    <Input
      disabled
      defaultValue="Cannot edit"
      aria-label="Disabled"
      animation="none"
      className="w-full"
    />
  );
}

export function InputsReadOnlyDemo() {
  return (
    <Input
      readOnly
      defaultValue="Read only"
      aria-label="Read only"
      animation="none"
      className="w-full"
    />
  );
}
export function InputsErrorMessageDemo() {
  return (
    <Input
      appearance="error"
      errorMessage="This is an error message"
      placeholder="Error message"
      aria-label="Error message"
      animation="none"
      className="w-full"
    />
  );
}

export function InputsNoRingDemo() {
  return (
    <Input
      ring={false}
      appearance="info"
      placeholder="No outline ring"
      aria-label="No outline ring"
      animation="none"
      className="w-full"
    />
  );
}

export function InputsFileDemo() {
  return (
    <Input
      as="file"
      type="file"
      appearance="violet"
      size="md"
      aria-label="Upload file"
      animation="none"
      className="w-full"
    />
  );
}

export function InputsCheckboxDemo() {
  return (
    <label className="flex w-full items-center gap-5 text-xl">
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
        className="shrink-0"
      />
    </label>
  );
}

export function InputsRadioDemo() {
  return (
    <Input
      as="radio"
      type="radio"
      name="inputs-preview-showcase-plan"
      value="pro"
      appearance="info"
      size="md"
      defaultChecked
      animation="none"
      aria-label="Pro plan"
      className="w-auto shrink-0"
    />
  );
}

export function InputsRadioGroupDemo() {
  return (
    <div className="flex max-w-md flex-col gap-5 rounded-xl border border-white/10 bg-white/2 p-4">
      <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-200">
        <Input
          as="radio"
          type="radio"
          name="inputs-preview-showcase-tier"
          value="starter"
          appearance="violet"
          size="md"
          animation="none"
          aria-label="Starter tier"
          className="w-auto shrink-0"
        />
        Starter
      </label>
      <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-200">
        <Input
          as="radio"
          type="radio"
          name="inputs-preview-showcase-tier"
          value="pro"
          appearance="violet"
          size="md"
          defaultChecked
          animation="none"
          aria-label="Pro tier"
          className="w-auto shrink-0"
        />
        Pro
      </label>
    </div>
  );
}

export function InputsDateDemo() {
  return (
    <Input
      as="input"
      type="date"
      appearance="violet"
      size="md"
      animation="none"
      aria-label="Pick a date"
      className="w-auto shrink-0"
    />
  );
}
