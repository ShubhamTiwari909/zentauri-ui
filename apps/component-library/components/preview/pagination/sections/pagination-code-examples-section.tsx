"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { Pagination, type PaginationProps } from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const PAGINATION_APPEARANCES = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
  "glass",
  "emerald",
  "indigo",
  "purple",
  "pink",
  "rose",
  "sky",
  "teal",
  "yellow",
  "orange",
  "gradient-blue",
  "gradient-green",
  "gradient-red",
  "gradient-yellow",
  "gradient-purple",
  "gradient-teal",
  "gradient-indigo",
  "gradient-pink",
] as const satisfies readonly NonNullable<PaginationProps["appearance"]>[];

const PAGINATION_SIZES = ["sm", "md", "lg", "xl", "icon"] as const satisfies readonly NonNullable<
  PaginationProps["size"]
>[];

function paginationSnippet(opts: {
  appearance: NonNullable<PaginationProps["appearance"]>;
  size: NonNullable<PaginationProps["size"]>;
}) {
  const { appearance, size } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}`)}<Pagination
  pageCount={15}
  defaultPage={6}
  siblingCount={1}
  boundaryCount={1}${appearanceAttr}${sizeAttr}
/>`;
}

function PaginationDemo(opts: {
  appearance: NonNullable<PaginationProps["appearance"]>;
  size: NonNullable<PaginationProps["size"]>;
}) {
  const { appearance, size } = opts;
  return (
    <Pagination
      appearance={appearance}
      size={size}
      pageCount={15}
      defaultPage={6}
      siblingCount={1}
      boundaryCount={1}
    />
  );
}

export function PaginationCodeExamplesSection() {
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Pagination variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Each row pairs live output with matching JSX. The Variant line states which appearance/size tokens apply;
        <code className="mx-1 text-slate-200"> pageCount</code>, <code className="mx-1 text-slate-200">defaultPage</code>,{" "}
        <code className="mx-1 text-slate-200">siblingCount</code>, and <code className="mx-1 text-slate-200">boundaryCount</code>{" "}
        stay fixed so ellipsis behavior stays visible.
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
