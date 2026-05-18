"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  DynamicStepperAppearanceDemo,
  DynamicStepperCallbacksDemo,
  DynamicStepperControlledDemo,
  DynamicStepperIndicatorTonesDemo,
  DynamicStepperSizesDemo,
  DynamicStepperUncontrolledDemo,
  DynamicStepperVerticalDemo,
} from "./components/dynamic-stepper-demos";
import { DYNAMIC_STEPPER_CODE_EXAMPLES_SECTION_CLASS } from "./components/dynamic-stepper-demo-data";
import {
  dynamicStepperAppearanceSnippet,
  dynamicStepperCallbacksSnippet,
  dynamicStepperControlledSnippet,
  dynamicStepperIdsSnippet,
  dynamicStepperIndicatorTonesSnippet,
  dynamicStepperSizesSnippet,
  dynamicStepperUncontrolledSnippet,
  dynamicStepperVerticalSnippet,
} from "./dynamic-stepper-snippets";

export function DynamicStepperExamplesSection() {
  return (
    <section className={DYNAMIC_STEPPER_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-900 dark:text-slate-400">
        Uncontrolled and controlled active step, callbacks, orientation,
        <code className="text-slate-900 dark:text-slate-200">buttonAppearance</code> on navigation
        buttons, indicator tone palettes (non-gradient{" "}
        <code className="text-slate-900 dark:text-slate-200">Button</code> appearances), sizing, and
        DOM hooks for Tailwind.
      </p>

      <div className="mt-8 space-y-10">
        <PreviewCodeShowcase code={dynamicStepperUncontrolledSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Uncontrolled</h3>
            <p className="max-w-2xl text-sm text-slate-900 dark:text-slate-400">
              <code className="text-slate-900 dark:text-slate-200">defaultActiveStep</code> seeds
              the initial index; Previous / Next update internal state.
            </p>
            <DynamicStepperUncontrolledDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperControlledSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Controlled</h3>
            <p className="max-w-2xl text-sm text-slate-900 dark:text-slate-400">
              Parent owns <code className="text-slate-900 dark:text-slate-200">activeStep</code> and
              syncs via{" "}
              <code className="text-slate-900 dark:text-slate-200">onActiveStepChange</code>.
            </p>
            <DynamicStepperControlledDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperCallbacksSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Callbacks (<code className="text-slate-900 dark:text-slate-200">onPrevious</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">onNext</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">onActiveStepChange</code>)
            </h3>
            <DynamicStepperCallbacksDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperVerticalSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Vertical orientation
            </h3>
            <DynamicStepperVerticalDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperAppearanceSnippet("default")}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Button appearance: default
            </h3>
            <DynamicStepperAppearanceDemo appearance="default" />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperAppearanceSnippet("ghost")}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Button appearance: ghost
            </h3>
            <DynamicStepperAppearanceDemo appearance="ghost" />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase
          code={dynamicStepperAppearanceSnippet("secondary")}
        >
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Button appearance: secondary
            </h3>
            <DynamicStepperAppearanceDemo appearance="secondary" />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperSizesSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Button size + indicator size
            </h3>
            <p className="max-w-2xl text-sm text-slate-900 dark:text-slate-400">
              <code className="text-slate-900 dark:text-slate-200">buttonSize</code> flows to both
              Previous / Next <code className="text-slate-900 dark:text-slate-200">Button</code>{" "}
              components; <code className="text-slate-900 dark:text-slate-200">indicatorSize</code>{" "}
              scales circles and labels in the mapper.
            </p>
            <DynamicStepperSizesDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperIndicatorTonesSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Indicator tones (
              <code className="text-slate-900 dark:text-slate-200">indicatorCompleteAppearance</code>
              ,{" "}
              <code className="text-slate-900 dark:text-slate-200">indicatorCurrentAppearance</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">indicatorUpcomingAppearance</code>
              )
            </h3>
            <p className="max-w-2xl text-sm text-slate-900 dark:text-slate-400">
              Options mirror non-gradient{" "}
              <code className="text-slate-900 dark:text-slate-200">Button</code> appearances (
              <code className="text-slate-900 dark:text-slate-200">default</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">emerald</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">outline</code>, etc.) per
              semantic state.
            </p>
            <DynamicStepperIndicatorTonesDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={dynamicStepperIdsSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              IDs and data-slot for Tailwind
            </h3>
            <p className="max-w-2xl text-sm text-slate-900 dark:text-slate-400">
              Each instance sets <code className="text-slate-900 dark:text-slate-200">id</code>{" "}
              suffixes <code className="text-slate-900 dark:text-slate-200">-previous</code>,{" "}
              <code className="text-slate-900 dark:text-slate-200">-next</code>, and{" "}
              <code className="text-slate-900 dark:text-slate-200">-mapper</code> (prefixed by React{" "}
              <code className="text-slate-900 dark:text-slate-200">useId()</code>). Prefer attribute
              selectors such as{" "}
              <code className="text-slate-900 dark:text-slate-200">[id$=&quot;-mapper&quot;]</code>{" "}
              or <code className="text-slate-900 dark:text-slate-200">data-slot</code> keys shown in
              the snippet.
            </p>
          </div>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
