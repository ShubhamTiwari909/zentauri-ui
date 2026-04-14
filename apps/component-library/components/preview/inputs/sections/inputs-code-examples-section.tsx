"use client";
import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import { Input } from "@/components/ui/inputs";
import InputCodeShowcase from "@/components/code-showcase/InputCodeShowcase";
import {
  animationPresets,
  sizeInputs,
  appearanceInputsExtended,
} from "../variants";
import { useState } from "react";

export function InputsCodeExamplesSection() {
  const [value, setValue] = useState("");
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          Input variants examples
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          Use Show output / Show code on each row to compare the live control with
          the JSX. Each snippet opens with a Variant line naming the axis and token.
        </p>
        <div className="mt-6 space-y-10 rounded-xl">
          {appearanceInputsExtended.map((row) => {
            const code =
              row.appearance === "default"
                ? `${variantLeadComment(`appearance · default (implicit)`)}<Input placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`
                : `${variantLeadComment(`appearance · ${row.appearance}`)}<Input appearance="${row.appearance}" placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`;
            return (
              <InputCodeShowcase
                key={row.label}
                code={code}
                label={`${row.label} demo`}
                placeholder={`${row.label} field`}
                appearance={row.appearance}
                animation="none"
                inputClassName="w-full"
              />
            );
          })}
          {animationPresets.map(([label, animation]) => {
            const code = `${variantLeadComment(`animation · ${animation}`)}<Input animation="${animation}" placeholder="${label} motion" aria-label="${label} motion" className="w-full" />`;
            return (
              <InputCodeShowcase
                key={`anim-${label}`}
                code={code}
                label={`${label} motion`}
                placeholder={`${label} motion`}
                animation={animation}
                inputClassName="w-full"
              />
            );
          })}
          {sizeInputs.map((row) => {
            const code = `${variantLeadComment(`size · ${row.size}`)}<Input size="${row.size}" placeholder="${row.label}" aria-label="${row.label} size" className="w-full" />`;
            return (
              <InputCodeShowcase
                key={`size-${row.label}`}
                code={code}
                label={`${row.label} size`}
                placeholder={row.label}
                size={row.size}
                animation="none"
                inputClassName="w-full"
              />
            );
          })}
          <InputCodeShowcase
            key="textarea-showcase"
            code={`${variantLeadComment(`as · textarea, animation · glow`)}<Input as="textarea" rows={4} placeholder="Describe the change" aria-label="Multiline (textarea)" animation="glow" className="w-full" />`}
            label="Multiline (textarea)"
            as="textarea"
            rows={4}
            animation="glow"
            placeholder="Describe the change"
            inputClassName="w-full"
          />
          <InputCodeShowcase
            key="password-type"
            code={`${variantLeadComment(`type · password, animation · glow`)}<Input type="password" animation="glow" placeholder="••••••••" aria-label="Password" className="w-full" />`}
            label="Password"
            type="password"
            animation="glow"
            placeholder="••••••••"
            inputClassName="w-full"
          />
          <InputCodeShowcase
            key="disabled-showcase"
            code={`${variantLeadComment(`state · disabled`)}<Input disabled defaultValue="Cannot edit" aria-label="Disabled" className="w-full" />`}
            label="Disabled"
            disabled
            defaultValue="Cannot edit"
            animation="none"
            inputClassName="w-full"
          />
          <InputCodeShowcase
            key="readonly-showcase"
            code={`${variantLeadComment(`state · readOnly`)}<Input readOnly defaultValue="Read only" aria-label="Read only" className="w-full" />`}
            label="Read only"
            readOnly
            defaultValue="Read only"
            animation="none"
            inputClassName="w-full"
          />
          <InputCodeShowcase
            key="controlled-showcase"
            code={`${variantLeadComment(`pattern · controlled value`)}
const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type to update state"
  aria-label="Controlled field"
  animation="press"
  className="w-full"
/>`}
            label="Controlled field"
            preview={
              <Input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Type to update state"
                aria-label="Controlled field"
                animation="press"
                className="w-full"
              />
            }
          />
          <InputCodeShowcase
            key="error-message-showcase"
            code={`${variantLeadComment(`appearance · error, errorMessage slot`)}<Input errorMessage="This is an error message" placeholder="Error message" aria-label="Error message" className="w-full" />`}
            label="Error message"
            appearance="error"
            errorMessage="This is an error message"
            placeholder="Error message"
            animation="none"
            inputClassName="w-full"
          />
          <InputCodeShowcase
            key="no-ring-showcase"
            code={`${variantLeadComment(`ring · false`)}<Input ring={false} placeholder="No outline ring" aria-label="No outline ring" className="w-full" />`}
            label="No outline ring"
            placeholder="No outline ring"
            animation="none"
            inputClassName="w-full"
            ring={false}
            appearance="info"
          />
          <InputCodeShowcase
            key="file-showcase"
            code={`${variantLeadComment(`as · file, appearance · violet`)}<Input as="file" type="file" appearance="violet" size="md" aria-label="Upload file" className="w-full" />`}
            label="File upload"
            as="file"
            type="file"
            appearance="violet"
            size="md"
            animation="none"
            inputClassName="w-full"
          />
          <div>
            <InputCodeShowcase
              key="checkbox-showcase"
              code={`${variantLeadComment(`as · checkbox, appearance · info, size · lg`)}
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
</label>`}
              label="Checkbox"
              preview={
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
              }
            />
          </div>
          <InputCodeShowcase
            key="radio-showcase"
            code={`${variantLeadComment(`as · radio, appearance · info`)}
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
/>`}
            label="Radio"
            preview={
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
            }
          />
          <InputCodeShowcase
            key="radio-group-showcase"
            code={`${variantLeadComment(`pattern · radio group, appearance · violet`)}
<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2 text-sm">
    <Input as="radio" type="radio" name="tier" value="starter" appearance="violet" size="md" aria-label="Starter" className="w-auto shrink-0" />
    Starter
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Input as="radio" type="radio" name="tier" value="pro" appearance="violet" size="md" defaultChecked aria-label="Pro" className="w-auto shrink-0" />
    Pro
  </label>
</div>`}
            label="Radio group"
            preview={
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
            }
          />
          <InputCodeShowcase
            key="date-showcase"
            code={`${variantLeadComment(`type · date, appearance · violet`)}
<Input as="input" type="date" appearance="violet" size="md" aria-label="Pick a date" className="w-auto shrink-0" />`}
            label="Date picker"
            as="input"
            type="date"
            appearance="violet"
            size="md"
            animation="none"
            inputClassName="w-auto shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
