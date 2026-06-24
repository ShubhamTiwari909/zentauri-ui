"use client";

import { diffLines } from "diff";

import { cn } from "../../lib/utils";

import type { CodeDiffBaseProps, DiffLine } from "./types";
import {
  codeDiffLineContentVariants,
  codeDiffLineNumberVariants,
  codeDiffVariants,
} from "./variants";

function computeDiff(oldCode: string, newCode: string): DiffLine[] {
  const changes = diffLines(oldCode, newCode);
  const lines: DiffLine[] = [];
  let oldLineNum = 1;
  let newLineNum = 1;

  for (const change of changes) {
    const changeLines = change.value.replace(/\n$/, "").split("\n");
    for (const content of changeLines) {
      if (change.added) {
        lines.push({
          type: "added",
          content,
          oldLineNumber: null,
          newLineNumber: newLineNum++,
        });
      } else if (change.removed) {
        lines.push({
          type: "removed",
          content,
          oldLineNumber: oldLineNum++,
          newLineNumber: null,
        });
      } else {
        lines.push({
          type: "unchanged",
          content,
          oldLineNumber: oldLineNum++,
          newLineNumber: newLineNum++,
        });
      }
    }
  }
  return lines;
}

interface SplitRow {
  oldLine: DiffLine | null;
  newLine: DiffLine | null;
}

function toSplitRows(lines: DiffLine[]): SplitRow[] {
  const rows: SplitRow[] = [];
  let i = 0;

  while (i < lines.length) {
    const current = lines[i]!;

    if (current.type === "unchanged") {
      rows.push({ oldLine: current, newLine: current });
      i++;
    } else if (current.type === "removed") {
      const removedBlock: DiffLine[] = [];
      while (i < lines.length && lines[i]!.type === "removed") {
        removedBlock.push(lines[i]!);
        i++;
      }
      const addedBlock: DiffLine[] = [];
      while (i < lines.length && lines[i]!.type === "added") {
        addedBlock.push(lines[i]!);
        i++;
      }
      const maxLen = Math.max(removedBlock.length, addedBlock.length);
      for (let j = 0; j < maxLen; j++) {
        rows.push({
          oldLine: j < removedBlock.length ? removedBlock[j]! : null,
          newLine: j < addedBlock.length ? addedBlock[j]! : null,
        });
      }
    } else if (current.type === "added") {
      const addedBlock: DiffLine[] = [];
      while (i < lines.length && lines[i]!.type === "added") {
        addedBlock.push(lines[i]!);
        i++;
      }
      for (const added of addedBlock) {
        rows.push({ oldLine: null, newLine: added });
      }
    } else {
      i++;
    }
  }
  return rows;
}

function LineNumberCell({
  lineNumber,
  type,
  showLineNumbers,
}: {
  lineNumber: number | null;
  type: DiffLine["type"];
  showLineNumbers: boolean;
}) {
  return (
    <td
      className={codeDiffLineNumberVariants({ type })}
      style={{ width: showLineNumbers ? "4.5rem" : "2rem" }}
    >
      {showLineNumbers && lineNumber !== null ? lineNumber : ""}
    </td>
  );
}

function LineContentCell({
  line,
  type,
  showGutterMarkers,
}: {
  line: string;
  type: DiffLine["type"];
  showGutterMarkers: boolean;
}) {
  return (
    <td className={codeDiffLineContentVariants({ type })}>
      {showGutterMarkers ? (
        <span className="inline-block w-4 select-none text-center">
          {type === "added" ? "+" : type === "removed" ? "-" : " "}
        </span>
      ) : null}
      <span>{line || " "}</span>
    </td>
  );
}

function UnifiedView({
  lines,
  showLineNumbers,
  showGutterMarkers,
}: {
  lines: DiffLine[];
  showLineNumbers: boolean;
  showGutterMarkers: boolean;
}) {
  return (
    <table className="w-full border-collapse table-fixed">
      <tbody>
        {lines.map((line, idx) => (
          <tr key={idx}>
            <LineNumberCell
              lineNumber={line.oldLineNumber}
              type={line.type}
              showLineNumbers={showLineNumbers}
            />
            <LineNumberCell
              lineNumber={line.newLineNumber}
              type={line.type}
              showLineNumbers={showLineNumbers}
            />
            <LineContentCell
              line={line.content}
              type={line.type}
              showGutterMarkers={showGutterMarkers}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SplitView({
  lines,
  showLineNumbers,
  showGutterMarkers,
}: {
  lines: DiffLine[];
  showLineNumbers: boolean;
  showGutterMarkers: boolean;
}) {
  const rows = toSplitRows(lines);

  return (
    <table className="w-full border-collapse table-fixed">
      <colgroup>
        <col style={{ width: showLineNumbers ? "4.5rem" : "2rem" }} />
        <col />
        <col style={{ width: showLineNumbers ? "4.5rem" : "2rem" }} />
        <col />
      </colgroup>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <LineNumberCell
              lineNumber={row.oldLine?.oldLineNumber ?? null}
              type={row.oldLine?.type ?? "unchanged"}
              showLineNumbers={showLineNumbers}
            />
            <LineContentCell
              line={row.oldLine?.content ?? ""}
              type={row.oldLine?.type ?? "unchanged"}
              showGutterMarkers={showGutterMarkers}
            />
            <LineNumberCell
              lineNumber={row.newLine?.newLineNumber ?? null}
              type={row.newLine?.type ?? "unchanged"}
              showLineNumbers={showLineNumbers}
            />
            <LineContentCell
              line={row.newLine?.content ?? ""}
              type={row.newLine?.type ?? "unchanged"}
              showGutterMarkers={showGutterMarkers}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CodeDiffBase({
  className,
  appearance,
  size,
  oldCode,
  newCode,
  viewType = "unified",
  showLineNumbers = true,
  showGutterMarkers = true,
  oldTitle = "Old",
  newTitle = "New",
  ref,
  as: Wrapper = "div",
  ...rest
}: CodeDiffBaseProps) {
  const lines = computeDiff(oldCode, newCode);
  const hasChanges = lines.some(
    (l) => l.type === "added" || l.type === "removed",
  );

  return (
    <Wrapper
      ref={ref}
      data-slot="code-diff"
      className={cn(codeDiffVariants({ appearance, size }), className)}
      {...rest}
    >
      {hasChanges ? (
        <div className="sticky top-0 flex items-center justify-between border-b border-[color:var(--zui-code-diff-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-code-diff-border-dark,var(--zui-border-dark,#ffffff1a))] bg-[var(--zui-code-diff-header-bg,var(--zui-surface-muted,oklch(92.9%_0.013_255.508)))] dark:bg-[var(--zui-code-diff-header-bg-dark,var(--zui-surface-muted-dark,oklch(27.9%_0.041_260.031)))] px-4 py-2">
          <span className="text-xs font-medium">
            {lines.filter((l) => l.type === "added").length} additions{" "}
            <span className="mx-1">&bull;</span>{" "}
            {lines.filter((l) => l.type === "removed").length} deletions
          </span>
          <span className="text-xs text-[color:var(--zui-code-diff-header-fg,var(--zui-fg-muted,oklch(55.2%_0.046_257.417)))] dark:text-[color:var(--zui-code-diff-header-fg-dark,var(--zui-fg-muted-dark,oklch(70.8%_0.015_256.243)))]">
            {oldTitle} &rarr; {newTitle}
          </span>
        </div>
      ) : null}
      {viewType === "split" ? (
        <SplitView
          lines={lines}
          showLineNumbers={showLineNumbers}
          showGutterMarkers={showGutterMarkers}
        />
      ) : (
        <UnifiedView
          lines={lines}
          showLineNumbers={showLineNumbers}
          showGutterMarkers={showGutterMarkers}
        />
      )}
    </Wrapper>
  );
}

CodeDiffBase.displayName = "CodeDiff";
