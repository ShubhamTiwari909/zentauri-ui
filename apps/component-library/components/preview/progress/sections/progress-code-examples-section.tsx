"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Progress,
  type ProgressProps,
} from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const PROGRESS_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "outline",
  "ghost",
  "glass",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
] as const satisfies readonly NonNullable<ProgressProps["appearance"]>[];

const PROGRESS_SIZES = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const satisfies readonly NonNullable<ProgressProps["size"]>[];

const PROGRESS_SHAPES = [
  "flat",
  "rounded",
  "pill",
] as const satisfies readonly NonNullable<ProgressProps["shape"]>[];

function progressAttrs(opts: {
  appearance: NonNullable<ProgressProps["appearance"]>;
  size: NonNullable<ProgressProps["size"]>;
  shape: NonNullable<ProgressProps["shape"]>;
  striped: boolean;
  animated: boolean;
}) {
  const { appearance, size, shape, striped, animated } = opts;
  const parts: string[] = [];
  if (appearance !== "default") {
    parts.push(`appearance="${appearance}"`);
  }
  if (size !== "md") {
    parts.push(`size="${size}"`);
  }
  if (shape !== "rounded") {
    parts.push(`shape="${shape}"`);
  }
  if (striped) {
    parts.push("striped");
  }
  if (animated) {
    parts.push("animated");
  }
  parts.push("value={42}");
  parts.push('animation="none"');
  const attr = parts.length ? ` ${parts.join(" ")}` : "";
  return attr;
}

function progressSnippet(opts: Parameters<typeof progressAttrs>[0]) {
  const { appearance, size, shape, striped, animated } = opts;
  const detail = [
    `appearance · ${appearance}`,
    `size · ${size}`,
    `shape · ${shape}`,
    striped ? "striped · true" : "striped · false",
    animated ? "animated · true" : "animated · false",
  ].join(", ");
  return `${variantLeadComment(detail)}<Progress${progressAttrs(opts)} />`;
}

function ProgressDemo(opts: Parameters<typeof progressAttrs>[0]) {
  const { appearance, size, shape, striped, animated } = opts;
  return (
    <div>
      <p className="mb-5 text-xs md:text-sm">
        Appearance: <span className="font-bold">{appearance.toUpperCase()}</span>, Size: <span className="font-bold">{size.toUpperCase()}</span>, Shape: <span className="font-bold">{shape.toUpperCase()}</span>, Striped: <span className="font-bold">{striped ? "true" : "false"}</span>, Animated: <span className="font-bold">{animated ? "true" : "false"}</span>
      </p>
      <Progress
        appearance={appearance}
        size={size}
        shape={shape}
        striped={striped}
        animated={animated}
        value={42}
        animation="none"
      />
    </div>
  );
}

export function ProgressCodeExamplesSection() {
  const defaults = {
    appearance: "default" as const,
    size: "md" as const,
    shape: "rounded" as const,
    striped: false,
    animated: false,
  };
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Progress variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Fill tokens, track scale, shape, and motion flags at a fixed value. Each
        snippet starts with Variant: listing the row tokens.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {PROGRESS_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={progressSnippet({ ...defaults, appearance })}
          >
            <ProgressDemo {...defaults} appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {PROGRESS_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={progressSnippet({ ...defaults, appearance: "indigo", size })}
          >
            <ProgressDemo {...defaults} appearance="indigo" size={size} />
          </PreviewCodeShowcase>
        ))}
        {PROGRESS_SHAPES.map((shape) => (
          <PreviewCodeShowcase
            key={`shape-${shape}`}
            code={progressSnippet({ ...defaults, appearance: "teal", shape })}
          >
            <ProgressDemo {...defaults} appearance="teal" shape={shape} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="striped"
          code={progressSnippet({
            ...defaults,
            appearance: "default",
            striped: true,
          })}
        >
          <ProgressDemo {...defaults} appearance="default" striped />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="animated"
          code={progressSnippet({
            ...defaults,
            appearance: "sky",
            animated: true,
          })}
        >
          <ProgressDemo {...defaults} appearance="sky" animated />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
