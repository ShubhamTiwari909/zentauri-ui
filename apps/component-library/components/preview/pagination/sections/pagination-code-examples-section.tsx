import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { PaginationDemo } from "./components/pagination-code-examples-demo";
import {
  PAGINATION_APPEARANCES,
  PAGINATION_CODE_EXAMPLES_SECTION_CLASS,
  PAGINATION_SIZES,
} from "./components/pagination-code-examples.data";
import { paginationSnippet } from "./components/pagination-code-examples.snippets";

export function PaginationCodeExamplesSection() {
  return (
    <section className={PAGINATION_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Pagination variants examples
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row pairs live output with matching JSX. The Variant line states
        which appearance/size tokens apply;
        <code className="mx-1 text-slate-200"> pageCount</code>,{" "}
        <code className="mx-1 text-slate-200">defaultPage</code>,{" "}
        <code className="mx-1 text-slate-200">siblingCount</code>, and{" "}
        <code className="mx-1 text-slate-200">boundaryCount</code> stay fixed so
        ellipsis behavior stays visible.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {PAGINATION_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={paginationSnippet({ appearance, size: "md" })}
          >
            <PaginationDemo appearance={appearance} size="md" />
          </PreviewCodeShowcase>
        ))}
        {PAGINATION_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={paginationSnippet({ appearance: "secondary", size })}
          >
            <PaginationDemo appearance="secondary" size={size} />
          </PreviewCodeShowcase>
        ))}
      </div>
    </section>
  );
}
