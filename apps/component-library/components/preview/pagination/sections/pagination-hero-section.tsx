import { Pagination } from "@zentauri-ui/zentauri-components/ui/pagination";

export function PaginationHeroSection() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-cyan-200">
          Navigation
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pagination for long result sets.
          </h1>
          <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Controlled or uncontrolled page state, configurable sibling and boundary
            windows, optional URL links, and a headless <code className="text-cyan-200">usePagination</code> hook for custom layouts.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
        <Pagination
          appearance="indigo"
          pageCount={24}
          defaultPage={12}
          siblingCount={2}
          boundaryCount={1}
        />
      </div>
    </section>
  );
}
