"use client";
import { useState } from "react";
import {
  DecryptedText,
  type DecryptedTextAppearance,
} from "@zentauri-ui/zentauri-components/ui/decrypted-text";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import {
  appearances,
  characterSets,
  effects,
  orders,
  triggers,
} from "../components/decrypted-text-code-examples.data";
import { decryptedTextSnippet } from "../components/decrypted-text-code-examples.snippets";

type CharacterSet = keyof typeof characterSets;

export function DecryptedTextPlayground() {
  const [text, setText] = useState("Access granted to the mainframe");
  const [appearance, setAppearance] =
    useState<DecryptedTextAppearance>("matrix");
  const [trigger, setTrigger] = useState<(typeof triggers)[number]>("view");
  const [order, setOrder] = useState<(typeof orders)[number]>("start");
  const [effect, setEffect] = useState<(typeof effects)[number]>("scramble");
  const [charset, setCharset] = useState<CharacterSet>("default");
  const [speed, setSpeed] = useState(50);
  const [iterations, setIterations] = useState(10);
  const [delay, setDelay] = useState(0);
  const [useOriginalChars, setUseOriginalChars] = useState(false);
  const [mono, setMono] = useState(false);
  const [run, setRun] = useState(0);
  const props = {
    appearance,
    trigger,
    order,
    effect,
    speed,
    iterations,
    delay,
    characters: characterSets[charset],
    useOriginalChars,
    className: mono ? "font-mono" : undefined,
  };
  const copy = text.trim() || "Access granted to the mainframe";
  const fieldClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white";
  const selects = [
    ["Trigger", trigger, setTrigger, triggers],
    ["Order", order, setOrder, orders],
    ["Effect", effect, setEffect, effects],
    ["Characters", charset, setCharset, Object.keys(characterSets)],
  ] as const;
  return (
    <Section variant="plain">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
            Your decoder
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Tune the signal.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-slate-400">
            Use the page theme toggle to compare light and dark.
          </p>
          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            Replay
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 rounded-3xl bg-slate-100 p-4 sm:p-5 dark:bg-slate-950">
          <PreviewCodeShowcase code={decryptedTextSnippet(copy, props)}>
            <div className="flex min-h-64 items-center rounded-3xl border border-slate-200 bg-white px-6 py-14 text-slate-900 sm:px-10 dark:border-white/10 dark:bg-[#05070d] dark:text-white">
              <DecryptedText
                key={run}
                as="p"
                {...props}
                className={`text-3xl font-semibold leading-tight tracking-tight sm:text-5xl ${mono ? "font-mono" : ""}`}
              >
                {copy}
              </DecryptedText>
            </div>
          </PreviewCodeShowcase>
          {trigger === "hover" ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Hover the text to decode it.
            </p>
          ) : null}
        </div>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <label className="block">
            Copy
            <input
              className={fieldClass}
              value={text}
              maxLength={80}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            {selects.map(([label, value, setter, options]) => (
              <label key={label}>
                {label}
                <select
                  className={fieldClass}
                  value={value}
                  onChange={(event) =>
                    (setter as (next: string) => void)(event.target.value)
                  }
                >
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          {(
            [
              ["Speed", speed, setSpeed, 16, 200, 2, "ms"],
              ["Iterations", iterations, setIterations, 1, 40, 1, ""],
              ["Delay", delay, setDelay, 0, 2000, 50, "ms"],
            ] as const
          ).map(([label, value, setter, min, max, step, unit]) => (
            <label key={label} className="block">
              <span className="flex justify-between">
                <span>{label}</span>
                <span className="font-mono text-emerald-200">
                  {value}
                  {unit}
                </span>
              </span>
              <input
                className="mt-2 w-full accent-emerald-300"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => setter(Number(event.target.value))}
              />
            </label>
          ))}
          <p className="text-xs text-slate-400">
            Iterations apply to the together order.
          </p>
          <div className="grid gap-2">
            {(
              [
                [
                  "Only letters from the text",
                  useOriginalChars,
                  setUseOriginalChars,
                ],
                ["Monospace font", mono, setMono],
              ] as const
            ).map(([label, checked, setter]) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  className="accent-emerald-300"
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => setter(event.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-4 mt-8 text-sm text-slate-300">
        Choose the colour of scrambled glyphs. Hover or focus a card to preview
        it.
      </p>
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-100 p-5 sm:grid-cols-3 xl:grid-cols-4 dark:bg-slate-950">
        {appearances.map((value) => (
          <div
            key={value}
            role="button"
            tabIndex={0}
            aria-label={`Use ${value} appearance`}
            aria-pressed={appearance === value}
            onClick={() => setAppearance(value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setAppearance(value);
              }
            }}
            className={`cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 font-mono text-lg font-semibold text-slate-900 outline-offset-4 focus-visible:outline-2 focus-visible:outline-emerald-400 dark:border-white/10 dark:bg-[#05070d] dark:text-white ${
              appearance === value ? "ring-2 ring-emerald-500" : ""
            }`}
          >
            <DecryptedText
              trigger="hover"
              appearance={value}
              order="together"
              iterations={8}
              speed={45}
            >
              {value}
            </DecryptedText>
          </div>
        ))}
      </div>
    </Section>
  );
}
