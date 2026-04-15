"use client";

import { useState } from "react";

import { Pagination, usePagination } from "@/components/ui/pagination";

export function PaginationExamplesSection() {
  const [page, setPage] = useState(7);
  const headless = usePagination({
    pageCount: 40,
    page,
    siblingCount: 1,
    boundaryCount: 1,
    onPageChange: setPage,
  });

  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Controlled + compact</h2>
        <p className="max-w-2xl text-sm text-slate-400">
          Middle window uses <code className="text-slate-200">siblingCount</code>; ends use{" "}
          <code className="text-slate-200">boundaryCount</code>. Prev and Next stay keyboard-friendly on the nav
          region.
        </p>
        <Pagination
          appearance="outline"
          size="sm"
          pageCount={40}
          page={page}
          onPageChange={setPage}
          siblingCount={1}
          boundaryCount={1}
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">Headless API</h2>
        <p className="max-w-2xl text-sm text-slate-400">
          Current page {headless.currentPage} of {headless.pageCount}.{" "}
          <code className="text-slate-200">canGoPrev</code>={String(headless.canGoPrev)},{" "}
          <code className="text-slate-200">canGoNext</code>={String(headless.canGoNext)}.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
            disabled={!headless.canGoPrev}
            onClick={headless.goPrev}
          >
            usePagination.goPrev
          </button>
          <button
            type="button"
            className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/5"
            disabled={!headless.canGoNext}
            onClick={headless.goNext}
          >
            usePagination.goNext
          </button>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-300">
          {JSON.stringify(headless.items, null, 2)}
        </pre>
      </div>
    </section>
  );
}
