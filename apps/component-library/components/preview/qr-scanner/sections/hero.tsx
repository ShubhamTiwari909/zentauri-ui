"use client";

import { useRef, useState } from "react";

import { Section } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import { QrScanner } from "@zentauri-ui/zentauri-components/ui/qr-scanner";
import type { QrScannerRef } from "@zentauri-ui/zentauri-components/ui/qr-scanner";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

export function QrScannerHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  const [result, setResult] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const scannerRef = useRef<QrScannerRef>(null);

  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-4">
          {!cameraStarted ? (
            <button
              type="button"
              onClick={() => {
                setCameraStarted(true);
                scannerRef.current?.start();
              }}
              className="flex size-48 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-400 transition-colors"
            >
              <svg
                className="size-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                />
              </svg>
              <span className="text-sm font-medium">Start camera</span>
            </button>
          ) : (
            <div className="w-full max-w-sm overflow-hidden rounded-2xl">
              <QrScanner
                ref={scannerRef}
                onResult={(data) => setResult(data)}
                continuous={false}
                className="max-h-72"
              />
            </div>
          )}

          {result ? (
            <div className="w-full max-w-sm rounded-xl bg-slate-900/5 dark:bg-white/5 p-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Scanned result
              </p>
              <p className="text-sm break-all font-mono text-slate-900 dark:text-white">
                {result}
              </p>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  scannerRef.current?.start();
                }}
                className="mt-2 text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                Scan again
              </button>
            </div>
          ) : null}

          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <span>manual start</span>
            <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>single scan</span>
            <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>file upload in playground</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
