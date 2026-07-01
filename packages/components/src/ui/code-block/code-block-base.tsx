"use client";

import { useCallback } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";

import type { CodeBlockBaseProps, CodeBlockLabels } from "./types";
import {
  codeBlockVariants,
  zuiCodeBlockActionBase,
  zuiCodeBlockBodyBase,
  zuiCodeBlockHeaderBase,
  zuiCodeBlockLangBase,
  zuiCodeBlockLineNumber,
  zuiCodeBlockPre,
} from "./variants";

export function splitCodeLines(code: string): string[] {
  return code.split("\n");
}

const DEFAULT_LABELS: Required<CodeBlockLabels> = {
  copy: "Copy",
  copied: "Copied",
};

export function CodeBlockHeader({
  language,
  enableClipboard,
  labels,
  getCopyText,
}: {
  language?: string;
  enableClipboard: boolean;
  labels: Required<CodeBlockLabels>;
  getCopyText: () => string;
}) {
  const { copied, copy } = useClipboard(2000);

  const handleCopy = useCallback(async () => {
    await copy(getCopyText());
  }, [copy, getCopyText]);

  return (
    <div data-slot="code-block-header" className={zuiCodeBlockHeaderBase}>
      {language && (
        <span data-slot="code-block-lang" className={zuiCodeBlockLangBase}>
          {language}
        </span>
      )}
      {enableClipboard && (
        <button
          type="button"
          data-slot="code-block-copy"
          className={zuiCodeBlockActionBase}
          onClick={handleCopy}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      )}
    </div>
  );
}

export function CodeBlockCode({
  code,
  showLineNumbers,
}: {
  code: string;
  showLineNumbers?: boolean;
}) {
  if (!showLineNumbers) {
    return <code data-slot="code-block-code">{code}</code>;
  }

  const lines = splitCodeLines(code);

  return (
    <code data-slot="code-block-code">
      {lines.map((line, index) => (
        <span key={index} data-slot="code-block-line" className="flex">
          <span
            data-slot="code-block-line-number"
            className={zuiCodeBlockLineNumber}
          >
            {index + 1}
          </span>
          <span data-slot="code-block-line-content" className="pl-3">
            {line || "\u00A0"}
          </span>
        </span>
      ))}
    </code>
  );
}

export function CodeBlockBase({
  code,
  language,
  appearance,
  size,
  showLineNumbers = false,
  enableClipboard = true,
  showHeader = true,
  showLang = true,
  labels,
  className,
  ref,
  ...rest
}: CodeBlockBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const getCopyText = () => code;

  return (
    <div
      ref={ref}
      data-slot="code-block"
      className={cn(codeBlockVariants({ appearance, size }), className)}
      {...rest}
    >
      {showHeader && (
        <CodeBlockHeader
          language={showLang ? language : undefined}
          enableClipboard={enableClipboard}
          labels={mergedLabels}
          getCopyText={getCopyText}
        />
      )}
      <div data-slot="code-block-body" className={zuiCodeBlockBodyBase}>
        <pre className={zuiCodeBlockPre}>
          <CodeBlockCode code={code} showLineNumbers={showLineNumbers} />
        </pre>
      </div>
    </div>
  );
}

CodeBlockBase.displayName = "CodeBlock";
