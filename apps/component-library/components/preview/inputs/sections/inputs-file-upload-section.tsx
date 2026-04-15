import { Input } from "@zentauri-ui/zentauri-components/ui";

const fileUploadSizes = ["sm", "md", "lg"] as const;

export function InputsFileUploadSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-200">
            File upload
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            <code className="text-cyan-200/90">as=&quot;file&quot;</code>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          Wraps{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-cyan-100/90">
            {'<input type="file">'}
          </code>{" "}
          with the same CVA recipe. The native file-selector button inherits the
          active appearance colour, and all three sizes are supported.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {fileUploadSizes.map((size) => (
          <div key={size} className="grid gap-2">
            <span className="text-xs text-slate-400">{size}</span>
            <Input
              as="file"
              size={size}
              type="file"
              appearance="violet"
              aria-label={`File upload ${size}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
