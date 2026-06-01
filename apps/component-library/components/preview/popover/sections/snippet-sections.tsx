import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  PopoverAnimationDemo,
  PopoverSideAlignDemo,
  PopoverVariantSizeDemo,
  PopoverWidthDemo,
} from "./components/demo";
import {
  POPOVER_ALIGNS,
  POPOVER_ANIMATIONS,
  POPOVER_SIDES,
  POPOVER_SIZES,
  POPOVER_VARIANTS,
  POPOVER_WIDTHS,
} from "./components/data";
import {
  popoverAnimationSnippet,
  popoverSideAlignSnippet,
  popoverVariantSizeSnippet,
  popoverWidthSnippet,
} from "./components/snippets";

export function PopoverCodeExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Popover variants examples
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        Use Show output / Show code on each row. Snippets start with a Variant
        line naming the axis and token.
      </p>
      <p className="text-cyan-400 font-semibold text-sm mt-2">For mobile viewport, all the popovers are top and start aligned so they won&rsquo;t overflow outside the screen</p>
      <div className="mt-6 space-y-10 rounded-xl">
        {POPOVER_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`variant-${variant}`}
            code={popoverVariantSizeSnippet(variant, "md")}
          >
            <p className="mb-5 text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
              Appearance:{" "}
              <span className="font-bold">{variant.toUpperCase()}</span>
            </p>
            <PopoverVariantSizeDemo variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
        {POPOVER_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={popoverVariantSizeSnippet("default", size)}
          >
            <p className="mb-5 text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
              Size: <span className="font-bold">{size.toUpperCase()}</span>
            </p>
            <PopoverVariantSizeDemo variant="default" size={size} />
          </PreviewCodeShowcase>
        ))}
        {POPOVER_WIDTHS.map((width) => (
          <PreviewCodeShowcase
            key={`width-${width}`}
            code={popoverWidthSnippet(width)}
          >
            <p className="mb-5 text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
              Width: <span className="font-bold">{width.toUpperCase()}</span>
            </p>
            <PopoverWidthDemo width={width} />
          </PreviewCodeShowcase>
        ))}
        {POPOVER_SIDES.flatMap((side) =>
          POPOVER_ALIGNS.map((align) => (
            <PreviewCodeShowcase
              key={`placement-${side}-${align}`}
              code={popoverSideAlignSnippet(side, align)}
            >
              <p className="mb-5 text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
                Placement:{" "}
                <span className="font-bold">
                  {side.toUpperCase()} / {align.toUpperCase()}
                </span>
              </p>
              <PopoverSideAlignDemo side={side} align={align} />
            </PreviewCodeShowcase>
          )),
        )}
        {POPOVER_ANIMATIONS.map((animation) => (
          <PreviewCodeShowcase
            key={`animation-${animation}`}
            code={popoverAnimationSnippet(animation)}
          >
            <p className="mb-5 text-xs md:text-sm font-semibold text-slate-900 dark:text-white">
              Animation:{" "}
              <span className="font-bold">{animation.toUpperCase()}</span>
            </p>
            <PopoverAnimationDemo animation={animation} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </Section>
  );
}
