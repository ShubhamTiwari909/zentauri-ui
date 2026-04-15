"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "@zentauri-ui/zentauri-components/ui";

const SECTION =
  "rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40";

const TABLE_BODY_SNIPPET = `  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Ana</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Bo</TableCell>
      <TableCell>Editor</TableCell>
    </TableRow>
  </TableBody>`;

const TABLE_APPEARANCES = ["default", "striped", "bordered", "ghost"] as const satisfies readonly NonNullable<
  TableProps["appearance"]
>[];

const TABLE_SIZES = ["sm", "md", "lg"] as const satisfies readonly NonNullable<TableProps["size"]>[];

const TABLE_TEXT_ALIGNS = ["left", "center", "right"] as const satisfies readonly NonNullable<TableCellProps["textAlign"]>[];

function tableOpenTag(opts: {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
  overflow?: "auto" | "hidden";
  textAlign?: "left" | "center" | "right";
  className?: string;
}) {
  const { appearance, size, stickyHeader, overflow, textAlign } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const stickyAttr = stickyHeader ? " stickyHeader" : "";
  const overflowAttr = overflow === "auto" ? " overflow=\"auto\"" : "";
  const textAlignAttr = textAlign === "left" ? "" : ` textAlign="${textAlign}"`;
  return `<Table${appearanceAttr}${sizeAttr}${stickyAttr} rowAnimation="none"${overflowAttr}${textAlignAttr}>
  <div data-slot="table-scroll" className="relative w-full overflow-auto">
    <table data-slot="table" role="table" class="min-w-0 w-full max-lg:overflow-x-auto max-lg:overscroll-x-contain lg:overflow-x-visible max-lg:**:data-[slot=table]:w-full max-lg:**:data-[slot=table]:min-w-max">
      ${TABLE_BODY_SNIPPET}
    </table>
  </div>
</Table>`;
}

function tableSnippet(opts: Parameters<typeof tableOpenTag>[0]) {
  const { appearance, size, stickyHeader, overflow } = opts;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, stickyHeader · ${stickyHeader}, overflow · ${overflow}`)}${tableOpenTag(opts)}
${TABLE_BODY_SNIPPET}
</Table>`;
}

function TableDemo(opts: Parameters<typeof tableOpenTag>[0]) {
  const { appearance, size, stickyHeader, overflow, textAlign, className } = opts;
  return (
    <div className="max-h-48 overflow-y-auto rounded-lg border border-white/10">
      <p className="mb-5">Appearance: <span className="font-bold">{appearance}</span> | Size: <span className="font-bold">{size}</span> | Sticky Header: <span className="font-bold">{stickyHeader ? "true" : "false"}</span> | Overflow: <span className="font-bold">{overflow ? "auto" : "hidden"}</span></p>
      <Table appearance={appearance} size={size} stickyHeader={stickyHeader} rowAnimation="none" overflow={overflow} textAlign={textAlign} className={className}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ana</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bo</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cy</TableCell>
            <TableCell>Viewer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function TableCodeExamplesSection() {
  const base = {
    appearance: "default" as const,
    size: "md" as const,
    stickyHeader: false,
  };
  return (
    <section className={SECTION}>
      <h2 className="mt-3 text-2xl font-semibold text-white">Table variants examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Density, row style, and sticky header with scrollable preview. Each code view starts with Variant: naming the row.
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
        <PreviewCodeShowcase
          key="overflow-auto"
          code={tableSnippet({ ...base, appearance: "bordered", overflow: "auto" })}
        >
          <p>Overflow auto on mobile and tablet</p>
          <TableDemo {...base} appearance="bordered" overflow="auto" className="min-w-150" />
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
