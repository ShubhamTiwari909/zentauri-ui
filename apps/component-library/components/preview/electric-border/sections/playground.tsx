"use client";
import { useState } from "react";
import {
  ZuiElectricBorder,
  type ElectricBorderAppearance,
} from "@zentauri-ui/zentauri-components/ui/electric-border";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import {
  appearances,
  defaultOptions,
} from "../components/electric-border-code-examples.data";
import { electricBorderSnippet } from "../components/electric-border-code-examples.snippets";
import { ElectricBorderDemo } from "../components/electric-border-demo";

export function ElectricBorderPlayground() {
  const [options, setOptions] = useState(defaultOptions);
  const [replay, setReplay] = useState(0);
  function update<K extends keyof typeof defaultOptions>(
    key: K,
    value: (typeof defaultOptions)[K],
  ) {
    setOptions((previous) => ({ ...previous, [key]: value }));
  }
  const controlClass =
    "mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-cyan-300";
  return (
    <Section variant="plain" aria-labelledby="electric-playground-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-cyan-200">
            The current lab
          </p>
          <h2
            id="electric-playground-heading"
            className="mt-3 text-3xl font-semibold text-white"
          >
            Find your frequency.
          </h2>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/20 px-3 py-2 text-xs text-slate-200 focus-visible:outline-2 focus-visible:outline-cyan-300"
          onClick={() => {
            setOptions(defaultOptions);
            setReplay((value) => value + 1);
          }}
        >
          Reset controls
        </button>
      </div>
      <div className="mt-8 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0 rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
          <PreviewCodeShowcase code={electricBorderSnippet(options)}>
            <div
              data-testid="electric-playground-preview"
              className="flex min-h-110 items-center justify-center rounded-2xl bg-slate-100 px-5 py-14 sm:px-10 dark:bg-[#070c15]"
            >
              <ElectricBorderDemo key={replay} {...options} />
            </div>
          </PreviewCodeShowcase>
        </div>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <label className="block">
            Appearance
            <select
              className={controlClass}
              value={options.appearance}
              onChange={(event) =>
                update(
                  "appearance",
                  event.target.value as ElectricBorderAppearance,
                )
              }
            >
              {appearances.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          {(
            [
              ["Speed", "speed", 0, 3, 0.1, "×"],
              ["Intensity", "intensity", 0, 2, 0.1, ""],
              ["Thickness", "thickness", 0.5, 4, 0.5, "px"],
              ["Radius", "radius", 0, 80, 1, "px"],
            ] as const
          ).map(([label, key, min, max, step, unit]) => (
            <label key={key} className="block">
              <span className="flex justify-between gap-4">
                <span>{label}</span>
                <span className="font-mono text-cyan-200">
                  {options[key]}
                  {unit}
                </span>
              </span>
              <input
                type="range"
                className="mt-3 w-full accent-cyan-300"
                min={min}
                max={max}
                step={step}
                value={options[key]}
                onChange={(event) => update(key, Number(event.target.value))}
              />
            </label>
          ))}
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["Active", "active"],
                ["Interactive", "interactive"],
                ["Glow", "glow"],
                ["Sparks", "sparks"],
                ["Intro", "intro"],
                ["Reduce motion", "reducedMotion"],
              ] as const
            ).map(([label, key]) => (
              <label key={key} className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  className="accent-cyan-300"
                  checked={options[key]}
                  onChange={(event) => update(key, event.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setReplay((value) => value + 1)}
            className="w-full rounded-lg border border-white/20 px-3 py-2 text-xs focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            Replay intro
          </button>
          <p className="text-xs leading-5 text-slate-400">
            System reduced motion always takes priority. Use the page theme
            toggle to compare light and dark.
          </p>
        </div>
      </div>
      <p className="mb-5 mt-8 text-sm text-slate-300">
        Choose an appearance. The selected frame shows its live current.
      </p>
      <div
        aria-label="Electric border appearances"
        className="grid grid-cols-2 gap-6 rounded-2xl bg-slate-100 p-7 sm:grid-cols-3 lg:grid-cols-4 dark:bg-slate-950"
      >
        {appearances.map((appearance) => (
          <ZuiElectricBorder
            key={appearance}
            appearance={appearance}
            radius={14}
            intensity={options.intensity}
            active={options.active && appearance === options.appearance}
            reducedMotion={options.reducedMotion}
            sparks={false}
            interactive={false}
            intro={false}
          >
            <button
              type="button"
              aria-label={`Use ${appearance} appearance`}
              aria-pressed={appearance === options.appearance}
              onClick={() => update("appearance", appearance)}
              className="min-h-22 w-full rounded-[inherit] bg-white px-3 py-5 text-left text-xs text-slate-800 aria-pressed:font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-600 dark:bg-slate-900 dark:text-slate-100"
            >
              <span className="block break-words">{appearance}</span>
              <span className="mt-3 block text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {appearance === options.appearance ? "Selected" : "Select"}
              </span>
            </button>
          </ZuiElectricBorder>
        ))}
      </div>
    </Section>
  );
}
