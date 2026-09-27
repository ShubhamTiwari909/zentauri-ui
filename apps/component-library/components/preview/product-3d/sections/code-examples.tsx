"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { cn } from "@/lib/utils";
import { product3DVariants } from "@zentauri-ui/zentauri-components/ui/product-3d";
import type { Product3DEnvironment, Product3DProps } from "@zentauri-ui/zentauri-components/ui/product-3d";
import { FOREST_ENVIRONMENT, PRODUCT_POSTER, product3DAppearances, product3DEnvironments } from "../components/product-3d-code-examples.data";
import { Product3DDemo } from "../components/product-3d-demo";
import { product3DSnippet } from "../components/product-3d-code-examples.snippets";

type Appearance = NonNullable<Product3DProps["appearance"]>;

export function Product3DCodeExamplesSection() {
  const [appearance, setAppearance] = useState<Appearance>("default");
  const [environment, setEnvironment] = useState<Product3DEnvironment>("studio");
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraControls, setCameraControls] = useState(true);
  const [zoom, setZoom] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [useEnvironmentMap, setUseEnvironmentMap] = useState(false);
  const options = { appearance, environment, autoRotate, cameraControls, zoom, showHotspots, useEnvironmentMap };

  return <Section>
    <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Product showcase playground</h2>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">Orbit the chair, zoom into the materials, open a hotspot, or expand the viewer to fullscreen.</p>
    <div className="my-5 grid gap-4 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4 dark:text-slate-200">
      <label className="flex flex-col gap-1.5">Appearance
        <select aria-label="Product appearance" value={appearance} onChange={(event) => setAppearance(event.target.value as Appearance)} className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
          {product3DAppearances.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">Lighting preset
        <select aria-label="Lighting preset" value={environment} onChange={(event) => setEnvironment(event.target.value as Product3DEnvironment)} className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
          {product3DEnvironments.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={autoRotate} onChange={(event) => setAutoRotate(event.target.checked)} /> Auto rotate</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={cameraControls} onChange={(event) => setCameraControls(event.target.checked)} /> Orbit controls</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={zoom} onChange={(event) => setZoom(event.target.checked)} /> Zoom</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={showHotspots} onChange={(event) => setShowHotspots(event.target.checked)} /> Hotspots</label>
      <label className="flex items-center gap-2"><input type="checkbox" checked={useEnvironmentMap} onChange={(event) => setUseEnvironmentMap(event.target.checked)} /> Forest environment map</label>
    </div>
    <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">GLB model and interactive annotations</p>
    <PreviewCodeShowcase code={product3DSnippet(options)}>
      <Product3DDemo appearance={appearance} environment={environment} autoRotate={autoRotate} cameraControls={cameraControls} zoom={zoom} showHotspots={showHotspots} environmentImage={useEnvironmentMap ? FOREST_ENVIRONMENT : undefined} />
    </PreviewCodeShowcase>
    <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-400">Install the optional renderer peers when using this entry: <code>pnpm add @google/model-viewer three</code>. Studio, soft, and neutral use the renderer’s built-in lighting; pass <code>environmentImage</code> to light the model with your own HDR or equirectangular map.</p>
    <h3 className="mt-12 text-lg font-semibold text-slate-900 dark:text-white">All appearances</h3>
    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Select a poster card to apply its accent to the live viewer.</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {product3DAppearances.map((value) => <div key={value} role="button" tabIndex={0} aria-label={`${value} product appearance`} aria-pressed={value === appearance}
        onClick={() => setAppearance(value)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setAppearance(value); } }}
        className={cn(product3DVariants({ appearance: value, size: "sm" }), "h-auto cursor-pointer p-2 focus-visible:outline-2 focus-visible:outline-sky-500", value === appearance && "ring-2 ring-sky-500")}>
        <div className="relative h-36 overflow-hidden rounded-lg">
          <Image src={PRODUCT_POSTER} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
          <span className="absolute bottom-2 left-2 size-4 rounded-full border-2 border-white bg-[color:var(--product-3d-accent)] shadow" />
        </div>
        <span className="block p-2 text-xs font-medium">{value}</span>
      </div>)}
    </div>
  </Section>;
}
