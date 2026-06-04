import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { PreviewPageShell } from "@/components/common/preview-page-shell";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { PreviewSeoDoc } from "@/components/preview/seo/seo-doc";
import {
  animationPreviewLabels,
  type AnimationPreviewSlug,
} from "@/lib/animations-preview-registry";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import { Heading, Text } from "@zentauri-ui/zentauri-components/ui/typography";

import { AnimationBySlug, type AnimationPreviewMotionProps } from "./by-slug";
import {
  animationOverrideExamples,
  getAnimationInViewSnippet,
  getAnimationOverrideSnippet,
  getAnimationSnippet,
} from "./snippets";

const infiniteTransitionSlugs = new Set<AnimationPreviewSlug>([
  "fade-out",
  "scale-out",
  "blur-out",
]);

const purposePreviewSlugs = new Set<AnimationPreviewSlug>([
  "spin",
  "ping",
  "reorder",
  "skeleton-shimmer",
  "progress",
  "parallax",
]);

function SpinLoaderPreview({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      <AnimationBySlug
        slug="spin"
        aria-label={label}
        className="h-10 w-10 rounded-full border-2 border-cyan-200/25 border-t-cyan-200"
      >
        <span className="sr-only">{label}</span>
      </AnimationBySlug>
    </div>
  );
}

function ReorderPreview() {
  return (
    <div className="space-y-2">
      {["Inbox", "Review", "Ship"].map((item) => (
        <AnimationBySlug
          key={item}
          slug="reorder"
          className="rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-slate-100"
        >
          {item}
        </AnimationBySlug>
      ))}
    </div>
  );
}

function SkeletonShimmerPreview() {
  return (
    <div className="space-y-3">
      <AnimationBySlug
        slug="skeleton-shimmer"
        className="h-4 w-3/4 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]"
      >
        <span className="sr-only">Loading content</span>
      </AnimationBySlug>
      <AnimationBySlug
        slug="skeleton-shimmer"
        className="h-4 w-1/2 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]"
      >
        <span className="sr-only">Loading content</span>
      </AnimationBySlug>
    </div>
  );
}

function ProgressPreview({
  overrideExample,
}: {
  overrideExample?: Pick<AnimationPreviewMotionProps, "from" | "to" | "exitTo">;
}) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <AnimationBySlug
        slug="progress"
        {...overrideExample}
        className="h-full origin-left rounded-full bg-cyan-300"
      >
        <span className="sr-only">Progress</span>
      </AnimationBySlug>
    </div>
  );
}

function ParallaxScrollPreview({
  overrideExample,
}: {
  overrideExample?: Pick<AnimationPreviewMotionProps, "from" | "to" | "exitTo">;
}) {
  return (
    <div className="h-80 overflow-y-auto rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(22,78,99,0.28),rgba(15,23,42,0.96))] shadow-inner shadow-slate-950/60">
      <div className="relative min-h-[680px] p-5">
        <div className="sticky top-4 z-20 rounded-xl border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-slate-950/30 backdrop-blur">
          <Text className="text-xs uppercase tracking-wide text-cyan-200">
            Scroll scene
          </Text>
          <Heading className="mt-2" level={4} tone="primary">
            Layered content
          </Heading>
        </div>

        <AnimationBySlug
          slug="parallax"
          {...overrideExample}
          className="absolute left-5 top-32 w-40 rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4 text-cyan-50 shadow-lg shadow-cyan-950/20"
        >
          <Text className="text-xs text-cyan-100" tone="default">
            Foreground
          </Text>
          <Heading className="mt-2 text-base" level={4} tone="primary">
            Faster layer
          </Heading>
        </AnimationBySlug>

        <AnimationBySlug
          slug="parallax"
          from={overrideExample?.from ?? { y: 38 }}
          to={overrideExample?.to ?? { y: -34 }}
          exitTo={overrideExample?.exitTo}
          transition={{ duration: 6.5 }}
          className="absolute right-5 top-64 w-44 rounded-xl border border-emerald-200/20 bg-emerald-300/10 p-4 text-emerald-50 shadow-lg shadow-emerald-950/20"
        >
          <Text className="text-xs text-emerald-100" tone="default">
            Midground
          </Text>
          <Heading className="mt-2 text-base" level={4} tone="primary">
            Offset layer
          </Heading>
        </AnimationBySlug>

        <AnimationBySlug
          slug="parallax"
          from={overrideExample?.from ?? { y: 16 }}
          to={overrideExample?.to ?? { y: -16 }}
          exitTo={overrideExample?.exitTo}
          transition={{ duration: 7.5 }}
          className="absolute bottom-20 left-[calc(50%-6rem)] w-48 rounded-xl border border-violet-200/20 bg-violet-300/10 p-4 text-violet-50 shadow-lg shadow-violet-950/20"
        >
          <Text className="text-xs text-violet-100" tone="default">
            Background
          </Text>
          <Heading className="mt-2 text-base" level={4} tone="primary">
            Slow layer
          </Heading>
        </AnimationBySlug>
      </div>
    </div>
  );
}

function PingSignalPreview({
  className,
  label = "Active signal",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={className}>
      <span className="relative flex h-8 w-8 items-center justify-center">
        <AnimationBySlug
          slug="ping"
          aria-label={label}
          className="absolute inset-0 rounded-full bg-cyan-300/35"
        >
          <span className="sr-only">{label}</span>
        </AnimationBySlug>
        <span className="relative h-3 w-3 rounded-full bg-cyan-200 shadow-lg shadow-cyan-500/30" />
      </span>
    </div>
  );
}

function AnimationPreviewCard({
  className,
  docsTransition,
  label,
  slug,
  text,
}: {
  className: string;
  docsTransition: { repeat: number; repeatDelay: number } | undefined;
  label: string;
  slug: AnimationPreviewSlug;
  text: string;
}) {
  if (slug === "spin") {
    return (
      <div className={className}>
        <SpinLoaderPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  if (slug === "reorder") {
    return (
      <div className={className}>
        <ReorderPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  if (slug === "skeleton-shimmer") {
    return (
      <div className={className}>
        <SkeletonShimmerPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  if (slug === "progress") {
    return (
      <div className={className}>
        <ProgressPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  if (slug === "parallax") {
    return (
      <div className={className}>
        <ParallaxScrollPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  if (slug === "ping") {
    return (
      <div className={className}>
        <PingSignalPreview />
        <Heading className="mt-4" level={4} tone="primary">
          {label}
        </Heading>
        <Text className="mt-2 text-slate-300" tone="default">
          {text}
        </Text>
      </div>
    );
  }

  return (
    <AnimationBySlug
      slug={slug}
      transition={docsTransition}
      className={className}
    >
      <Heading level={4} tone="primary">
        {label}
      </Heading>
      <Text className="mt-2 text-slate-300" tone="default">
        {text}
      </Text>
    </AnimationBySlug>
  );
}

export default function AnimationPreviewPage({
  seo,
  slug,
}: {
  seo: PreviewSeoDocument;
  slug: AnimationPreviewSlug;
}) {
  const label = animationPreviewLabels[slug];
  const docsTransition = infiniteTransitionSlugs.has(slug)
    ? { repeat: Infinity, repeatDelay: 1.5 }
    : undefined;
  const overrideExample = animationOverrideExamples[slug];
  const usesPurposePreview = purposePreviewSlugs.has(slug);
  const heroText =
    slug === "spin"
      ? "A small motion wrapper for loader and activity states."
      : slug === "ping"
        ? "A small motion wrapper for live signals and active states."
        : slug === "reorder"
          ? "A layout motion wrapper for smooth item movement."
          : slug === "skeleton-shimmer"
            ? "A shimmer motion wrapper for loading placeholders."
            : slug === "progress"
              ? "A motion wrapper for progress and completion fills."
              : slug === "parallax"
                ? "A motion wrapper for layered scrolling scenes."
                : "A small motion wrapper for entrance and exit composition.";

  return (
    <PreviewPageShell>
      <Section variant="hero">
        <PreviewHeroSeoBlock seo={seo} />

        {usesPurposePreview ? (
          <AnimationPreviewCard
            slug={slug}
            label={label}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40"
            docsTransition={docsTransition}
            text={heroText}
          />
        ) : (
          <AnimationBySlug
            slug={slug}
            transition={docsTransition}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40"
          >
            <Heading level={3} tone="primary">
              {label}
            </Heading>
            <Text className="mt-2 text-white" tone="default">
              A small motion wrapper for entrance and exit composition.
            </Text>
          </AnimationBySlug>
        )}
      </Section>

      <Section
        variant="plain"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[0, 1, 2].map((index) =>
          slug === "spin" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <SpinLoaderPreview
                className="flex h-14 items-center"
                label={`Loading example ${index + 1}`}
              />
              <Text className="text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Loader state
              </Heading>
            </div>
          ) : slug === "ping" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <PingSignalPreview
                className="flex h-14 items-center"
                label={`Active signal example ${index + 1}`}
              />
              <Text className="text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Active signal
              </Heading>
            </div>
          ) : slug === "reorder" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <ReorderPreview />
              <Text className="mt-4 text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Layout items
              </Heading>
            </div>
          ) : slug === "skeleton-shimmer" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <SkeletonShimmerPreview />
              <Text className="mt-4 text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Loading skeleton
              </Heading>
            </div>
          ) : slug === "progress" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <ProgressPreview />
              <Text className="mt-4 text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Progress fill
              </Heading>
            </div>
          ) : slug === "parallax" ? (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <ParallaxScrollPreview />
              <Text className="mt-4 text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                Scroll scene
              </Heading>
            </div>
          ) : (
            <AnimationBySlug
              key={index}
              slug={slug}
              transition={docsTransition}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/25"
            >
              <Text className="text-sm text-slate-300" tone="default">
                Example {index + 1}
              </Text>
              <Heading className="mt-2" level={4} tone="primary">
                {label}
              </Heading>
            </AnimationBySlug>
          ),
        )}
      </Section>

      <Section variant="plain">
        <PreviewCodeShowcase code={getAnimationSnippet(slug)}>
          <AnimationPreviewCard
            slug={slug}
            label={
              slug === "spin" ? "Loading" : slug === "ping" ? "Live" : label
            }
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
            docsTransition={docsTransition}
            text={
              slug === "spin"
                ? "A focused loader visual using the spin preset."
                : slug === "ping"
                  ? "A compact signal visual using the ping preset."
                  : slug === "reorder"
                    ? "A small stack using the reorder layout preset."
                    : slug === "skeleton-shimmer"
                      ? "A loading placeholder using the shimmer preset."
                      : slug === "progress"
                        ? "A progress bar using the progress preset."
                        : slug === "parallax"
                          ? "A scrolling scene using the parallax preset."
                          : "Import from the animation category."
            }
          />
        </PreviewCodeShowcase>
      </Section>

      <Section variant="plain">
        <p className="mb-4 text-sm font-medium text-slate-400">
          Viewport trigger
        </p>
        <PreviewCodeShowcase code={getAnimationInViewSnippet(slug)}>
          <AnimationBySlug
            slug={slug}
            transition={docsTransition}
            viewport={{ once: true, amount: 0.35 }}
            whileInView
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <Heading level={4} tone="primary">
              {label}
            </Heading>
            <Text className="mt-2 text-slate-300" tone="default">
              Starts when the preview enters the viewport.
            </Text>
          </AnimationBySlug>
        </PreviewCodeShowcase>
      </Section>

      <Section variant="plain">
        <p className="mb-4 text-sm font-medium text-slate-400">
          Override values
        </p>
        <PreviewCodeShowcase code={getAnimationOverrideSnippet(slug)}>
          {slug === "spin" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <AnimationBySlug
                slug="spin"
                {...overrideExample}
                aria-label="Custom loading"
                className="h-10 w-10 rounded-full border-2 border-cyan-100/25 border-t-cyan-100"
              >
                <span className="sr-only">Custom loading</span>
              </AnimationBySlug>
              <Heading className="mt-4" level={4} tone="primary">
                Custom loader
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : slug === "ping" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <AnimationBySlug
                  slug="ping"
                  {...overrideExample}
                  aria-label="Custom active signal"
                  className="absolute inset-0 rounded-full bg-cyan-200/35"
                >
                  <span className="sr-only">Custom active signal</span>
                </AnimationBySlug>
                <span className="relative h-3 w-3 rounded-full bg-cyan-100 shadow-lg shadow-cyan-500/30" />
              </span>
              <Heading className="mt-4" level={4} tone="primary">
                Custom signal
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : slug === "reorder" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <AnimationBySlug
                slug="reorder"
                {...overrideExample}
                className="rounded-xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-50"
              >
                Custom reorder item
              </AnimationBySlug>
              <Heading className="mt-4" level={4} tone="primary">
                Custom reorder
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : slug === "skeleton-shimmer" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <AnimationBySlug
                slug="skeleton-shimmer"
                {...overrideExample}
                className="h-4 w-3/4 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.22),rgba(255,255,255,0.06))] bg-size-[200%_100%]"
              >
                <span className="sr-only">Custom loading content</span>
              </AnimationBySlug>
              <Heading className="mt-4" level={4} tone="primary">
                Custom shimmer
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : slug === "progress" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <ProgressPreview overrideExample={overrideExample} />
              <Heading className="mt-4" level={4} tone="primary">
                Custom progress
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : slug === "parallax" ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20">
              <ParallaxScrollPreview overrideExample={overrideExample} />
              <Heading className="mt-4" level={4} tone="primary">
                Custom parallax
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </div>
          ) : (
            <AnimationBySlug
              slug={slug}
              {...overrideExample}
              transition={docsTransition}
              className="rounded-2xl border border-cyan-400/20 bg-cyan-400/6 p-6 shadow-lg shadow-cyan-950/20"
            >
              <Heading level={4} tone="primary">
                Custom {label}
              </Heading>
              <Text className="mt-2 text-slate-300" tone="default">
                Adjust preset targets with props.
              </Text>
            </AnimationBySlug>
          )}
        </PreviewCodeShowcase>
      </Section>

      <PreviewSeoDoc doc={seo} />
    </PreviewPageShell>
  );
}
