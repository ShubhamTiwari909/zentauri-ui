"use client";

import { useState } from "react";

import { Input, InputCodeShowcase } from "@/components/ui/inputs";
import {
  animationPresets,
  sizeInputs,
  appearanceInputs,
  appearanceInputsExtended,
} from "./variants";

export default function InputsPreviewPage() {
  const [controlled, setControlled] = useState("");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_25%),linear-gradient(180deg,#020617_0%,#020617_100%)] text-slate-50">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-12 sm:px-10 lg:px-12">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
              Component library
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Input with appearance, size, and motion presets.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Built like the button: CVA variants, Framer Motion presets, full
                native input props, and{" "}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
                  {'data-slot="input"'}
                </code>{" "}
                for stable targeting.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="grid gap-3">
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </label>
              <Input
                animation="lift"
                placeholder="you@example.com"
                aria-label="Email"
              />
              <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Password
              </label>
              <Input
                type="password"
                animation="glow"
                placeholder="••••••••"
                aria-label="Password"
              />
              <label className="text-xs font-medium uppercase tracking-wide text-rose-200/90">
                Error state
              </label>
              <Input
                appearance="error"
                defaultValue="invalid@"
                animation="none"
                aria-label="Invalid email example"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              Appearance
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Default, error, and success appearances
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Use `appearance` for validation styling. Error sets `aria-invalid`
              unless you override it.
            </p>
            <div className="mt-6 grid gap-4">
              {appearanceInputs.map((row) => (
                <div key={row.label} className="grid gap-2">
                  <span className="text-xs text-slate-400">{row.label}</span>
                  <Input
                    appearance={row.appearance}
                    placeholder={`${row.label} field`}
                    aria-label={`${row.label} demo`}
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
              Motion presets
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Optional focus and hover motion
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Same preset names as the button: `lift`, `press`, `glow`, `tilt`,
              `bounce`, or `none`.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {animationPresets.map(([label, animation]) => (
                <div key={label} className="grid gap-2">
                  <span className="text-xs text-slate-400">{label}</span>
                  <Input
                    animation={animation}
                    placeholder="Focus me"
                    aria-label={`${label} motion demo`}
                  />
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                Multiline
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                <code className="text-cyan-200/90">
                  as=&quot;textarea&quot;
                </code>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Same CVA recipe, motion presets, and{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
                data-slot=&quot;input&quot;
              </code>{" "}
              as the single-line control; height uses min-height and vertical
              resize so longer copy stays comfortable.
            </p>
          </div>
          <div className="mt-6 grid max-w-2xl gap-2">
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Description
            </label>
            <Input
              as="textarea"
              rows={4}
              animation="lift"
              placeholder="What should reviewers focus on?"
              aria-label="Pull request description"
            />
          </div>
        </section>

        {/* ── File upload ─────────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                File upload
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                <code className="text-cyan-200/90">as=&quot;file&quot;</code>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Wraps{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
                {'<input type="file">'}
              </code>{" "}
              with the same CVA recipe. The native file-selector button inherits
              the active appearance colour, and all three sizes are supported.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="grid gap-2">
                <span className="text-xs text-slate-400">{size}</span>
                <Input
                  as="file"
                  size={size}
                  type="file"
                  appearance="violet"
                  aria-label={`File upload ${size}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── Checkbox ────────────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                Checkbox
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                <code className="text-cyan-200/90">
                  as=&quot;checkbox&quot;
                </code>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Native{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
                type=&quot;checkbox&quot;
              </code>{" "}
              with the same <code className="text-cyan-100/90">appearance</code>{" "}
              tokens as text fields;{" "}
              <code className="text-cyan-100/90">size</code> maps to control
              dimensions.
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Appearances
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {appearanceInputsExtended.map((row) => (
                <label
                  key={`cb-${row.label}`}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-slate-200 transition hover:border-white/10"
                >
                  <Input
                    as="checkbox"
                    type="checkbox"
                    size="md"
                    appearance={row.appearance}
                    defaultChecked={row.appearance === "success"}
                    animation="none"
                    aria-label={`${row.label} checkbox`}
                    className="w-auto shrink-0"
                  />
                  <span>{row.label}</span>
                </label>
              ))}
            </div>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide text-slate-500">
              Sizes
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-6">
              {(["sm", "md", "lg"] as const).map((size) => (
                <label
                  key={`cb-size-${size}`}
                  className="flex cursor-pointer items-center gap-2 text-xs text-slate-400"
                >
                  <Input
                    as="checkbox"
                    type="checkbox"
                    size={size}
                    appearance="violet"
                    animation="none"
                    aria-label={`Checkbox size ${size}`}
                    className="w-auto shrink-0"
                  />
                  <span className="uppercase tracking-wide">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* ── Radio ─────────────────────────────────────────────────────────── */}
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                Radio
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                <code className="text-cyan-200/90">as=&quot;radio&quot;</code>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Native{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
                type=&quot;radio&quot;
              </code>{" "}
              uses the same accent mapping when checked; use a shared{" "}
              <code className="text-cyan-100/90">name</code> for mutually
              exclusive options.
            </p>
          </div>
          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Appearances
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {appearanceInputsExtended.map((row) => (
                <label
                  key={`rb-${row.label}`}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/5 bg-white/2 px-3 py-2.5 text-sm text-slate-200 transition hover:border-white/10"
                >
                  <Input
                    as="radio"
                    type="radio"
                    name={`radio-appearance-${row.appearance}`}
                    value={row.appearance}
                    size="md"
                    appearance={row.appearance}
                    defaultChecked={row.appearance === "default"}
                    animation="none"
                    aria-label={`${row.label} radio`}
                    className="w-auto shrink-0"
                  />
                  <span>{row.label}</span>
                </label>
              ))}
            </div>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide text-slate-500">
              Sizes
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-6">
              {(["sm", "md", "lg"] as const).map((size) => (
                <label
                  key={`rb-size-${size}`}
                  className="flex cursor-pointer items-center gap-2 text-xs text-slate-400"
                >
                  <Input
                    as="radio"
                    type="radio"
                    name={`radio-size-${size}`}
                    value={size}
                    size={size}
                    appearance="info"
                    animation="none"
                    aria-label={`Radio size ${size}`}
                    className="w-auto shrink-0"
                  />
                  <span className="uppercase tracking-wide">{size}</span>
                </label>
              ))}
            </div>
            <p className="mt-8 text-xs font-medium uppercase tracking-wide text-slate-500">
              Group
            </p>
            <div className="mt-3 grid max-w-md gap-2 rounded-xl border border-white/10 bg-white/2 p-4">
              {(["Starter", "Pro", "Enterprise"] as const).map(
                (tier, index) => (
                  <label
                    key={tier}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-200"
                  >
                    <Input
                      as="radio"
                      type="radio"
                      name="inputs-preview-plan-tier"
                      value={tier.toLowerCase()}
                      size="md"
                      appearance="violet"
                      defaultChecked={index === 1}
                      animation="none"
                      aria-label={`${tier} plan`}
                      className="w-auto shrink-0"
                    />
                    <span>{tier}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
                Sizes
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                sm, md, lg
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Heights align with the button scale. Pass `disabled`, `readOnly`,
              `autoComplete`, and any other native attribute alongside variants.
            </p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {sizeInputs.map((row) => (
              <div key={row.label} className="grid gap-2">
                <span className="text-xs text-slate-400">{row.label}</span>
                <Input
                  size={row.size}
                  placeholder={row.label}
                  aria-label={`${row.label} size`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            States
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Disabled and read-only
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <span className="text-xs text-slate-400">Disabled</span>
              <Input
                disabled
                defaultValue="Cannot edit"
                aria-label="Disabled example"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-xs text-slate-400">Read only</span>
              <Input
                readOnly
                defaultValue="account@corp.com"
                aria-label="Read only example"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/30 backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Controlled
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Value driven by React state
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Current value:{" "}
            <code className="rounded bg-slate-950/80 px-2 py-0.5 text-cyan-200">
              {controlled || "(empty)"}
            </code>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {
              'The same state is wired to the controlled example in "Input variants examples" below.'
            }
          </p>
          <div className="mt-4 max-w-md">
            <Input
              value={controlled}
              onChange={(e) => setControlled(e.target.value)}
              placeholder="Type to update state"
              aria-label="Controlled input demo"
              animation="press"
            />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
          <div>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Input variants examples
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Use Show output / Show code on each row to compare the live
              control with the JSX, same pattern as the button preview.
            </p>
            <div className="mt-6 space-y-10 rounded-xl">
              {appearanceInputsExtended.map((row) => {
                const code =
                  row.appearance === "default"
                    ? `<Input placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`
                    : `<Input appearance="${row.appearance}" placeholder="${row.label} field" aria-label="${row.label}" className="w-full" />`;
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
                const code = `<Input animation="${animation}" placeholder="${label} motion" aria-label="${label} motion" className="w-full" />`;
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
                const code = `<Input size="${row.size}" placeholder="${row.label}" aria-label="${row.label} size" className="w-full" />`;
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
                code={`<Input as="textarea" rows={4} placeholder="Describe the change" aria-label="Multiline (textarea)" animation="glow" className="w-full" />`}
                label="Multiline (textarea)"
                as="textarea"
                rows={4}
                animation="glow"
                placeholder="Describe the change"
                inputClassName="w-full"
              />
              <InputCodeShowcase
                key="password-type"
                code={`<Input type="password" animation="glow" placeholder="••••••••" aria-label="Password" className="w-full" />`}
                label="Password"
                type="password"
                animation="glow"
                placeholder="••••••••"
                inputClassName="w-full"
              />
              <InputCodeShowcase
                key="disabled-showcase"
                code={`<Input disabled defaultValue="Cannot edit" aria-label="Disabled" className="w-full" />`}
                label="Disabled"
                disabled
                defaultValue="Cannot edit"
                animation="none"
                inputClassName="w-full"
              />
              <InputCodeShowcase
                key="readonly-showcase"
                code={`<Input readOnly defaultValue="Read only" aria-label="Read only" className="w-full" />`}
                label="Read only"
                readOnly
                defaultValue="Read only"
                animation="none"
                inputClassName="w-full"
              />
              <InputCodeShowcase
                key="controlled-showcase"
                code={`const [value, setValue] = useState("");

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
                    value={controlled}
                    onChange={(e) => setControlled(e.target.value)}
                    placeholder="Type to update state"
                    aria-label="Controlled field"
                    animation="press"
                    className="w-full"
                  />
                }
              />
              <InputCodeShowcase
                key="error-message-showcase"
                code={`<Input errorMessage="This is an error message" placeholder="Error message" aria-label="Error message" className="w-full" />`}
                label="Error message"
                appearance="error"
                errorMessage="This is an error message"
                placeholder="Error message"
                animation="none"
                inputClassName="w-full"
              />
              <InputCodeShowcase
                key="no-ring-showcase"
                code={`<Input ring={false} placeholder="No outline ring" aria-label="No outline ring" className="w-full" />`}
                label="No outline ring"
                placeholder="No outline ring"
                animation="none"
                inputClassName="w-full"
                ring={false}
                appearance="info"
              />
              <InputCodeShowcase
                key="file-showcase"
                code={`<Input as="file" type="file" appearance="violet" size="md" aria-label="Upload file" className="w-full" />`}
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
                  code={`<label>
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
                    <label className="flex items-center gap-5 w-full text-xl">
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
                code={`<Input
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
                code={`<div className="flex flex-col gap-2">
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
                code={`<Input as="input" type="date" appearance="violet" size="md" aria-label="Pick a date" className="w-auto shrink-0" />`}
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
      </main>
    </div>
  );
}
