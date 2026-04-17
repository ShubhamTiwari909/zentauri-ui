"use client";

import { useCallback, useId, useState } from "react";

import { cn } from "../../lib/utils";

import type { FileUploadProps } from "./types";
import { fileUploadVariants } from "./variants";

export function FileUpload({
  className,
  onFiles,
  accept,
  multiple = false,
  disabled = false,
  name,
  children,
  onChange,
  ref,
  appearance = "idle",
  ...rest
}: FileUploadProps & { ref?: React.Ref<HTMLDivElement> }) {
  const inputId = useId();
  const [dragOver, setDragOver] = useState(false);

  const emitFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList?.length) {
        return;
      }
      onFiles?.(Array.from(fileList));
    },
    [onFiles],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      emitFiles(event.target.files);
      event.target.value = "";
    },
    [emitFiles, onChange],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setDragOver(false);
      if (disabled) {
        return;
      }
      emitFiles(event.dataTransfer.files);
    },
    [disabled, emitFiles],
  );

  return (
    <div
      ref={ref}
      data-slot="file-upload"
      className={cn(fileUploadVariants({ appearance }), className)}
      {...rest}
    >
      <input
        id={inputId}
        name={name}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        aria-hidden
        tabIndex={-1}
      />
      <label
        htmlFor={inputId}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center gap-2",
          disabled && "cursor-not-allowed",
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) {
            setDragOver(true);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) {
            setDragOver(true);
          }
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {children ?? (
          <>
            <span className="text-base font-semibold text-slate-100">
              Drop files here
            </span>
            <span className="text-xs text-slate-400">
              or click to browse from your device
            </span>
          </>
        )}
        {
          dragOver && (
            <span className="text-xs text-slate-400">
              Drop files here
            </span>
          )
        }
      </label>
    </div>
  );
}

FileUpload.displayName = "FileUpload";
