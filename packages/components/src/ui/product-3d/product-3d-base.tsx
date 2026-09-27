"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import {
  zuiProduct3DAnnotation,
  zuiProduct3DControl,
  zuiProduct3DHotspot,
  zuiProduct3DStatus,
} from "../../design-system/product-3d";
import { cn } from "../../lib/utils";
import type { Product3DEnvironment, Product3DHotspot, Product3DPosition, Product3DProps } from "./types";
import { product3DVariants } from "./variants";

type LoadState = "empty" | "loading" | "ready" | "error";
type LightingPreset = { exposure: number; shadowIntensity: number; shadowSoftness: number; toneMapping: "neutral" | "aces"; environmentImage?: string };

export const product3DLightingPresets: Record<Product3DEnvironment, LightingPreset> = {
  studio: { exposure: 1, shadowIntensity: 1, shadowSoftness: 0.7, toneMapping: "neutral" },
  soft: { exposure: 1.15, shadowIntensity: 0.45, shadowSoftness: 1, toneMapping: "neutral" },
  dramatic: { exposure: 0.85, shadowIntensity: 1.5, shadowSoftness: 0.2, toneMapping: "aces", environmentImage: "legacy" },
  neutral: { exposure: 1, shadowIntensity: 0.7, shadowSoftness: 0.8, toneMapping: "neutral" },
  legacy: { exposure: 1, shadowIntensity: 1, shadowSoftness: 0.6, toneMapping: "aces", environmentImage: "legacy" },
};

let modelViewerImport: Promise<unknown> | null = null;
function loadModelViewer() {
  if (!modelViewerImport) {
    modelViewerImport = import("@google/model-viewer").catch((error: unknown) => {
      modelViewerImport = null;
      throw error;
    });
  }
  return modelViewerImport;
}

function formatPosition(position: Product3DPosition): string {
  return position.map((value) => `${value}m`).join(" ");
}

function validHotspot(hotspot: Product3DHotspot): boolean {
  return Boolean(hotspot.id && hotspot.label && hotspot.position.every(Number.isFinite));
}

const EMPTY_HOTSPOTS: readonly Product3DHotspot[] = [];

export function Product3DBase({
  model, alt = "3D product model", poster, environment = "studio", environmentImage, skyboxImage,
  autoRotate = false, cameraControls = true, zoom = true, cameraOrbit, exposure, shadowIntensity,
  shadowSoftness, hotspots = EMPTY_HOTSPOTS, selectedHotspotId, defaultSelectedHotspotId = null,
  onHotspotSelect, onLoad, onError, onProgress, onFullscreenChange, showControls = true,
  showFullscreen = true, loadingContent, fallback, children, appearance = "default", size = "md",
  className, style, ref, onPointerEnter: onRootPointerEnter, onPointerLeave: onRootPointerLeave,
  onFocusCapture: onRootFocusCapture, onBlurCapture: onRootBlurCapture, ...rest
}: Product3DProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [loadState, setLoadState] = useState<LoadState>(model ? "loading" : "empty");
  const [progress, setProgress] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [internalSelectedHotspotId, setInternalSelectedHotspotId] = useState<string | null>(defaultSelectedHotspotId);
  const activeHotspotId = selectedHotspotId === undefined ? internalSelectedHotspotId : selectedHotspotId;
  const preset = product3DLightingPresets[environment];
  const callbacksRef = useRef({ onLoad, onError, onProgress });
  callbacksRef.current = { onLoad, onError, onProgress };

  useEffect(() => {
    const viewer = viewerRef.current;
    setLoadState(model ? "loading" : "empty");
    setProgress(0);
    if (!model || !viewer) return;
    let current = true;
    const handleLoad = () => { if (current) { setLoadState("ready"); setProgress(1); callbacksRef.current.onLoad?.(); } };
    const handleError = () => { if (current) { setLoadState("error"); callbacksRef.current.onError?.(); } };
    const handleProgress = (event: Event) => {
      const value = (event as CustomEvent<{ totalProgress?: number }>).detail?.totalProgress;
      if (current && typeof value === "number" && Number.isFinite(value)) {
        const next = Math.min(1, Math.max(0, value));
        setProgress(next);
        callbacksRef.current.onProgress?.(next);
      }
    };
    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("error", handleError);
    viewer.addEventListener("progress", handleProgress);
    void loadModelViewer().catch(() => handleError());
    return () => {
      current = false;
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("error", handleError);
      viewer.removeEventListener("progress", handleProgress);
    };
  }, [model]);

  useEffect(() => {
    const sync = () => {
      const next = document.fullscreenElement === rootRef.current;
      setFullscreen(next);
      onFullscreenChange?.(next);
    };
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, [onFullscreenChange]);

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!preference) return;
    const sync = () => setReduceMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  const selectHotspot = (id: string) => {
    const next = activeHotspotId === id ? null : id;
    if (selectedHotspotId === undefined) setInternalSelectedHotspotId(next);
    onHotspotSelect?.(next);
  };

  const changeZoom = (factor: number) => {
    const viewer = viewerRef.current;
    if (!viewer?.getCameraOrbit) return;
    const orbit = viewer.getCameraOrbit();
    if (!Number.isFinite(orbit.radius) || orbit.radius <= 0) return;
    viewer.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${Math.max(0.05, orbit.radius * factor)}m`;
    viewer.jumpCameraToGoal();
  };

  const toggleFullscreen = async () => {
    const root = rootRef.current;
    if (!root) return;
    if (document.fullscreenElement === root) await document.exitFullscreen();
    else if (root.requestFullscreen) await root.requestFullscreen();
  };

  const hotspotElements = hotspots.filter(validHotspot).map((hotspot) => {
    const selected = activeHotspotId === hotspot.id;
    return createElement("button", {
      key: hotspot.id,
      type: "button",
      slot: `hotspot-${hotspot.id}`,
      "data-slot": "product-3d-hotspot",
      "data-position": formatPosition(hotspot.position),
      "data-normal": (hotspot.normal ?? [0, 0, 1]).join(" "),
      "data-visibility-attribute": "visible",
      "aria-label": hotspot.label,
      "aria-expanded": selected,
      className: zuiProduct3DHotspot,
      onClick: () => selectHotspot(hotspot.id),
    },
      createElement("span", { "aria-hidden": "true", className: "size-2 rounded-full bg-white" }),
      selected ? createElement("span", { "data-slot": "product-3d-annotation", className: zuiProduct3DAnnotation },
        createElement("strong", { className: "block font-semibold" }, hotspot.label),
        hotspot.description != null ? createElement("span", { className: "block" }, hotspot.description) : null,
      ) : null,
    );
  });

  const viewer = model ? createElement("model-viewer", {
    ref: (element: HTMLElement | null) => { viewerRef.current = element as ModelViewerElement | null; },
    "data-slot": "product-3d-model",
    src: model,
    alt,
    poster,
    "camera-controls": cameraControls ? "" : undefined,
    "disable-zoom": zoom ? undefined : "",
    "auto-rotate": autoRotate && !rotationPaused && !reduceMotion ? "" : undefined,
    "camera-orbit": cameraOrbit,
    "environment-image": environmentImage ?? preset.environmentImage,
    "skybox-image": skyboxImage,
    "tone-mapping": preset.toneMapping,
    exposure: String(exposure ?? preset.exposure),
    "shadow-intensity": String(shadowIntensity ?? preset.shadowIntensity),
    "shadow-softness": String(shadowSoftness ?? preset.shadowSoftness),
    loading: "lazy",
    reveal: "auto",
    "interaction-prompt": "none",
    className: "block size-full",
    style: { width: "100%", height: "100%" },
  }, ...hotspotElements, children) : null;

  return (
    <div {...rest} ref={(element) => { rootRef.current = element; if (typeof ref === "function") ref(element); else if (ref) ref.current = element; }}
      data-slot="product-3d" data-state={loadState} role="group" aria-label={rest["aria-label"] ?? `${alt} viewer`}
      className={cn(product3DVariants({ appearance, size }), "fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none", className)} style={style}
      onPointerEnter={(event) => { onRootPointerEnter?.(event); setRotationPaused(true); }}
      onPointerLeave={(event) => { onRootPointerLeave?.(event); setRotationPaused(false); }}
      onFocusCapture={(event) => { onRootFocusCapture?.(event); setRotationPaused(true); }}
      onBlurCapture={(event) => { onRootBlurCapture?.(event); if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setRotationPaused(false); }}>
      {viewer}
      {poster && loadState !== "ready" ? <img data-slot="product-3d-poster" src={poster} alt="" className="pointer-events-none absolute inset-0 size-full object-cover" /> : null}
      {loadState === "empty" ? <div data-slot="product-3d-empty" className="absolute inset-0 grid place-items-center px-6 text-center text-sm">Add a GLB or glTF model to begin</div> : null}
      {loadState === "error" ? <div data-slot="product-3d-fallback" className="absolute inset-0 grid place-items-center bg-black/50 px-6 text-center text-sm text-white">
        {fallback ?? "The 3D model could not be loaded."}
      </div> : null}
      {loadState === "loading" ? <div data-slot="product-3d-loading" aria-live="polite" className={cn("pointer-events-none absolute bottom-3 left-3", zuiProduct3DStatus)}>
        {loadingContent ?? `Loading 3D model · ${Math.round(progress * 100)}%`}
      </div> : null}
      {loadState === "ready" && activeHotspotId ? <div className="sr-only" aria-live="polite">{hotspots.find((hotspot) => hotspot.id === activeHotspotId)?.label ?? ""} selected</div> : null}
      {showControls && model ? <div data-slot="product-3d-controls" className="absolute right-3 top-3 flex gap-1.5">
        {cameraControls && zoom ? <>
          <button type="button" aria-label="Zoom in" className={cn(zuiProduct3DControl, "size-9")} onClick={() => changeZoom(0.8)}>+</button>
          <button type="button" aria-label="Zoom out" className={cn(zuiProduct3DControl, "size-9")} onClick={() => changeZoom(1.25)}>−</button>
        </> : null}
        {cameraControls ? <button type="button" aria-label="Reset camera" className={cn(zuiProduct3DControl, "px-2.5 text-xs")} onClick={() => { const element = viewerRef.current; if (element) { element.cameraOrbit = cameraOrbit ?? "auto auto auto"; element.jumpCameraToGoal(); } }}>Reset</button> : null}
        {showFullscreen ? <button type="button" aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"} className={cn(zuiProduct3DControl, "px-2.5 text-xs")} onClick={() => { void toggleFullscreen(); }}>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</button> : null}
      </div> : null}
    </div>
  );
}

Product3DBase.displayName = "ZuiProduct3D";
