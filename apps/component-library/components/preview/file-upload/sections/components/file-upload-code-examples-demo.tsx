"use client";
import { FileUpload } from "@zentauri-ui/zentauri-components/ui/file-upload";

import type { FileUploadDemoProps } from "./file-upload-code-examples.types";
import { useState } from "react";

export function FileUploadDemo({ appearance }: FileUploadDemoProps) {
  const [files, setFiles] = useState<File[]>([]);
  if (appearance === "disabled") {
    return <FileUpload disabled />;
  }
  return (
    <FileUpload appearance={appearance} accept="image/*" multiple onFiles={setFiles} onChange={(e) => setFiles(Array.from(e.target.files || []))}>
      <span className="text-base font-semibold text-white">
        Upload images
      </span>
      <span className="text-xs text-slate-400">Selected files: <span className="font-bold">{files.length}</span>: <span className="font-semibold">{files.map((file) => file.name).join(", ")}</span></span>

    </FileUpload>
  );
}
