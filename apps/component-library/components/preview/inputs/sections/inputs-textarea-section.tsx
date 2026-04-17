import { Input } from "@zentauri-ui/zentauri-components/ui/inputs";

export function InputsTextareaSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            Multiline
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            <code className="text-cyan-200/90">as=&quot;textarea&quot;</code>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Same CVA recipe, motion presets, and{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
            data-slot=&quot;input&quot;
          </code>{" "}
          as the single-line control; height uses min-height and vertical resize
          so longer copy stays comfortable.
        </p>
      </div>
      <div className="mt-6 grid max-w-2xl gap-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Description
        </label>
        <Input
          as="textarea"
          rows={4}
          animation="lift"
          placeholder="What should reviewers focus on?"
          aria-label="Pull request description"
        />
      </div>
    </section>
  );
}
