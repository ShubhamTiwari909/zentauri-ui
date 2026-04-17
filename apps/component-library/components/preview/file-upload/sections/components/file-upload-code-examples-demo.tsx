import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

import type { FileUploadDemoProps } from "./file-upload-code-examples.types";

export function FileUploadDemo({ appearance }: FileUploadDemoProps) {
  if (appearance === "disabled") {
    return <FileUpload disabled />;
  }
  return (
    <FileUpload appearance={appearance} accept=".csv,text/csv" multiple>
      <span className="text-base font-semibold text-white">
        Upload CSV exports
      </span>
      <span className="text-xs text-slate-400">Multiple files supported</span>
    </FileUpload>
  );
}
