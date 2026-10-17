"use client";
import { useState } from "react";
import {
  ScrollExpand,
  type ScrollExpandAppearance,
} from "@zentauri-ui/zentauri-components/ui/scroll-expand";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Section } from "@/components/common/Section";
import {
  appearances,
  chair,
  forest,
  photo,
} from "../components/scroll-expand-code-examples.data";
import { ScrollExpandOverlay } from "../components/scroll-expand-overlay";
import { scrollExpandSnippet } from "../components/scroll-expand-code-examples.snippets";

const media = { night: photo, forest, chair } as const;
const overlay = {
  heading: "Every pixel, everywhere",
  body: "The frame opens as you scroll and hands the stage to your media.",
};

export function ScrollExpandPlayground() {
  const [title, setTitle] = useState("Built to scale");
  const [appearance, setAppearance] =
    useState<ScrollExpandAppearance>("default");
  const [image, setImage] = useState<keyof typeof media>("night");
  const [startWidth, setStartWidth] = useState(42);
  const [startHeight, setStartHeight] = useState(58);
  const [zoom, setZoom] = useState(1.35);
  const [distance, setDistance] = useState(1.2);
  const [hold, setHold] = useState(0.35);
  const [smoothing, setSmoothing] = useState(100);
  const [run, setRun] = useState(0);
  const props = {
    src: media[image],
    title: title.trim() || undefined,
    hint: "Scroll inside the frame",
    appearance,
    scroller: "self",
    startWidth,
    startHeight,
    zoom,
    distance,
    hold,
    smoothing,
    className: "h-[520px]",
  } as const;
  const fieldClass =
    "mt-2 w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-sm text-white";
  return (
    <Section variant="plain">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
            Your stage
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Tune the expansion.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-sm text-slate-400">
            Scroll inside the preview. Use the page theme toggle for light and
            dark.
          </p>
          <button
            type="button"
            onClick={() => setRun((value) => value + 1)}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Reset scroll
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_300px]">
        <div className="min-w-0 rounded-3xl bg-slate-100 p-4 sm:p-5 dark:bg-slate-950">
          <PreviewCodeShowcase code={scrollExpandSnippet(props, overlay)}>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#05070d]">
              <ScrollExpand key={run} {...props}>
                <ScrollExpandOverlay {...overlay} />
              </ScrollExpand>
            </div>
          </PreviewCodeShowcase>
        </div>
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
          <label className="block">
            Title
            <input
              className={fieldClass}
              value={title}
              maxLength={40}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="block">
            Media
            <select
              className={fieldClass}
              value={image}
              onChange={(event) =>
                setImage(event.target.value as keyof typeof media)
              }
            >
              {Object.keys(media).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          {(
            [
              ["Start width", startWidth, setStartWidth, 10, 100, 1, "%"],
              ["Start height", startHeight, setStartHeight, 10, 100, 1, "%"],
              ["Zoom", zoom, setZoom, 1, 2, 0.05, "×"],
              ["Distance", distance, setDistance, 0.2, 3, 0.1, "×"],
              ["Hold", hold, setHold, 0, 2, 0.05, "×"],
              ["Smoothing", smoothing, setSmoothing, 0, 400, 10, "ms"],
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
          <p className="text-xs text-slate-400">
            Distance and hold are measured in stage heights.
          </p>
        </div>
      </div>
      <p className="mb-4 mt-8 text-sm text-slate-300">
        Choose an appearance. It sets the scrim, the headline and overlay text,
        and the hint colour.
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
            className={`cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white outline-offset-4 focus-visible:outline-2 focus-visible:outline-cyan-400 dark:border-white/10 dark:bg-[#05070d] ${
              appearance === value ? "ring-2 ring-cyan-500" : ""
            }`}
          >
            <ScrollExpand
              aria-hidden="true"
              src={media[image]}
              appearance={value}
              title={value}
              scroller="self"
              tabIndex={-1}
              startWidth={70}
              startHeight={70}
              className="pointer-events-none h-36"
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
