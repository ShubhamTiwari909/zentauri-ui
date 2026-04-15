import { Input } from "@repo/components/ui";

export function InputsStatesSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
        States
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Disabled and read-only
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <span className="text-xs text-slate-400">Disabled</span>
          <Input
            disabled
            defaultValue="Cannot edit"
            aria-label="Disabled example"
          />
        </div>
        <div className="grid gap-2">
          <span className="text-xs text-slate-400">Read only</span>
          <Input
            readOnly
            defaultValue="account@corp.com"
            aria-label="Read only example"
          />
        </div>
      </div>
    </section>
  );
}
