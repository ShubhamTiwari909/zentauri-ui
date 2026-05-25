import { Section } from "@/components/common/Section";
import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function FileUploadExamplesSection() {
  return (
    <Section className="space-y-6">
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
    </Section>
  );
}
