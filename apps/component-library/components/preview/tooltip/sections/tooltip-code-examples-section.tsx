"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipContentProps,
  type TooltipPosition,
} from "@/components/ui/tooltip";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TRIGGER_CLASS =
  "rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50";

const CONTENT_VARIANTS = ["default", "outline", "ghost"] as const satisfies readonly NonNullable<
  TooltipContentProps["variant"]
>[];

const CONTENT_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<
  TooltipContentProps["size"]
>[];

const CONTENT_WIDTHS = ["fit", "xs", "sm", "md", "lg", "xl", "2xl"] as const satisfies readonly NonNullable<
  TooltipContentProps["width"]
>[];

const TOOLTIP_POSITIONS = ["top", "bottom", "left", "right"] as const satisfies readonly TooltipPosition[];

const CONTENT_INTENTS = ["default", "success", "warning", "danger"] as const satisfies readonly NonNullable<
  TooltipContentProps["intent"]
>[];

const CONTENT_ANIMATIONS = ["fade", "scale", "none"] as const satisfies readonly NonNullable<
  TooltipContentProps["animation"]
>[];

type ContentVariant = (typeof CONTENT_VARIANTS)[number];
type ContentSize = (typeof CONTENT_SIZES)[number];
type ContentWidth = (typeof CONTENT_WIDTHS)[number];
type TooltipPlacement = (typeof TOOLTIP_POSITIONS)[number];
type ContentIntent = (typeof CONTENT_INTENTS)[number];
type ContentAnimation = (typeof CONTENT_ANIMATIONS)[number];

function contentVariantSizeSnippet(variant: ContentVariant, size: ContentSize) {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(
    `TooltipContent · variant · ${variant}, size · ${size}`,
  )}<Tooltip>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover · ${variant} · ${size}
  </TooltipTrigger>
  <TooltipContent${variantAttr}${sizeAttr}>
    Tooltip for ${variant} / ${size}.
  </TooltipContent>
</Tooltip>`;
}

function ContentVariantSizeDemo({
  variant,
  size,
}: {
  variant: ContentVariant;
  size: ContentSize;
}) {
  return (
    <Tooltip>
      <TooltipTrigger className={TRIGGER_CLASS}>
        Hover · Variant: {variant} · Size: {size}
      </TooltipTrigger>
      <TooltipContent variant={variant} size={size}>
        Tooltip for {variant} / {size}.
      </TooltipContent>
    </Tooltip>
  );
}

function positionSnippet(position: TooltipPlacement) {
  const positionAttr = position === "top" ? "" : ` position="${position}"`;
  return `${variantLeadComment(`Tooltip · position · ${position}`)}<Tooltip${positionAttr}>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover · position · ${position}
  </TooltipTrigger>
  <TooltipContent>
    Tooltip body (root position: ${position}).
  </TooltipContent>
</Tooltip>`;
}

function PositionDemo({ position }: { position: TooltipPlacement }) {
  return (
    <div className="flex min-h-44 w-full max-w-xl items-center justify-center p-10">
      <Tooltip position={position}>
        <TooltipTrigger className={TRIGGER_CLASS}>
          Hover · position · {position}
        </TooltipTrigger>
        <TooltipContent>
          Tooltip body (root position: {position}).
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function intentSnippet(intent: ContentIntent) {
  const intentAttr = intent === "default" ? "" : ` intent="${intent}"`;
  return `${variantLeadComment(`TooltipContent · intent · ${intent}`)}<Tooltip>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover · intent · ${intent}
  </TooltipTrigger>
  <TooltipContent${intentAttr}>
    Status tone: ${intent}.
  </TooltipContent>
</Tooltip>`;
}

function IntentDemo({ intent }: { intent: ContentIntent }) {
  return (
    <Tooltip>
      <TooltipTrigger className={TRIGGER_CLASS}>
        Hover · intent · {intent}
      </TooltipTrigger>
      <TooltipContent intent={intent}>
        Status tone: {intent}.
      </TooltipContent>
    </Tooltip>
  );
}

function animationSnippet(animation: ContentAnimation) {
  const animationAttr = animation === "fade" ? "" : ` animation="${animation}"`;
  return `${variantLeadComment(`TooltipContent · animation · ${animation}`)}<Tooltip>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover · animation · ${animation}
  </TooltipTrigger>
  <TooltipContent variant="outline"${animationAttr}>
    Motion preset: ${animation}.
  </TooltipContent>
</Tooltip>`;
}

function contentVariantWidthSnippet(variant: ContentVariant, width: ContentWidth) {
  const variantAttr = variant === "default" ? "" : ` variant="${variant}"`;
  const widthAttr = width === "fit" ? "" : ` width="${width}"`;
  return `${variantLeadComment(
    `TooltipContent · variant · ${variant}, width · ${width}`,
  )}<Tooltip>
  <TooltipTrigger className="${TRIGGER_CLASS}">
    Hover · {variant} · {width}
  </TooltipTrigger>
  <TooltipContent${variantAttr}${widthAttr}>
    Tooltip for {variant} / {width}.
  </TooltipContent>
</Tooltip>`;
}

function ContentVariantWidthDemo({ variant, width }: { variant: ContentVariant, width: ContentWidth }) {
  return (
    <Tooltip>
      <TooltipTrigger className={TRIGGER_CLASS}>
        Hover · Variant: {variant} · Width: {width}
      </TooltipTrigger>
      <TooltipContent variant={variant} width={width}>
        Tooltip for {variant} / {width}.
      </TooltipContent>
    </Tooltip>
  );
}

function AnimationDemo({ animation }: { animation: ContentAnimation }) {
  return (
    <Tooltip>
      <TooltipTrigger className={TRIGGER_CLASS}>
        Hover · animation · {animation}
      </TooltipTrigger>
      <TooltipContent variant="outline" animation={animation}>
        Motion preset: {animation}.
      </TooltipContent>
    </Tooltip>
  );
}

export function TooltipCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Variant code examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each block matches one combination. Open “Show code” to copy the JSX;
        the leading comment names the variant row.
      </p>

      <h3 className="mt-10 text-lg font-semibold text-white">
        TooltipContent — variant × size
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Surface style and padding scale. Root <code className="text-cyan-200/90">Tooltip</code>{" "}
        uses default{" "}
        <code className="text-cyan-200/90">{`position="top"`}</code> and{" "}
        <code className="text-cyan-200/90">delay</code> here.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_VARIANTS.flatMap((variant) =>
          CONTENT_SIZES.map((size) => (
            <PreviewCodeShowcase
              key={`content-${variant}-${size}`}
              code={contentVariantSizeSnippet(variant, size)}
            >
              <ContentVariantSizeDemo variant={variant} size={size} />
            </PreviewCodeShowcase>
          )),
        )}
      </div>
      <h3 className="mt-14 text-lg font-semibold text-white">TooltipContent — width</h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Width is controlled on the content; default is <code className="text-cyan-200/90">fit</code>.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_VARIANTS.flatMap((variant) =>
          CONTENT_WIDTHS.map((width) => (
            <PreviewCodeShowcase
              key={`content-${variant}-${width}`}
              code={contentVariantWidthSnippet(variant, width)}
            >
              <ContentVariantWidthDemo variant={variant} width={width} />
            </PreviewCodeShowcase>
          )),
        )}
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

      <h3 className="mt-14 text-lg font-semibold text-white">
        TooltipContent — intent
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Semantic background tones (default intent omits the prop in snippets).
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {CONTENT_INTENTS.map((intent) => (
          <PreviewCodeShowcase
            key={`intent-${intent}`}
            code={intentSnippet(intent)}
          >
            <IntentDemo intent={intent} />
          </PreviewCodeShowcase>
        ))}
      </div>

      <h3 className="mt-14 text-lg font-semibold text-white">
        TooltipContent — animation
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-slate-400">
        Enter motion tied to <code className="text-cyan-200/90">data-open</code>{" "}
        (fade is default and omitted in snippets).
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
