import { variantLeadComment } from "@/components/common/variant-code-prefix";
import type { FileUploadVariantProps } from "@zentauri-ui/zentauri-components/ui/file-upload";

export function fileUploadSnippet(appearance: FileUploadVariantProps["appearance"]): string {
  return `${variantLeadComment("appearance · ${appearance}")}<FileUpload appearance="${appearance}" accept="image/*" multiple onFiles={setFiles} onChange={(e) => setFiles(Array.from(e.target.files || []))}>
  <span className="text-base font-semibold text-white">Upload images</span>
  <span className="text-xs text-slate-400">Selected files: <span className="font-bold">0</span>: <span className="font-semibold"></span></span>
</FileUpload>`;
}
