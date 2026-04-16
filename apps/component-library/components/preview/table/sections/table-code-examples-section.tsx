import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";

import { TableDemo } from "./components/table-code-examples-demo";
import {
  TABLE_APPEARANCES,
  TABLE_CODE_EXAMPLES_SECTION_CLASS,
  TABLE_SNIPPET_BASE,
  TABLE_SIZES,
  TABLE_TEXT_ALIGNS,
} from "./components/table-code-examples.data";
import { tableSnippet } from "./components/table-code-examples.snippets";

export function TableCodeExamplesSection() {
  const base = TABLE_SNIPPET_BASE;
  return (
    <section className={TABLE_CODE_EXAMPLES_SECTION_CLASS}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Table variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Density, row style, and sticky header with scrollable preview. Each code view starts
        with Variant: naming the row.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        {TABLE_APPEARANCES.map((appearance) => (
          <PreviewCodeShowcase
            key={`app-${appearance}`}
            code={tableSnippet({ ...base, appearance })}
          >
            <TableDemo {...base} appearance={appearance} />
          </PreviewCodeShowcase>
        ))}
        {TABLE_SIZES.map((size) => (
          <PreviewCodeShowcase
            key={`size-${size}`}
            code={tableSnippet({ ...base, appearance: "striped", size })}
          >
            <TableDemo {...base} appearance="striped" size={size} />
          </PreviewCodeShowcase>
        ))}
        {TABLE_TEXT_ALIGNS.map((textAlign) => (
          <PreviewCodeShowcase
            key={`text-align-${textAlign}`}
            code={tableSnippet({ ...base, appearance: "striped", textAlign })}
          >
            <TableDemo {...base} appearance="striped" textAlign={textAlign} />
          </PreviewCodeShowcase>
        ))}
        <PreviewCodeShowcase
          key="sticky-on"
          code={tableSnippet({ ...base, appearance: "bordered", stickyHeader: true })}
        >
          <TableDemo {...base} appearance="bordered" stickyHeader />
        </PreviewCodeShowcase>
        <PreviewCodeShowcase
          key="sticky-off"
          code={tableSnippet({ ...base, appearance: "bordered", stickyHeader: false })}
        >
          <TableDemo {...base} appearance="bordered" stickyHeader={false} />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
