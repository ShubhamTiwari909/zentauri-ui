"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Carousel } from "@zentauri-ui/zentauri-components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import {
  CAROUSEL_ANIMATIONS,
  CAROUSEL_APPEARANCES,
  CAROUSEL_ARROWS,
  CAROUSEL_FRAMES,
  CAROUSEL_ORIENTATIONS,
  CAROUSEL_REVEALS,
  CAROUSEL_SIZES,
  CAROUSEL_SLIDE_COUNTS,
  CAROUSEL_SLIDES_PER_VIEW,
} from "./data";
import { CarouselDemo } from "./demo";
import { buildCarouselSwatchSlides } from "./slides";
import { carouselSnippet } from "./snippets";
import type {
  CarouselAppearanceOption,
  CarouselArrowsOption,
  CarouselDemoProps,
  CarouselFrameOption,
  CarouselOrientationOption,
  CarouselSizeOption,
} from "./types";

type VariantSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function VariantSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: VariantSelectProps<T>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <Select
        multiple={false}
        value={[value]}
        onChange={(values) => {
          const next = values[0];
          if (next) {
            onChange(next as T);
          }
        }}
      >
        <SelectTrigger variant="outline" size="sm" className="w-full">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent
          appearance="default"
          size="sm"
          className="max-h-72 overflow-y-auto"
        >
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

type ToggleChipProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
};

function ToggleChip({ label, active, onToggle }: ToggleChipProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-slate-900 dark:text-white">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={active}
        onClick={onToggle}
        className={`flex h-9 items-center justify-center rounded-lg border px-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
          active
            ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/20"
        }`}
      >
        {active ? "on" : "off"}
      </button>
    </label>
  );
}

const GALLERY_SLIDES = buildCarouselSwatchSlides(3);

type AppearanceGalleryProps = {
  selected: CarouselAppearanceOption;
  onSelect: (appearance: CarouselAppearanceOption) => void;
};

function AppearanceGallery({ selected, onSelect }: AppearanceGalleryProps) {
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-slate-900 dark:text-white">
        All appearances
      </p>
      <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-600 dark:text-slate-400">
        An appearance publishes one accent, read as a background by the active
        dot and the progress bar — which is why the <code>gradient-*</code>{" "}
        entries work exactly like the solid ones. Click any swatch to load it
        into the playground above.
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CAROUSEL_APPEARANCES.map((appearance) => {
          const isActive = appearance === selected;
          return (
            // A native <button> can't wrap this: Carousel renders its own
            // <button> controls, and <button> cannot nest inside <button>.
            <div
              key={appearance}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              onClick={() => onSelect(appearance)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(appearance);
                }
              }}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl p-3 text-left transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isActive
                  ? "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950"
                  : "ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-white/10 dark:hover:ring-white/20"
              }`}
            >
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {appearance}
              </span>
              {/* inert takes the nested controls out of the tab order and out
                  of click handling, so only the tile itself is interactive. */}
              <div className="pointer-events-none" inert>
                <Carousel
                  aria-label={`${appearance} preview`}
                  appearance={appearance}
                  size="sm"
                  index={1}
                  arrows={false}
                  progress
                >
                  {GALLERY_SLIDES}
                </Carousel>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CarouselPlayground() {
  const [appearance, setAppearance] =
    useState<CarouselAppearanceOption>("gradient-blue");
  const [size, setSize] = useState<CarouselSizeOption>("md");
  const [orientation, setOrientation] =
    useState<CarouselOrientationOption>("horizontal");
  const [frame, setFrame] = useState<CarouselFrameOption>("card");
  const [animation, setAnimation] =
    useState<(typeof CAROUSEL_ANIMATIONS)[number]>("none");
  const [reveal, setReveal] =
    useState<(typeof CAROUSEL_REVEALS)[number]>("none");
  const [arrows, setArrows] = useState<CarouselArrowsOption>("inside");
  const [slideCount, setSlideCount] = useState<string>("5");
  const [slidesPerView, setSlidesPerView] = useState<string>("1");
  const [loop, setLoop] = useState(true);
  const [draggable, setDraggable] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dots, setDots] = useState(true);
  const [counter, setCounter] = useState(false);
  const [progress, setProgress] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const demoProps: CarouselDemoProps = {
    appearance,
    size,
    orientation,
    frame,
    animation,
    reveal,
    arrows,
    slideCount: Number(slideCount),
    slidesPerView: Number(slidesPerView),
    loop,
    draggable,
    autoPlay,
    dots,
    counter,
    progress,
    disabled,
  };

  const code = carouselSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <VariantSelect
          label="Appearance"
          value={appearance}
          options={CAROUSEL_APPEARANCES}
          onChange={setAppearance}
        />
        <VariantSelect
          label="Size"
          value={size}
          options={CAROUSEL_SIZES}
          onChange={setSize}
        />
        <VariantSelect
          label="Orientation"
          value={orientation}
          options={CAROUSEL_ORIENTATIONS}
          onChange={setOrientation}
        />
        <VariantSelect
          label="Frame"
          value={frame}
          options={CAROUSEL_FRAMES}
          onChange={setFrame}
        />
        <VariantSelect
          label="Slides"
          value={slideCount}
          options={CAROUSEL_SLIDE_COUNTS}
          onChange={setSlideCount}
        />
        <VariantSelect
          label="Per view"
          value={slidesPerView}
          options={CAROUSEL_SLIDES_PER_VIEW}
          onChange={setSlidesPerView}
        />
        <VariantSelect
          label="Arrows"
          value={arrows}
          options={CAROUSEL_ARROWS}
          onChange={setArrows}
        />
        <VariantSelect
          label="Animation"
          value={animation}
          options={CAROUSEL_ANIMATIONS}
          onChange={setAnimation}
        />
        <VariantSelect
          label="Reveal"
          value={reveal}
          options={CAROUSEL_REVEALS}
          onChange={setReveal}
        />
        <ToggleChip
          label="Loop"
          active={loop}
          onToggle={() => setLoop((value) => !value)}
        />
        <ToggleChip
          label="Draggable"
          active={draggable}
          onToggle={() => setDraggable((value) => !value)}
        />
        <ToggleChip
          label="Auto-play"
          active={autoPlay}
          onToggle={() => setAutoPlay((value) => !value)}
        />
        <ToggleChip
          label="Dots"
          active={dots}
          onToggle={() => setDots((value) => !value)}
        />
        <ToggleChip
          label="Counter"
          active={counter}
          onToggle={() => setCounter((value) => !value)}
        />
        <ToggleChip
          label="Progress"
          active={progress}
          onToggle={() => setProgress((value) => !value)}
        />
        <ToggleChip
          label="Disabled"
          active={disabled}
          onToggle={() => setDisabled((value) => !value)}
        />
      </div>
      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
        Focus the viewport and walk it with the arrow keys — Home and End jump
        to the first and last rest position. You can also drag the track with a
        pointer; releasing past a fifth of a slide advances, anything shorter
        snaps back.
      </p>
      <PreviewCodeShowcase code={code}>
        <CarouselDemo {...demoProps} />
      </PreviewCodeShowcase>
      <AppearanceGallery selected={appearance} onSelect={setAppearance} />
    </div>
  );
}
