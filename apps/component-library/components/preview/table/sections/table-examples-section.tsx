"use client";

import { variantLeadComment } from "@/components/common/variant-code-prefix";
import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui";

export function TableExamplesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <h2 className="mt-3 text-2xl font-semibold text-white">Examples</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
        Bordered appearance with sticky header for long lists.
      </p>
      <div className="mt-6 space-y-10 rounded-xl">
        <PreviewCodeShowcase
          code={`${variantLeadComment(`appearance · bordered, stickyHeader · true, size · sm (preview)`)}
<Table appearance="bordered" stickyHeader>
  <TableHeader>...</TableHeader>
  <TableBody>...</TableBody>
</Table>`}
        >
          <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10">
            <Table appearance="bordered" stickyHeader size="sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Alpha</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>3</TableCell>
                  <TableCell>Gamma</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </PreviewCodeShowcase>
      </div>
    </section>
  );
}
