import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { FileUploadVariantProps } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function fileUploadSnippet(appearance: FileUploadVariantProps["appearance"]): string {
  if (appearance === "idle") {
    return `${variantLeadComment("appearance · custom label, accept · .csv")}<FileUpload accept=".csv,text/csv" multiple>
  <span className="text-base font-semibold text-white">Upload CSV exports</span>
  <span className="text-xs text-slate-400">Multiple files supported</span>
</FileUpload>`;
  }
  if (appearance === "disabled") {
    return `${variantLeadComment("appearance · disabled")}<FileUpload disabled />`;
  }
  return `${variantLeadComment("appearance · default copy, accept · image/*")}<FileUpload accept="image/*" />`;
}
