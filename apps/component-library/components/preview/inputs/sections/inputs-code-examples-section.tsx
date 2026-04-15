"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Input } from "@repo/components/ui";
import {
  animationPresets,
  sizeInputs,
  appearanceInputsExtended,
} from "../variants";
import { useState } from "react";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

export function InputsCodeExamplesSection() {
  const [value, setValue] = useState("");
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Input variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Use Show output / Show code on each row to compare the live control with the
        JSX. Each snippet opens with a Variant line naming the axis and token.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {appearanceInputsExtended.map((row) => {
          const code =
            row.appearance === "default"
              ? `${variantLeadComment(`appearance · default (implicit)`)}<Input placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`
              : `${variantLeadComment(`appearance · ${row.appearance}`)}<Input appearance="${row.appearance}" placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`;
          return (
            <PreviewCodeShowcase key={row.label} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Appearance:{" "}
                <span className="font-bold">{row.appearance.toUpperCase()}</span>
              </p>
              <Input
                appearance={row.appearance === "default" ? undefined : row.appearance}
                placeholder={`${row.label} field`}
                aria-label={row.label}
                animation="none"
                className="w-full"
              />
            </PreviewCodeShowcase>
          );
        })}
        {animationPresets.map(([label, animation]) => {
          const code = `${variantLeadComment(`animation · ${animation}`)}<Input animation="${animation}" placeholder="${label} motion" aria-label="${label} motion" className="w-full" />`;
          return (
            <PreviewCodeShowcase key={`anim-${label}`} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Animation: <span className="font-bold">{animation.toUpperCase()}</span>
              </p>
              <Input
                animation={animation}
                placeholder={`${label} motion`}
                aria-label={`${label} motion`}
                className="w-full"
              />
            </PreviewCodeShowcase>
          );
        })}
        {sizeInputs.map((row) => {
          const code = `${variantLeadComment(`size · ${row.size}`)}<Input size="${row.size}" placeholder="${row.label}" aria-label="${row.label} size" className="w-full" />`;
          return (
            <PreviewCodeShowcase key={`size-${row.label}`} code={code}>
              <p className="mb-5 text-xs font-semibold text-white">
                Size: <span className="font-bold">{row.size.toUpperCase()}</span>
              </p>
              <Input
                size={row.size}
                placeholder={row.label}
                aria-label={`${row.label} size`}
                animation="none"
                className="w-full"
              />
            </PreviewCodeShowcase>
          );
        })}
        <PreviewCodeShowcase
          key="textarea-showcase"
          code={`${variantLeadComment(`as · textarea, animation · glow`)}<Input as="textarea" rows={4} placeholder="Describe the change" aria-label="Multiline (textarea)" animation="glow" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">TEXTAREA + GLOW</span>
          </p>
          <Input
            as="textarea"
            rows={4}
            animation="glow"
            placeholder="Describe the change"
            aria-label="Multiline (textarea)"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="password-type"
          code={`${variantLeadComment(`type · password, animation · glow`)}<Input type="password" animation="glow" placeholder="••••••••" aria-label="Password" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">PASSWORD</span>
          </p>
          <Input
            type="password"
            animation="glow"
            placeholder="••••••••"
            aria-label="Password"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="disabled-showcase"
          code={`${variantLeadComment(`state · disabled`)}<Input disabled defaultValue="Cannot edit" aria-label="Disabled" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            State: <span className="font-bold">DISABLED</span>
          </p>
          <Input
            disabled
            defaultValue="Cannot edit"
            aria-label="Disabled"
            animation="none"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="readonly-showcase"
          code={`${variantLeadComment(`state · readOnly`)}<Input readOnly defaultValue="Read only" aria-label="Read only" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            State: <span className="font-bold">READ ONLY</span>
          </p>
          <Input
            readOnly
            defaultValue="Read only"
            aria-label="Read only"
            animation="none"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
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
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">CONTROLLED</span>
          </p>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Type to update state"
            aria-label="Controlled field"
            animation="press"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="error-message-showcase"
          code={`${variantLeadComment(`appearance · error, errorMessage slot`)}<Input errorMessage="This is an error message" placeholder="Error message" aria-label="Error message" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Slot: <span className="font-bold">ERROR MESSAGE</span>
          </p>
          <Input
            appearance="error"
            errorMessage="This is an error message"
            placeholder="Error message"
            aria-label="Error message"
            animation="none"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="no-ring-showcase"
          code={`${variantLeadComment(`ring · false`)}<Input ring={false} placeholder="No outline ring" aria-label="No outline ring" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Ring: <span className="font-bold">FALSE</span>
          </p>
          <Input
            ring={false}
            appearance="info"
            placeholder="No outline ring"
            aria-label="No outline ring"
            animation="none"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="file-showcase"
          code={`${variantLeadComment(`as · file, appearance · violet`)}<Input as="file" type="file" appearance="violet" size="md" aria-label="Upload file" className="w-full" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">FILE</span>
          </p>
          <Input
            as="file"
            type="file"
            appearance="violet"
            size="md"
            aria-label="Upload file"
            animation="none"
            className="w-full"
          />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
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
        >
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">CHECKBOX</span>
          </p>
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
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
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
        >
          <p className="mb-5 text-xs font-semibold text-white">
            As: <span className="font-bold">RADIO</span>
          </p>
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
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
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
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Pattern: <span className="font-bold">RADIO GROUP</span>
          </p>
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
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="date-showcase"
          code={`${variantLeadComment(`type · date, appearance · violet`)}
<Input as="input" type="date" appearance="violet" size="md" aria-label="Pick a date" className="w-auto shrink-0" />`}
        >
          <p className="mb-5 text-xs font-semibold text-white">
            Type: <span className="font-bold">DATE</span>
          </p>
          <Input
            as="input"
            type="date"
            appearance="violet"
            size="md"
            animation="none"
            aria-label="Pick a date"
            className="w-auto shrink-0"
          />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
