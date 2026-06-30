"use client";

import { useCallback } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";

import type {
  TerminalEmulatorBaseProps,
  TerminalEmulatorLabels,
  TerminalLine,
} from "./types";
import {
  terminalEmulatorActionVariants,
  terminalEmulatorHeaderVariants,
  terminalEmulatorLineVariants,
  terminalEmulatorVariants,
  zuiTerminalEmulatorBodyBase,
  zuiTerminalEmulatorDot,
  zuiTerminalEmulatorPrompt,
  zuiTerminalEmulatorTitle,
} from "./variants";

const DEFAULT_LABELS: Required<TerminalEmulatorLabels> = {
  copy: "Copy",
  copied: "Copied",
};

/** Join all line text for copy: commands are prefixed with `prompt + " "`. */
export function buildTerminalCopyText(
  lines: TerminalLine[],
  prompt: string,
): string {
  return lines
    .map((line) =>
      line.type === "command" ? `${prompt} ${line.text}` : line.text,
    )
    .join("\n");
}

/** Window header bar: traffic-light dots, centered title, and a copy button. */
export function TerminalEmulatorHeader({
  title,
  showTrafficLights,
  enableClipboard,
  labels,
  getCopyText,
}: {
  title?: string;
  showTrafficLights: boolean;
  enableClipboard: boolean;
  labels: Required<TerminalEmulatorLabels>;
  getCopyText: () => string;
}) {
  const { copied, copy } = useClipboard(2000);

  const handleCopy = useCallback(async () => {
    await copy(getCopyText());
  }, [copy, getCopyText]);

  return (
    <div
      data-slot="terminal-emulator-header"
      className={terminalEmulatorHeaderVariants()}
    >
      {showTrafficLights && (
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5"
          data-slot="terminal-emulator-traffic-lights"
        >
          <span className={zuiTerminalEmulatorDot} />
          <span className={zuiTerminalEmulatorDot} />
          <span className={zuiTerminalEmulatorDot} />
        </div>
      )}
      <span
        data-slot="terminal-emulator-title"
        className={zuiTerminalEmulatorTitle}
      >
        {title}
      </span>
      {enableClipboard && (
        <button
          type="button"
          data-slot="terminal-emulator-copy"
          className={terminalEmulatorActionVariants()}
          onClick={handleCopy}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      )}
    </div>
  );
}

/** A single terminal line: optional prompt for commands, then the colored text. */
export function TerminalEmulatorLine({
  line,
  prompt,
}: {
  line: TerminalLine;
  prompt: string;
}) {
  return (
    <div
      data-slot="terminal-emulator-line"
      data-type={line.type}
      className={cn(
        "whitespace-pre-wrap break-words",
        terminalEmulatorLineVariants({ tone: line.type }),
      )}
    >
      {line.type === "command" && (
        <>
          <span
            data-slot="terminal-emulator-prompt"
            className={zuiTerminalEmulatorPrompt}
          >
            {prompt}
          </span>{" "}
        </>
      )}
      {line.text}
    </div>
  );
}

export function TerminalEmulatorBase({
  lines = [],
  appearance,
  size,
  prompt = "$",
  title,
  showHeader = true,
  showTrafficLights = true,
  enableClipboard = true,
  labels,
  className,
  ref,
  ...rest
}: TerminalEmulatorBaseProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const getCopyText = () => buildTerminalCopyText(lines, prompt);

  return (
    <div
      ref={ref}
      data-slot="terminal-emulator"
      className={cn(terminalEmulatorVariants({ appearance, size }), className)}
      {...rest}
    >
      {showHeader && (
        <TerminalEmulatorHeader
          title={title}
          showTrafficLights={showTrafficLights}
          enableClipboard={enableClipboard}
          labels={mergedLabels}
          getCopyText={getCopyText}
        />
      )}
      <div
        data-slot="terminal-emulator-body"
        className={zuiTerminalEmulatorBodyBase}
      >
        {lines.map((line, index) => (
          <TerminalEmulatorLine key={index} line={line} prompt={prompt} />
        ))}
      </div>
    </div>
  );
}

TerminalEmulatorBase.displayName = "TerminalEmulator";
