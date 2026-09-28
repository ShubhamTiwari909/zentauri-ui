"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { cn } from "@/lib/utils";
import { orbitSystemVariants } from "@zentauri-ui/zentauri-components/ui/orbit-system";
import type {
  OrbitSystemAppearance,
  OrbitSystemSize,
} from "@zentauri-ui/zentauri-components/ui/orbit-system";
import { orbitSystemAppearances } from "../components/orbit-system-code-examples.data";
import { orbitSystemSnippet } from "../components/orbit-system-code-examples.snippets";
import { OrbitSystemDemo } from "../components/orbit-system-demo";

const selectClass =
  "rounded-md border border-slate-300 bg-white px-2 py-1.5 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export function OrbitSystemCodeExamplesSection() {
  const [appearance, setAppearance] =
    useState<OrbitSystemAppearance>("default");
  const [size, setSize] = useState<OrbitSystemSize>("md");
  const [autoRotate, setAutoRotate] = useState(true);
  const [interactive, setInteractive] = useState(true);
  const options = { appearance, size, autoRotate, interactive };

  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Orbit system playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Drag the scene to change the viewing angle, scroll to zoom, or select a
        technology. Focus the scene for keyboard controls.
      </p>
      <div className="my-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4 dark:text-slate-200">
        <label className="flex flex-col gap-1.5">
          Appearance
          <select
            aria-label="Orbit appearance"
            value={appearance}
            onChange={(event) =>
              setAppearance(event.target.value as OrbitSystemAppearance)
            }
            className={selectClass}
          >
            {orbitSystemAppearances.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          Size
          <select
            aria-label="Orbit size"
            value={size}
            onChange={(event) => setSize(event.target.value as OrbitSystemSize)}
            className={selectClass}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(event) => setAutoRotate(event.target.checked)}
          />
          Auto rotate
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={interactive}
            onChange={(event) => setInteractive(event.target.checked)}
          />
          Interactive
        </label>
      </div>
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
        Two orbit technology map
      </p>
      <PreviewCodeShowcase code={orbitSystemSnippet(options)}>
        <OrbitSystemDemo {...options} />
      </PreviewCodeShowcase>
      <h3 className="mt-12 text-lg font-semibold text-slate-900 dark:text-white">
        All appearances
      </h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
        Select a palette to apply it to the live orbital scene.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {orbitSystemAppearances.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`${value} orbit appearance`}
            aria-pressed={value === appearance}
            onClick={() => setAppearance(value)}
            className={cn(
              orbitSystemVariants({ appearance: value, size: "sm" }),
              "h-36 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-500",
              value === appearance && "ring-2 ring-sky-500",
            )}
          >
            <span className="absolute left-1/2 top-[45%] h-16 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--zui-orbit-accent)]" />
            <span className="absolute left-1/2 top-[45%] size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--zui-orbit-accent)] shadow-[0_0_20px_var(--zui-orbit-accent)]" />
            <span className="absolute left-[calc(50%+3rem)] top-[45%] size-2 rounded-full bg-[color:var(--zui-orbit-accent)]" />
            <span className="absolute bottom-3 left-4 text-xs font-semibold">
              {value}
            </span>
          </button>
        ))}
      </div>
    </Section>
  );
}
