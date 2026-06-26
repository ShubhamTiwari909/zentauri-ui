"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import { QR_CODE_LEVEL_LABELS } from "@zentauri-ui/zentauri-components/ui/qr-code";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { QrCodeDemo } from "./demo";
import { QR_CODE_LEVELS } from "./data";
import { qrCodeSnippet } from "./snippets";

export function QrCodePlayground() {
  const [inputValue, setValue] = useState("https://zentauri-ui.vercel.app");
  const [level, setLevel] = useState<string>("M");

  const demoProps = {
    value: inputValue,
    caption: inputValue.replace(/^https?:\/\//, ""),
    level,
  };

  const code = qrCodeSnippet(demoProps);

  return (
    <div className="mt-6 rounded-xl">
      <p className="mb-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        The <code className="text-sm">level</code> prop controls the QR code's
        error correction capacity — higher levels survive more damage but reduce
        data capacity.{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          L
        </strong>{" "}
        recovers ~7% damage,{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          M
        </strong>{" "}
        ~15% (default),{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          Q
        </strong>{" "}
        ~25%, and{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          H
        </strong>{" "}
        ~30%.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Value
          </span>
          <input
            type="text"
            value={demoProps.value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-sky-400"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Error correction level
          </span>
          <Select
            multiple={false}
            value={[level]}
            onChange={(values) => {
              const next = values[0];
              if (next) {
                setLevel(next);
              }
            }}
          >
            <SelectTrigger variant="outline" size="sm" className="w-full">
              <SelectValue
                placeholder={`${level} · ${QR_CODE_LEVEL_LABELS[level as keyof typeof QR_CODE_LEVEL_LABELS]}`}
              />
            </SelectTrigger>
            <SelectContent
              appearance="default"
              size="sm"
              className="max-h-72 overflow-y-auto"
            >
              {QR_CODE_LEVELS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option} · {QR_CODE_LEVEL_LABELS[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <PreviewCodeShowcase code={code}>
        <QrCodeDemo {...demoProps} />
      </PreviewCodeShowcase>
    </div>
  );
}
