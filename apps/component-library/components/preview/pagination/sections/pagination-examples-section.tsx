"use client";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { PAGINATION_CODE_EXAMPLES_SECTION_CLASS } from "./components/pagination-code-examples.data";
import {
  PaginationExamplesControlledDemo,
  PaginationExamplesHeadlessDemo,
} from "./components/pagination-examples-demo";
import {
  paginationControlledExampleSnippet,
  paginationHeadlessExampleSnippet,
} from "./components/pagination-examples.snippets";

export function PaginationExamplesSection() {
  return (
    <section className={PAGINATION_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each block uses the same Show output / Show code toggle as the variant
        gallery below so you can match the live UI to a copy-ready snippet.
      </p>

      <div className="mt-8 space-y-10">
        <PreviewCodeShowcase code={paginationControlledExampleSnippet()}>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">
              Controlled + compact
            </h3>
            <p className="max-w-2xl text-sm text-slate-400">
              Middle window uses{" "}
              <code className="text-slate-200">siblingCount</code>; ends use{" "}
              <code className="text-slate-200">boundaryCount</code>. Prev and
              Next stay keyboard-friendly on the nav region.
            </p>
            <PaginationExamplesControlledDemo />
          </div>
        </PreviewCodeShowcase>

        <PreviewCodeShowcase code={paginationHeadlessExampleSnippet()}>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Headless API</h3>
            <PaginationExamplesHeadlessDemo />
          </div>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
