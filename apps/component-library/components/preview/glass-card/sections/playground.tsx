"use client";
import { useState } from "react";
import {
  ZuiGlassCard,
  type GlassCardProps,
} from "@zentauri-ui/zentauri-components/ui/glass-card";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import {
  appearances,
  materials,
} from "../components/glass-card-code-examples.data";
import { glassCardSnippet } from "../components/glass-card-code-examples.snippets";
import { GlassCardDemo } from "../components/glass-card-demo";

export function GlassCardPlayground() {
  const [variant, setVariant] =
    useState<NonNullable<GlassCardProps["variant"]>>("crystal");
  const [appearance, setAppearance] =
    useState<NonNullable<GlassCardProps["appearance"]>>("cyan");
  const [size, setSize] = useState<NonNullable<GlassCardProps["size"]>>("md");
  const [intensity, setIntensity] = useState(12);
  const [perspective, setPerspective] = useState(1000);
  const [scale, setScale] = useState(1.02);
  const [depth, setDepth] = useState(20);
  const [glareIntensity, setGlareIntensity] = useState(0.15);
  const [glowIntensity, setGlowIntensity] = useState(0.2);
  const [glare, setGlare] = useState(true);
  const [glow, setGlow] = useState(true);
  const [floating, setFloating] = useState(false);
  const [interactive, setInteractive] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const props = {
    variant,
    appearance,
    size,
    intensity,
    perspective,
    scale,
    depth,
    glareIntensity,
    glowIntensity,
    glare,
    glow,
    floating,
    interactive,
    disabled,
    reducedMotion,
  };
  const selectClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white";
  return (
    <Section variant="plain">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Your material lab
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Tune the feeling.
          </h2>
        </div>
        <p className="text-sm text-slate-400">
          Use the page theme toggle to compare light and dark.
        </p>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="rounded-3xl bg-slate-100 p-4 sm:p-5 dark:bg-slate-950">
          <PreviewCodeShowcase code={glassCardSnippet(props)}>
            <div className="relative isolate flex min-h-100 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-slate-100 p-10 dark:bg-slate-950">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,#22d3ee50,transparent_45%),radial-gradient(circle_at_80%_80%,#a78bfa50,transparent_50%)]"
              />
              <GlassCardDemo {...props} />
            </div>
          </PreviewCodeShowcase>
        </div>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <div className="grid grid-cols-2 gap-3">
            <label>
              Material
              <select
                className={selectClass}
                value={variant}
                onChange={(e) => setVariant(e.target.value as typeof variant)}
              >
                {materials.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label>
              Size
              <select
                className={selectClass}
                value={size}
                onChange={(e) => setSize(e.target.value as typeof size)}
              >
                {["sm", "md", "lg"].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>
          {(
            [
              ["Tilt", intensity, setIntensity, 0, 30, 1, "°"],
              [
                "Perspective",
                perspective,
                setPerspective,
                200,
                2000,
                100,
                "px",
              ],
              ["Scale", scale, setScale, 1, 1.15, 0.01, "×"],
              ["Depth", depth, setDepth, 0, 60, 1, "px"],
              [
                "Glare opacity",
                glareIntensity,
                setGlareIntensity,
                0,
                1,
                0.05,
                "",
              ],
              ["Glow opacity", glowIntensity, setGlowIntensity, 0, 1, 0.05, ""],
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
                onChange={(e) => setter(Number(e.target.value))}
              />
            </label>
          ))}
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                ["Glare", glare, setGlare],
                ["Glow", glow, setGlow],
                ["Floating", floating, setFloating],
                ["Interactive", interactive, setInteractive],
                ["Disabled", disabled, setDisabled],
                ["Reduce motion", reducedMotion, setReducedMotion],
              ] as const
            ).map(([label, checked, setter]) => (
              <label key={label} className="flex items-center gap-2">
                <input
                  className="accent-cyan-300"
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setter(e.target.checked)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-4 mt-8 text-sm text-slate-300">
        Choose an appearance. Every card has its own pointer interaction.
      </p>
      <div className="grid gap-4 rounded-2xl bg-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-4 dark:bg-slate-950">
        {appearances.map((value) => (
          <ZuiGlassCard
            key={value}
            appearance={value}
            variant={variant}
            size="sm"
            role="button"
            tabIndex={0}
            aria-label={`Use ${value} appearance`}
            aria-pressed={appearance === value}
            className={`cursor-pointer outline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-400 ${appearance === value ? "ring-2 ring-cyan-500" : ""}`}
            onClick={() => setAppearance(value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setAppearance(value);
              }
            }}
          >
            <ZuiGlassCard.Content className="flex min-h-28 flex-col justify-between gap-4">
              <span aria-hidden="true" className="text-xl">
                ◇
              </span>
              <span className="text-sm font-medium">{value}</span>
            </ZuiGlassCard.Content>
          </ZuiGlassCard>
        ))}
      </div>
    </Section>
  );
}
