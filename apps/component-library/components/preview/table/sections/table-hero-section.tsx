import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Data
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tables for dense, scannable data.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Caption support, striped and bordered appearances, and row hover
            treatments aligned with the dark shell.
          </p>
        </div>
      </div>

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
