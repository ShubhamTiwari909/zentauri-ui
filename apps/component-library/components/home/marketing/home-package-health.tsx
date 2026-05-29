import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";
import { FiCheckCircle, FiClock, FiFileText, FiPackage } from "react-icons/fi";

import { SectionShell } from "./section-shell";

const TEST_TOTALS = [
  {
    label: "Test files",
    value: "57",
    detail: "57 passed",
    icon: FiFileText,
  },
  {
    label: "Assertions",
    value: "352",
    detail: "352 passed",
    icon: FiCheckCircle,
  },
  {
    label: "Runtime",
    value: "13.14s",
    detail: "Vitest duration",
    icon: FiClock,
  },
  {
    label: "Package",
    value: "npm",
    detail: "@zentauri-ui/zentauri-components",
    icon: FiPackage,
  },
] as const;

const TEST_AREAS = [
  { area: "Components and UI utilities", files: "29", tests: "258" },
  { area: "React hooks", files: "26", tests: "85" },
  { area: "CLI and import rewriting", files: "2", tests: "9" },
] as const;

export function HomePackageHealth() {
  return (
    <SectionShell
        eyebrow="Package health"
        title="Published on npm and covered by Vitest"
        lead="The component package is tracked with live npm badges and a current test snapshot across UI primitives, hooks, and CLI behavior."
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.shields.io/npm/v/@zentauri-ui/zentauri-components"
              alt="@zentauri-ui/zentauri-components npm version"
              width="184"
              height="20"
              loading="lazy"
              decoding="async"
              className="h-5 w-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://img.shields.io/npm/dm/@zentauri-ui/zentauri-components"
              alt="@zentauri-ui/zentauri-components monthly npm downloads"
              width="214"
              height="20"
              loading="lazy"
              decoding="async"
              className="h-5 w-auto"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEST_TOTALS.map(({ label, value, detail, icon: Icon }) => (
              <article
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-lg shadow-slate-950/25"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-200 ring-1 ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {label}
                    </p>
                    <p className="text-2xl font-semibold tracking-tight text-white">
                      {value}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {detail}
                </p>
              </article>
            ))}
          </div>

          <Table appearance="sky">
            <TableHeader>
              <TableRow className="text-white">
                <TableHead className="p-5">Area</TableHead>
                <TableHead className="p-5 text-right">Files</TableHead>
                <TableHead className="p-5 text-right">Tests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TEST_AREAS.map((row) => (
                <TableRow
                  key={row.area}
                  className="border-b border-white/5 last:border-0"
                >
                  <TableCell className="p-5 font-medium text-white">
                    {row.area}
                  </TableCell>
                  <TableCell className="p-5 text-right text-slate-200">
                    {row.files}
                  </TableCell>
                  <TableCell className="p-5 text-right text-slate-200">
                    {row.tests}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionShell>
  );
}
