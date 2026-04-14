"use client";

import { variantLeadComment } from "@/components/preview/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "@/components/ui/table";

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

function tableOpenTag(opts: {
  appearance: NonNullable<TableProps["appearance"]>;
  size: NonNullable<TableProps["size"]>;
  stickyHeader: boolean;
}) {
  const { appearance, size, stickyHeader } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const stickyAttr = stickyHeader ? " stickyHeader" : "";
  return `<Table${appearanceAttr}${sizeAttr}${stickyAttr} rowAnimation="none">`;
}

function tableSnippet(opts: Parameters<typeof tableOpenTag>[0]) {
  const { appearance, size, stickyHeader } = opts;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, stickyHeader · ${stickyHeader}`)}${tableOpenTag(opts)}
${TABLE_BODY_SNIPPET}
</Table>`;
}

function TableDemo(opts: Parameters<typeof tableOpenTag>[0]) {
  const { appearance, size, stickyHeader } = opts;
  return (
    <div className="max-h-48 overflow-y-auto rounded-lg border border-white/10">
      <Table appearance={appearance} size={size} stickyHeader={stickyHeader} rowAnimation="none">
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
