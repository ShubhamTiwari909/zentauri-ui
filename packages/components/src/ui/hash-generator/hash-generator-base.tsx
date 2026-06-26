"use client";

import { useCallback, useEffect, useState } from "react";

import { cn } from "../../lib/utils";

import type { HashGeneratorAlgorithm, HashGeneratorBaseProps } from "./types";
import { ALGORITHM_LABELS } from "./types";
import {
  hashGeneratorHeaderVariants,
  hashGeneratorInputVariants,
  hashGeneratorLabelVariants,
  hashGeneratorOutputTextVariants,
  hashGeneratorOutputVariants,
  hashGeneratorVariants,
} from "./variants";

async function computeHash(
  algorithm: HashGeneratorAlgorithm,
  input: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(
    algorithm.toUpperCase().replace("SHA", "SHA-") as AlgorithmIdentifier,
    data,
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashGeneratorBase({
  className,
  appearance,
  size,
  algorithm = "sha256",
  value,
  onValueChange,
  readOnly = false,
  showCopyButton = true,
  ref,
  ...rest
}: HashGeneratorBaseProps) {
  const [internalValue, setInternalValue] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const inputValue = value ?? internalValue;
  const handleChange = onValueChange ?? setInternalValue;

  useEffect(() => {
    if (!inputValue) {
      setHash("");
      return;
    }
    let cancelled = false;
    computeHash(algorithm, inputValue).then((result) => {
      if (!cancelled) {
        setHash(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [algorithm, inputValue]);

  const handleCopy = useCallback(async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [hash]);

  return (
    <div
      ref={ref}
      data-slot="hash-generator"
      className={cn(hashGeneratorVariants({ appearance, size }), className)}
      {...rest}
    >
      <div className={hashGeneratorHeaderVariants()}>
        <span className={hashGeneratorLabelVariants()}>
          {ALGORITHM_LABELS[algorithm]}
        </span>
        {showCopyButton && hash ? (
          <button
            type="button"
            onClick={handleCopy}
            className="rounded px-2 py-0.5 text-xs font-medium transition-colors text-[color:var(--zui-hash-generator-label-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-hash-generator-label-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))] hover:bg-[var(--zui-hash-generator-header-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:hover:bg-[var(--zui-hash-generator-header-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))]"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        ) : null}
      </div>
      <textarea
        data-slot="hash-generator-input"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        readOnly={readOnly}
        placeholder="Enter text to hash..."
        rows={3}
        className={cn(hashGeneratorInputVariants(), "resize-y min-h-[5rem]")}
      />
      <div className={hashGeneratorOutputVariants()}>
        <span
          data-slot="hash-generator-output"
          className={cn(
            hashGeneratorOutputTextVariants(),
            !hash && "opacity-40",
          )}
        >
          {hash || "Hash output"}
        </span>
      </div>
    </div>
  );
}

HashGeneratorBase.displayName = "HashGenerator";
