"use client";
import { useState } from "react";
import {
  MaskedHeading,
  type MaskedHeadingAppearance,
} from "@zentauri-ui/zentauri-components/ui/masked-heading";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import {
  aligns,
  appearances,
  demoImage,
  reveals,
  sizes,
  triggers,
} from "../components/masked-heading-code-examples.data";
import { maskedHeadingSnippet } from "../components/masked-heading-code-examples.snippets";

export function MaskedHeadingPlayground() {
  const [text, setText] = useState("Designed in the details");
  const [appearance, setAppearance] =
    useState<MaskedHeadingAppearance>("aurora");
  const [media, setMedia] = useState<"mesh" | "image">("mesh");
  const [reveal, setReveal] = useState<(typeof reveals)[number]>("rise");
  const [trigger, setTrigger] = useState<(typeof triggers)[number]>("view");
  const [size, setSize] = useState<(typeof sizes)[number]>("lg");
  const [align, setAlign] = useState<(typeof aligns)[number]>("center");
  const [duration, setDuration] = useState(1100);
  const [stagger, setStagger] = useState(90);
  const [delay, setDelay] = useState(0);
  const [parallax, setParallax] = useState(24);
  const [drift, setDrift] = useState(16);
  const [outline, setOutline] = useState(false);
  const [run, setRun] = useState(0);
  const props = {
    appearance,
    size,
    align,
    src: media === "image" ? demoImage : undefined,
    reveal,
    trigger,
    duration,
    stagger,
    delay,
    parallax,
    drift,
    outline,
  };
  const copy = text.trim() || "Designed in the details";
  const selectClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white";
  const selects = [
    ["Reveal", reveal, setReveal, reveals],
    ["Trigger", trigger, setTrigger, triggers],
    ["Size", size, setSize, sizes],
    ["Align", align, setAlign, aligns],
    ["Media", media, setMedia, ["mesh", "image"]],
  ] as const;
  return (
    <Section variant="plain">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Your type lab
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Tune the reveal.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-slate-400">
            Use the page theme toggle to compare light and dark.
          </p>
          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Replay entrance
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 rounded-3xl bg-slate-100 p-4 sm:p-5 dark:bg-slate-950">
          <PreviewCodeShowcase code={maskedHeadingSnippet(copy, props)}>
            <div className="flex min-h-100 items-center overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-14 sm:px-10 dark:border-white/10 dark:bg-[#07080f]">
              <MaskedHeading key={run} {...props} className="w-full">
                {copy}
              </MaskedHeading>
            </div>
          </PreviewCodeShowcase>
        </div>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <label className="block">
            Copy
            <input
              className={selectClass}
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
                  className={selectClass}
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
              ["Duration", duration, setDuration, 0, 3000, 50, "ms"],
              ["Stagger", stagger, setStagger, 0, 400, 10, "ms"],
              ["Delay", delay, setDelay, 0, 2000, 50, "ms"],
              ["Parallax", parallax, setParallax, 0, 80, 1, "px"],
              ["Drift", drift, setDrift, 0, 60, 1, "px"],
            ] as const
          ).map(([label, value, setter, min, max, step, unit]) => (
            <label key={label} className="block">
              <span className="flex justify-between">
                <span>{label}</span>
                <span className="font-mono text-cyan-200">
                  {value}
                  {unit}
                </span>
              </span>
              <input
                className="mt-2 w-full accent-cyan-300"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => setter(Number(event.target.value))}
              />
            </label>
          ))}
          <label className="flex items-center gap-2">
            <input
              className="accent-cyan-300"
              type="checkbox"
              checked={outline}
              onChange={(event) => setOutline(event.target.checked)}
            />
            Outline the letters
          </label>
        </div>
      </div>
      <p className="mb-4 mt-8 text-sm text-slate-300">
        Choose a gradient mesh. It shows through the letters whenever no image
        or video is set.
      </p>
      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-100 p-5 xl:grid-cols-4 dark:bg-slate-950">
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
            className={`cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 outline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-400 dark:border-white/10 dark:bg-[#07080f] ${
              appearance === value ? "ring-2 ring-cyan-500" : ""
            }`}
          >
            <MaskedHeading
              aria-hidden="true"
              level={3}
              size="sm"
              className="text-2xl"
              appearance={value}
              reveal="none"
              parallax={0}
              drift={0}
            >
              {value}
            </MaskedHeading>
          </div>
        ))}
      </div>
    </Section>
  );
}
