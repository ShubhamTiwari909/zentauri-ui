import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { SkeletonDemo } from "./components/skeleton-code-examples-demo";
import {
  SKELETON_APPEARANCES,
  SKELETON_CODE_EXAMPLES_SECTION_CLASS,
  SKELETON_ROUNDED,
  SKELETON_SIZES,
} from "./components/skeleton-code-examples.data";
import { skeletonSnippet } from "./components/skeleton-code-examples.snippets";

export function SkeletonCodeExamplesSection() {
  return (
    <section className={SKELETON_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Skeleton variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Surface tone, block height, and corner radius. Each code view starts
        with Variant: for clarity.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {SKELETON_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={skeletonSnippet({
              appearance,
              size: "md",
              rounded: "md",
              animation: "shimmer",
              shimmerTone: appearance,
            })}
          >
            <SkeletonDemo
              appearance={appearance}
              size="md"
              rounded="md"
              animation="shimmer"
              shimmerTone={appearance}
            />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="pulse"
          code={skeletonSnippet({
            appearance: "default",
            size: "md",
            rounded: "md",
            animation: "pulse",
            shimmerTone: "default",
          })}
        >
          <SkeletonDemo
            appearance="default"
            size="md"
            rounded="md"
            animation="pulse"
            shimmerTone="default"
          />
        </PreviewCodeShowcase>
        {SKELETON_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={skeletonSnippet({
              appearance: "default",
              size,
              rounded: "md",
              animation: "none",
              shimmerTone: "default",
            })}
          >
            <SkeletonDemo
              appearance="default"
              size={size}
              rounded="md"
              shimmerTone="default"
              animation="none"
            />
          </PreviewCodeShowcase>
        ))}
        {SKELETON_ROUNDED.map((rounded) => (
          <PreviewCodeShowcase
            key={`rounded-${rounded}`}
            code={skeletonSnippet({
              appearance: "subtle",
              size: "md",
              rounded,
              animation: "none",
              shimmerTone: "default",
            })}
          >
            <SkeletonDemo
              appearance="subtle"
              size="md"
              rounded={rounded}
              shimmerTone="default"
              animation="none"
            />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
