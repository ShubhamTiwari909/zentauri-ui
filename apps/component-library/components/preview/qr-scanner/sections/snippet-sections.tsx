"use client";

import { useRef, useState } from "react";

import CodeHighlight from "@/components/CodeHighlight";
import { Section } from "@/components/common/Section";
import { QrCode } from "@zentauri-ui/zentauri-components/ui/qr-code";
import { QrScanner } from "@zentauri-ui/zentauri-components/ui/qr-scanner";
import type { QrScannerRef } from "@zentauri-ui/zentauri-components/ui/qr-scanner";

function ScannerPlayground() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const scannerRef = useRef<QrScannerRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    try {
      const data = await scannerRef.current?.scanImage(file);
      if (data) {
        setResult(data);
      } else {
        setError("No QR code found in the image.");
      }
    } catch {
      setError("Failed to process the image.");
    }
    e.target.value = "";
  };

  const BASIC_SOURCE = `import { useRef } from "react";
import { QrScanner } from "@zentauri-ui/zentauri-components/ui/qr-scanner";
import type { QrScannerRef } from "@zentauri-ui/zentauri-components/ui/qr-scanner";

function ScannerDemo() {
  const ref = useRef<QrScannerRef>(null);
  const [result, setResult] = useState<string | null>(null);

  return (
    <div>
      <QrScanner
        ref={ref}
        onResult={(data) => setResult(data)}
        continuous={false}
      />
      <button onClick={() => ref.current?.start()}>
        Start camera
      </button>
      {result && <p>Scanned: {result}</p>}
    </div>
  );
}`;

  const FILE_SOURCE = `import { useRef } from "react";
import { QrScanner } from "@zentauri-ui/zentauri-components/ui/qr-scanner";
import type { QrScannerRef } from "@zentauri-ui/zentauri-components/ui/qr-scanner";

function FileScanner() {
  const ref = useRef<QrScannerRef>(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await ref.current?.scanImage(file);
    console.log("Scanned:", data);
  };

  return (
    <>
      <QrScanner ref={ref} onResult={console.log} />
      <input type="file" accept="image/*" onChange={handleFile} />
    </>
  );
}`;

  return (
    <>
      <Section>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Scan from camera
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Point your camera at a QR code. The scanner decodes it in real time
          and displays the result below.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {!cameraStarted ? (
              <button
                type="button"
                onClick={() => {
                  setCameraStarted(true);
                  scannerRef.current?.start();
                }}
                className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/50 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors"
              >
                <svg
                  className="size-10"
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
              <QrScanner
                ref={scannerRef}
                onResult={(data) => {
                  setResult(data);
                  setError(null);
                }}
                continuous={false}
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Result
              </p>
              {result ? (
                <p className="break-all font-mono text-sm text-emerald-300">
                  {result}
                </p>
              ) : error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : (
                <p className="text-sm text-slate-500">
                  Scan a QR code to see the result here
                </p>
              )}
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Or scan from an image
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileScan}
                className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-sm file:text-slate-200 hover:file:bg-slate-700"
              />
            </div>

            <div className="flex items-center justify-center rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <QrCode
                value="Hello Zentauri!"
                canvasSize={120}
                caption="Try scanning this"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Basic usage
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Render the scanner with an <code className="text-sm">onResult</code>{" "}
          callback to receive decoded data. Call{" "}
          <code className="text-sm">start()</code> on the ref to activate the
          camera.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <CodeHighlight codeString={BASIC_SOURCE} language="tsx" />
        </div>
      </Section>

      <Section>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
          Scan from an image file
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Use the imperative handle to scan QR codes from uploaded images via
          the <code className="text-sm">scanImage</code> method.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <CodeHighlight codeString={FILE_SOURCE} language="tsx" />
        </div>
      </Section>
    </>
  );
}

export function QrScannerCodeExamplesSection() {
  return <ScannerPlayground />;
}
