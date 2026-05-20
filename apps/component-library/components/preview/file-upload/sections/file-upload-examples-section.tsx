import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function FileUploadExamplesSection() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-900/10 dark:border-white/10 bg-white dark:bg-white/5 p-5">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Custom label
      </h2>
      <div>
        <FileUpload multiple accept=".csv,text/csv">
          <span className="text-base font-semibold text-slate-900 dark:text-white">
            Upload CSV exports
          </span>
          <span className="text-xs text-slate-800 dark:text-slate-400">
            Multiple files supported
          </span>
        </FileUpload>
      </div>
    </section>
  );
}
