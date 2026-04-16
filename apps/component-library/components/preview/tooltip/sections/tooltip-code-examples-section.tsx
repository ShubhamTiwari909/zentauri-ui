import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  AnimationDemo,
  ContentVariantSizeDemo,
  ContentVariantWidthDemo,
  PositionDemo,
} from "./components/tooltip-code-examples-demos";
import {
  CONTENT_ANIMATIONS,
  CONTENT_SIZES,
  CONTENT_VARIANTS,
  CONTENT_WIDTHS,
  TOOLTIP_CODE_EXAMPLES_SECTION_CLASS,
  TOOLTIP_POSITIONS,
} from "./components/tooltip-code-examples.data";
import {
  animationSnippet,
  contentVariantSizeSnippet,
  contentVariantWidthSnippet,
  positionSnippet,
} from "./components/tooltip-code-examples.snippets";

export function TooltipCodeExamplesSection() {
  return (
    <section className={TOOLTIP_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Variant code examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each block matches one combination. Open “Show code” to copy the JSX; the leading
        comment names the variant row.
      </p>

      <h3 className="mt-10 text-lg font-semibold text-white">TooltipContent — variant</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Surface style and padding scale. Root{" "}
        <code className="text-cyan-200/90">Tooltip</code> uses default{" "}
        <code className="text-cyan-200/90">{`position="top"`}</code> and{" "}
        <code className="text-cyan-200/90">delay</code> here.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_VARIANTS.map((variant) => (
          <PreviewCodeShowcase
            key={`content-${variant}-md`}
            code={contentVariantSizeSnippet(variant, "md")}
          >
            <ContentVariantSizeDemo variant={variant} size="md" />
          </PreviewCodeShowcase>
        ))}
      </div>
      <h3 className="mt-10 text-lg font-semibold text-white">TooltipContent — size</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Surface style and padding scale. Root{" "}
        <code className="text-cyan-200/90">Tooltip</code> uses default{" "}
        <code className="text-cyan-200/90">{`position="top"`}</code> and{" "}
        <code className="text-cyan-200/90">delay</code> here.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`content-default-${size}`}
            code={contentVariantSizeSnippet("default", size)}
          >
            <ContentVariantSizeDemo variant="default" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
      <h3 className="mt-14 text-lg font-semibold text-white">TooltipContent — width</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Width is controlled on the content; default is{" "}
        <code className="text-cyan-200/90">fit</code>.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_WIDTHS.map((width) => (
          <PreviewCodeShowcase
            key={`content-default-${width}`}
            code={contentVariantWidthSnippet("default", width)}
          >
            <ContentVariantWidthDemo variant="default" width={width} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">Tooltip — position</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Placement is controlled on the root; content still picks up{" "}
        <code className="text-cyan-200/90">data-open</code> for animation classes.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TOOLTIP_POSITIONS.map((position) => (
          <PreviewCodeShowcase
            key={`position-${position}`}
            code={positionSnippet(position)}
          >
            <PositionDemo position={position} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">TooltipContent — animation</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Enter motion tied to <code className="text-cyan-200/90">data-open</code> (fade is
        default and omitted in snippets).
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_ANIMATIONS.map((animation) => (
          <PreviewCodeShowcase
            key={`animation-${animation}`}
            code={animationSnippet(animation)}
          >
            <AnimationDemo animation={animation} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
