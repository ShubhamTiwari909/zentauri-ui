import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  CarouselAutoPlayDemo,
  CarouselCompoundDemo,
  CarouselControlledDemo,
  CarouselMultiSlideDemo,
  CarouselVerticalDemo,
} from "./components/example-demos";
import { CarouselPlayground } from "./components/playground";
import {
  carouselAutoPlaySnippet,
  carouselCompoundSnippet,
  carouselControlledSnippet,
  carouselMultiSlideSnippet,
  carouselVerticalSnippet,
} from "./components/snippets";

export function CarouselCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Carousel playground
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        Slide width and track offset come from one piece of arithmetic, so every
        rest position lands exactly on a slide boundary whatever you set{" "}
        <code>slidesPerView</code> and the gap to. Toggle Show output / Show
        code and the snippet updates to match the selected variant — including
        the import, which switches to the animated entry as soon as you pick an
        animation or a reveal.
      </p>
      <CarouselPlayground />
      <div className="mt-10 space-y-10 rounded-xl">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Multiple slides per view
          </h3>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            <code>slidesPerView</code> divides the viewport, subtracting only
            the gaps that sit <em>between</em> visible slides. Six slides three
            at a time leaves four rest positions, not six, and the dots follow
            that count rather than the slide count.
          </p>
          <PreviewCodeShowcase code={carouselMultiSlideSnippet()}>
            <CarouselMultiSlideDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Vertical track
          </h3>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            <code>orientation=&quot;vertical&quot;</code> switches the track to
            a column, moves the arrows to the top and bottom edges, stacks the
            dots, and rebinds the keyboard to <code>ArrowUp</code> /{" "}
            <code>ArrowDown</code>. Percentage slide sizes need a definite
            height to resolve against, so the viewport ships a themeable default
            via <code>--zui-carousel-vertical-height</code>.
          </p>
          <PreviewCodeShowcase code={carouselVerticalSnippet()}>
            <CarouselVerticalDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Auto-play
          </h3>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Auto-play wraps at the end regardless of <code>loop</code>, because
            a timer that stops dead after one pass is not what anyone means by
            auto-play. It pauses while the pointer is over the carousel, while
            focus is inside it, and mid-drag — and it never starts at all under{" "}
            <code>prefers-reduced-motion</code>.
          </p>
          <PreviewCodeShowcase code={carouselAutoPlaySnippet()}>
            <CarouselAutoPlayDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Compound API
          </h3>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Compose the parts when the shorthand&apos;s layout is not the one
            you want. <code>Carousel.Content</code> hands each child its
            position, so <code>Carousel.Item</code> never takes an index prop,
            and the controls can go anywhere inside the root.
          </p>
          <PreviewCodeShowcase code={carouselCompoundSnippet()}>
            <CarouselCompoundDemo />
          </PreviewCodeShowcase>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
            Controlled index
          </h3>
          <p className="mb-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Pass <code>index</code> with <code>onIndexChange</code> to drive the
            track from your own state — useful when the carousel is one view of
            a step sequence that other controls also move.
          </p>
          <PreviewCodeShowcase code={carouselControlledSnippet()}>
            <CarouselControlledDemo />
          </PreviewCodeShowcase>
        </div>
      </div>
    </Section>
  );
}
