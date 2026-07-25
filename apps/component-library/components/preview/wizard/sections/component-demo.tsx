"use client";

import { Section } from "@/components/common/Section";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import {
  WizardBasicDemo,
  WizardSidebarDemo,
  WizardCustomFooterDemo,
} from "./components/demos";
import {
  wizardBasicSnippet,
  wizardSidebarSnippet,
  wizardCustomFooterSnippet,
} from "./snippets";

export function WizardExamplesSection() {
  return (
    <Section>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
        Examples
      </h2>
      <p className="mb-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
        The Wizard component provides a multi-step workflow with compound
        sub-components for headers, progress indicators, navigation, sidebars,
        and footers.
      </p>
      <div className="mt-8 space-y-10">
        <PreviewCodeShowcase code={wizardBasicSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Basic wizard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A simple multi-step form with header, dots progress, and
              navigation.
            </p>
            <WizardBasicDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={wizardSidebarSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              With sidebar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Display all steps in a sidebar with clickable navigation.
            </p>
            <WizardSidebarDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={wizardCustomFooterSnippet()}>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Custom footer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wrap the navigation in a custom footer layout.
            </p>
            <WizardCustomFooterDemo />
          </div>
        </PreviewCodeShowcase>
      </div>
    </Section>
  );
}
