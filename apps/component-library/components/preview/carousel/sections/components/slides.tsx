import { CAROUSEL_SLIDE_DATA } from "./slide-data";

export type CarouselSlideProps = {
  label: string;
  body: string;
  tint: string;
  /** Taller panels make the vertical and multi-slide demos read better. */
  height?: string;
  /** Drops the body copy and tightens the padding for short panels. */
  compact?: boolean;
};

export function CarouselSlide({
  label,
  body,
  tint,
  height = "h-52",
  compact = false,
}: CarouselSlideProps) {
  return (
    <div
      className={`flex ${height} flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${tint} text-white ${
        compact ? "gap-0 p-3" : "gap-1 p-5"
      }`}
    >
      <p
        className={compact ? "text-sm font-semibold" : "text-lg font-semibold"}
      >
        {label}
      </p>
      {!compact && (
        <p className="line-clamp-2 max-w-sm text-sm text-white/80">{body}</p>
      )}
    </div>
  );
}

/** The first `count` demo panels, cycling the pool when more are asked for. */
export function buildCarouselSlides(
  count: number,
  height?: string,
  compact?: boolean,
) {
  return Array.from({ length: count }, (_, index) => {
    const slide = CAROUSEL_SLIDE_DATA[index % CAROUSEL_SLIDE_DATA.length];
    return (
      <CarouselSlide
        key={`${slide.id}-${index}`}
        label={slide.label}
        body={slide.body}
        tint={slide.tint}
        height={height}
        compact={compact}
      />
    );
  });
}

/**
 * Text-free neutral panels for the appearance gallery.
 *
 * A gallery swatch exists to show the accent, and the accent only appears on
 * the dots and the progress bar — so the slides themselves stay out of the way
 * rather than competing with it.
 */
export function buildCarouselSwatchSlides(count = 3) {
  return Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className="h-12 rounded-lg bg-slate-200/70 dark:bg-white/10"
    />
  ));
}
