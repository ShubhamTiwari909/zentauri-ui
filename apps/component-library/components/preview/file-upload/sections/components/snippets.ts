import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { FileUploadVariantProps } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function fileUploadSnippet(
  appearance: FileUploadVariantProps["appearance"],
): string {
  if (appearance === "disabled") {
    return `${variantLeadComment("disabled")}<FileUpload disabled />`;
  }

  const appearanceAttr =
    appearance === "idle" ? "" : ` appearance="${appearance}"`;

  return `${variantLeadComment(`appearance · ${appearance}`)}<FileUpload${appearanceAttr} accept="image/*" multiple onFiles={setFiles} onChange={(e) => setFiles(Array.from(e.target.files || []))}>
  <span className="text-base font-semibold text-slate-900 dark:text-white">Upload images</span>
  <span className="text-xs text-slate-800 dark:text-slate-400">Selected files: <span className="font-bold">0</span>: <span className="font-semibold"></span></span>
</FileUpload>`;
}
