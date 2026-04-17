import { PreviewHeroSeoBlock } from "@/components/preview/seo/preview-hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";

export function TableHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <Table appearance="striped" size="sm">
          <TableCaption className="text-slate-400">Recent deploys</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>API</TableCell>
              <TableCell>iad</TableCell>
              <TableCell className="text-right">42ms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Workers</TableCell>
              <TableCell>fra</TableCell>
              <TableCell className="text-right">28ms</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
