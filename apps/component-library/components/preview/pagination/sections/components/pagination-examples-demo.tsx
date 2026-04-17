"use client";

import { useState } from "react";

import {
  Pagination,
  usePagination,
} from "@zentauri-ui/zentauri-components/ui/pagination";

export function PaginationExamplesControlledDemo() {
  const [page, setPage] = useState(7);

  return (
    <div>
      <Pagination
        appearance="outline"
        size="sm"
        pageCount={40}
        page={page}
        onPageChange={setPage}
        siblingCount={1}
        boundaryCount={1}
      />
      <p className="text-xs text-slate-400 mt-5">Current page: <span className="font-bold">{page}</span></p>
    </div>
  );
}

export function PaginationExamplesHeadlessDemo() {
  const [page, setPage] = useState(7);
  const headless = usePagination({
    pageCount: 40,
    page,
    siblingCount: 1,
    boundaryCount: 1,
    onPageChange: setPage,
  });

  return (
    <>
      <p className="max-w-2xl text-sm text-slate-400">
        Current page {headless.currentPage} of {headless.pageCount}.{" "}
        <code className="text-slate-200">canGoPrev</code>=
        {String(headless.canGoPrev)},{" "}
        <code className="text-slate-200">canGoNext</code>=
        {String(headless.canGoNext)}.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
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
      <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-slate-300">
        {JSON.stringify(headless.items, null, 2)}
      </pre>
    </>
  );
}
