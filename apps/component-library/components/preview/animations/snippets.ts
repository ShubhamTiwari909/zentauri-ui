import type { AnimationPreviewSlug } from "@/lib/animations-preview-registry";
import { animationPreviewLabels } from "@/lib/animations-preview-registry";
import type { AnimationPreviewMotionProps } from "./by-slug";

const componentNames: Record<AnimationPreviewSlug, string> = {
  "fade-in": "FadeIn",
  "fade-out": "FadeOut",
  "fade-up": "FadeUp",
  "fade-down": "FadeDown",
  "fade-left": "FadeLeft",
  "fade-right": "FadeRight",
  "scale-in": "ScaleIn",
  "scale-out": "ScaleOut",
  "pop-in": "PopIn",
  "blur-in": "BlurIn",
  "blur-out": "BlurOut",
  "slide-up": "SlideUp",
  "slide-down": "SlideDown",
  "slide-left": "SlideLeft",
  "slide-right": "SlideRight",
  "reveal-up": "RevealUp",
  "reveal-down": "RevealDown",
  "reveal-left": "RevealLeft",
  "reveal-right": "RevealRight",
  "reveal-blur": "RevealBlur",
  "text-reveal": "TextReveal",
  "text-shimmer": "TextShimmer",
  "rotate-in": "RotateIn",
  pulse: "Pulse",
  ping: "Ping",
  shake: "Shake",
  bounce: "Bounce",
  wiggle: "Wiggle",
  float: "Float",
  spin: "Spin",
  flip: "Flip",
  "flip-in": "FlipIn",
  tilt: "Tilt",
  magnetic: "Magnetic",
  "hover-lift": "HoverLift",
  "hover-scale": "HoverScale",
  press: "Press",
  reorder: "Reorder",
  "skeleton-shimmer": "SkeletonShimmer",
  progress: "Progress",
  parallax: "Parallax",
};

const infiniteTransitionSlugs = new Set<AnimationPreviewSlug>([
  "fade-out",
  "scale-out",
  "blur-out",
]);

type AnimationOverrideExample = Pick<
  AnimationPreviewMotionProps,
  "from" | "to" | "exitTo"
>;

export const animationOverrideExamples: Record<
  AnimationPreviewSlug,
  AnimationOverrideExample
> = {
  "fade-in": {
    from: { opacity: 0.18 },
    to: { opacity: 1 },
    exitTo: { opacity: 0.08 },
  },
  "fade-out": {
    from: { opacity: 1 },
    to: { opacity: 0.12 },
    exitTo: { opacity: 0 },
  },
  "fade-up": {
    from: { opacity: 0.2, y: 28 },
    to: { opacity: 1, y: 0 },
    exitTo: { opacity: 0, y: 12 },
  },
  "fade-down": {
    from: { opacity: 0.2, y: -28 },
    to: { opacity: 1, y: 0 },
    exitTo: { opacity: 0, y: -12 },
  },
  "fade-left": {
    from: { opacity: 0.2, x: 28 },
    to: { opacity: 1, x: 0 },
    exitTo: { opacity: 0, x: 12 },
  },
  "fade-right": {
    from: { opacity: 0.2, x: -28 },
    to: { opacity: 1, x: 0 },
    exitTo: { opacity: 0, x: -12 },
  },
  "scale-in": {
    from: { opacity: 0.2, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    exitTo: { opacity: 0, scale: 0.96 },
  },
  "scale-out": {
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0.12, scale: 0.88 },
    exitTo: { opacity: 0, scale: 0.92 },
  },
  "pop-in": {
    from: { opacity: 0.2, scale: 0.84 },
    to: { opacity: 1, scale: 1 },
    exitTo: { opacity: 0, scale: 0.92 },
  },
  "blur-in": {
    from: { opacity: 0.18, blur: 18 },
    to: { opacity: 1, blur: 0 },
    exitTo: { opacity: 0, blur: 10 },
  },
  "blur-out": {
    from: { opacity: 1, blur: 0 },
    to: { opacity: 0.12, blur: 18 },
    exitTo: { opacity: 0, blur: 18 },
  },
  "slide-up": {
    from: { y: 40 },
    to: { y: 0 },
    exitTo: { y: 18 },
  },
  "slide-down": {
    from: { y: -40 },
    to: { y: 0 },
    exitTo: { y: -18 },
  },
  "slide-left": {
    from: { x: 40 },
    to: { x: 0 },
    exitTo: { x: 18 },
  },
  "slide-right": {
    from: { x: -40 },
    to: { x: 0 },
    exitTo: { x: -18 },
  },
  "reveal-up": {
    from: { opacity: 0.16, y: 30, scale: 0.96 },
    to: { opacity: 1, y: 0, scale: 1 },
    exitTo: { opacity: 0, y: 12, scale: 0.98 },
  },
  "reveal-down": {
    from: { opacity: 0.16, y: -30, scale: 0.96 },
    to: { opacity: 1, y: 0, scale: 1 },
    exitTo: { opacity: 0, y: -12, scale: 0.98 },
  },
  "reveal-left": {
    from: { opacity: 0.16, x: 30, scale: 0.96 },
    to: { opacity: 1, x: 0, scale: 1 },
    exitTo: { opacity: 0, x: 12, scale: 0.98 },
  },
  "reveal-right": {
    from: { opacity: 0.16, x: -30, scale: 0.96 },
    to: { opacity: 1, x: 0, scale: 1 },
    exitTo: { opacity: 0, x: -12, scale: 0.98 },
  },
  "reveal-blur": {
    from: { opacity: 0.16, y: 20, blur: 20 },
    to: { opacity: 1, y: 0, blur: 0 },
    exitTo: { opacity: 0, y: 8, blur: 12 },
  },
  "text-reveal": {
    from: { opacity: 0.16, y: 28, blur: 10 },
    to: { opacity: 1, y: 0, blur: 0 },
    exitTo: { opacity: 0, y: 10, blur: 6 },
  },
  "text-shimmer": {
    from: { opacity: 0.2 },
    to: { opacity: 1 },
    exitTo: { opacity: 0.2 },
  },
  "rotate-in": {
    from: { opacity: 0.18, rotate: -14, scale: 0.92 },
    to: { opacity: 1, rotate: 0, scale: 1 },
    exitTo: { opacity: 0, rotate: 6, scale: 0.96 },
  },
  pulse: {
    from: { opacity: 1, scale: 0.96 },
    to: { opacity: 0.88, scale: 1.08 },
    exitTo: { opacity: 0, scale: 0.96 },
  },
  ping: {
    from: { opacity: 0.72, scale: 0.96 },
    to: { opacity: 0.3, scale: 1.22 },
    exitTo: { opacity: 0, scale: 1.08 },
  },
  shake: {
    from: { x: -12 },
    to: { x: 12 },
    exitTo: { x: 0, opacity: 0 },
  },
  bounce: {
    from: { y: 0 },
    to: { y: -18 },
    exitTo: { opacity: 0, y: 10 },
  },
  wiggle: {
    from: { rotate: -8 },
    to: { rotate: 8 },
    exitTo: { opacity: 0, rotate: 0 },
  },
  float: {
    from: { y: 8 },
    to: { y: -14 },
    exitTo: { opacity: 0, y: 8 },
  },
  spin: {
    from: { rotate: 0 },
    to: { rotate: 270 },
    exitTo: { opacity: 0, rotate: 360 },
  },
  flip: {
    from: { rotateY: 0 },
    to: { rotateY: 180 },
    exitTo: { opacity: 0, rotateY: 90 },
  },
  "flip-in": {
    from: { opacity: 0.18, rotateY: -70 },
    to: { opacity: 1, rotateY: 0 },
    exitTo: { opacity: 0, rotateY: 60 },
  },
  tilt: {
    from: { rotateX: 6, rotateY: -8 },
    to: { rotateX: -4, rotateY: 8 },
    exitTo: { opacity: 0, rotateX: 0, rotateY: 0 },
  },
  magnetic: {
    from: { x: 0, y: 0, scale: 1 },
    to: { x: 4, y: -4, scale: 1.02 },
    exitTo: { opacity: 0, scale: 0.98 },
  },
  "hover-lift": {
    from: { y: 0, scale: 1 },
    to: { y: 0, scale: 1 },
    exitTo: { opacity: 0, y: 8, scale: 0.98 },
  },
  "hover-scale": {
    from: { scale: 1 },
    to: { scale: 1 },
    exitTo: { opacity: 0, scale: 0.96 },
  },
  press: {
    from: { y: 0, scale: 1 },
    to: { y: 0, scale: 1 },
    exitTo: { opacity: 0, scale: 0.98 },
  },
  reorder: {
    from: { opacity: 1, y: 0 },
    to: { opacity: 1, y: -4 },
    exitTo: { opacity: 0, y: 8 },
  },
  "skeleton-shimmer": {
    from: { opacity: 0.7 },
    to: { opacity: 1 },
    exitTo: { opacity: 0 },
  },
  progress: {
    from: { scaleX: 0.12 },
    to: { scaleX: 0.76 },
    exitTo: { opacity: 0, scaleX: 0 },
  },
  parallax: {
    from: { opacity: 1, y: 22 },
    to: { opacity: 1, y: -22 },
    exitTo: { opacity: 0, y: 10 },
  },
};

function formatOverrideValue(value: unknown): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }

  return String(value);
}

function formatOverrideObject(
  values: AnimationOverrideExample["from"],
): string {
  if (!values) {
    return "{}";
  }

  return `{ ${Object.entries(values)
    .map(([key, value]) => `${key}: ${formatOverrideValue(value)}`)
    .join(", ")} }`;
}

function formatOverrideProp(
  name: keyof AnimationOverrideExample,
  values: AnimationOverrideExample[typeof name],
): string {
  if (!values) {
    return "";
  }

  return `\n      ${name}={${formatOverrideObject(values)}}`;
}

export function getAnimationSnippet(slug: AnimationPreviewSlug) {
  const componentName = componentNames[slug];
  const label = animationPreviewLabels[slug];
  const transitionProp = infiniteTransitionSlugs.has(slug)
    ? "\n      transition={{ repeat: Infinity, repeatDelay: 0.6 }}"
    : "";

  if (slug === "spin") {
    return `import { Spin } from "@zentauri-ui/zentauri-components/animations/spin";

export function Example() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <Spin
        aria-label="Loading"
        className="h-10 w-10 rounded-full border-2 border-cyan-200/25 border-t-cyan-200"
      >
        <span className="sr-only">Loading</span>
      </Spin>
    </div>
  );
}`;
  }

  if (slug === "ping") {
    return `import { Ping } from "@zentauri-ui/zentauri-components/animations/ping";

export function Example() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="relative flex h-8 w-8 items-center justify-center">
        <Ping
          aria-label="Active signal"
          className="absolute inset-0 rounded-full bg-cyan-300/35"
        >
          <span className="sr-only">Active signal</span>
        </Ping>
        <span className="relative h-3 w-3 rounded-full bg-cyan-200" />
      </span>
    </div>
  );
}`;
  }

  if (slug === "reorder") {
    return `import { Reorder } from "@zentauri-ui/zentauri-components/animations/reorder";

export function Example() {
  return (
    <div className="space-y-2">
      {["Inbox", "Review", "Ship"].map((item) => (
        <Reorder
          key={item}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          {item}
        </Reorder>
      ))}
    </div>
  );
}`;
  }

  if (slug === "skeleton-shimmer") {
    return `import { SkeletonShimmer } from "@zentauri-ui/zentauri-components/animations/skeleton-shimmer";

export function Example() {
  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <SkeletonShimmer className="h-4 w-3/4 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]" />
      <SkeletonShimmer className="h-4 w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]" />
    </div>
  );
}`;
  }

  if (slug === "progress") {
    return `import { Progress } from "@zentauri-ui/zentauri-components/animations/progress";

export function Example() {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <Progress className="h-full origin-left rounded-full bg-cyan-300" />
    </div>
  );
}`;
  }

  if (slug === "parallax") {
    return `import { Parallax } from "@zentauri-ui/zentauri-components/animations/parallax";

export function Example() {
  return (
    <div className="h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-950 p-5">
      <div className="relative min-h-[680px]">
        <div className="sticky top-0 rounded-xl border border-white/10 bg-slate-900/90 p-4">
          Scroll scene
        </div>

        <Parallax className="absolute left-0 top-32 rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4">
          Foreground layer
        </Parallax>

        <Parallax
          from={{ y: 38 }}
          to={{ y: -34 }}
          transition={{ duration: 6.5 }}
          className="absolute right-0 top-64 rounded-xl border border-emerald-200/20 bg-emerald-300/10 p-4"
        >
          Offset layer
        </Parallax>
      </div>
    </div>
  );
}`;
  }

  return `import { ${componentName} } from "@zentauri-ui/zentauri-components/animations/${slug}";

export function Example() {
  return (
    <${componentName}
      className="rounded-xl border border-white/10 bg-white/5 p-4"${transitionProp}
    >
      ${label}
    </${componentName}>
  );
}`;
}

export function getAnimationInViewSnippet(slug: AnimationPreviewSlug) {
  const componentName = componentNames[slug];
  const label = animationPreviewLabels[slug];
  const transitionProp = infiniteTransitionSlugs.has(slug)
    ? "\n      transition={{ repeat: Infinity, repeatDelay: 0.6 }}"
    : "";

  return `import { ${componentName} } from "@zentauri-ui/zentauri-components/animations/${slug}";

export function InViewExample() {
  return (
    <${componentName}
      whileInView
      viewport={{ once: true, amount: 0.35 }}
      className="rounded-xl border border-white/10 bg-white/5 p-4"${transitionProp}
    >
      ${label}
    </${componentName}>
  );
}`;
}

export function getAnimationOverrideSnippet(slug: AnimationPreviewSlug) {
  const componentName = componentNames[slug];
  const label = animationPreviewLabels[slug];
  const override = animationOverrideExamples[slug];
  const transitionProp = infiniteTransitionSlugs.has(slug)
    ? "\n      transition={{ repeat: Infinity, repeatDelay: 0.6 }}"
    : "";

  if (slug === "spin") {
    return `import { Spin } from "@zentauri-ui/zentauri-components/animations/spin";

export function OverrideExample() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <Spin
        aria-label="Custom loading"
        className="h-10 w-10 rounded-full border-2 border-cyan-200/25 border-t-cyan-200"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
      >
        <span className="sr-only">Custom loading</span>
      </Spin>
    </div>
  );
}`;
  }

  if (slug === "ping") {
    return `import { Ping } from "@zentauri-ui/zentauri-components/animations/ping";

export function OverrideExample() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="relative flex h-8 w-8 items-center justify-center">
        <Ping
          aria-label="Custom active signal"
          className="absolute inset-0 rounded-full bg-cyan-300/35"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
        >
          <span className="sr-only">Custom active signal</span>
        </Ping>
        <span className="relative h-3 w-3 rounded-full bg-cyan-200" />
      </span>
    </div>
  );
}`;
  }

  if (slug === "reorder") {
    return `import { Reorder } from "@zentauri-ui/zentauri-components/animations/reorder";

export function OverrideExample() {
  return (
    <Reorder
      className="rounded-xl border border-white/10 bg-white/5 p-4"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
    >
      Custom reorder item
    </Reorder>
  );
}`;
  }

  if (slug === "skeleton-shimmer") {
    return `import { SkeletonShimmer } from "@zentauri-ui/zentauri-components/animations/skeleton-shimmer";

export function OverrideExample() {
  return (
    <SkeletonShimmer
      className="h-4 w-3/4 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
    />
  );
}`;
  }

  if (slug === "progress") {
    return `import { Progress } from "@zentauri-ui/zentauri-components/animations/progress";

export function OverrideExample() {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <Progress
        className="h-full origin-left rounded-full bg-cyan-300"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
      />
    </div>
  );
}`;
  }

  if (slug === "parallax") {
    return `import { Parallax } from "@zentauri-ui/zentauri-components/animations/parallax";

export function OverrideExample() {
  return (
    <div className="h-80 overflow-y-auto rounded-xl border border-white/10 bg-slate-950 p-5">
      <div className="relative min-h-[680px]">
        <div className="sticky top-0 rounded-xl border border-white/10 bg-slate-900/90 p-4">
          Custom scroll scene
        </div>

        <Parallax
          className="absolute left-0 top-32 rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}
        >
          Custom foreground
        </Parallax>
      </div>
    </div>
  );
}`;
  }

  return `import { ${componentName} } from "@zentauri-ui/zentauri-components/animations/${slug}";

export function OverrideExample() {
  return (
    <${componentName}
      className="rounded-xl border border-white/10 bg-white/5 p-4"${formatOverrideProp("from", override.from)}${formatOverrideProp("to", override.to)}${formatOverrideProp("exitTo", override.exitTo)}${transitionProp}
    >
      Custom ${label}
    </${componentName}>
  );
}`;
}
