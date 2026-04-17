import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function FileUploadExamplesSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Custom label</h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <FileUpload multiple accept=".csv,text/csv">
          <span className="text-base font-semibold text-white">
            Upload CSV exports
          </span>
          <span className="text-xs text-slate-400">
            Multiple files supported
          </span>
        </FileUpload>
      </div>
    </section>
  );
}
