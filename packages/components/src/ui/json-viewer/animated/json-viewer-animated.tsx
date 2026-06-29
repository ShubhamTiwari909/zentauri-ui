"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

import { cn } from "../../../lib/utils";

import {
  formatJsonPrimitive,
  isJsonContainer,
  jsonContainerSummary,
  jsonEntries,
  jsonValueKind,
  JsonViewerToolbar,
  useJsonExpansion,
} from "../json-viewer-base";
import type { JsonViewerLabels } from "../types";
import {
  jsonViewerValueVariants,
  jsonViewerVariants,
  zuiJsonViewerGuide,
  zuiJsonViewerKey,
  zuiJsonViewerPreview,
  zuiJsonViewerPunctuation,
  zuiJsonViewerToggleBase,
  zuiJsonViewerTreeBase,
} from "../variants";

import { jsonViewerAnimationPresets } from "./animations";
import type { JsonViewerAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<JsonViewerLabels> = {
  expandAll: "Expand all",
  collapseAll: "Collapse all",
  copy: "Copy",
  copied: "Copied",
  root: "root",
};

type Expansion = ReturnType<typeof useJsonExpansion>;
type Preset =
  (typeof jsonViewerAnimationPresets)[keyof typeof jsonViewerAnimationPresets];

type NodeProps = {
  name?: string;
  value: unknown;
  path: string;
  isLast: boolean;
  isArrayItem: boolean;
  expansion: Expansion;
  quoteStrings: boolean;
  showItemCount: boolean;
  preset: Preset;
};

function NodeKey({
  name,
  isArrayItem,
}: {
  name?: string;
  isArrayItem: boolean;
}) {
  if (name === undefined) return null;
  return (
    <>
      <span data-slot="json-viewer-key" className={zuiJsonViewerKey}>
        {isArrayItem ? name : JSON.stringify(name)}
      </span>
      <span className={zuiJsonViewerPunctuation}>:&nbsp;</span>
    </>
  );
}

function AnimatedJsonNode(props: NodeProps) {
  const {
    name,
    value,
    path,
    isLast,
    isArrayItem,
    expansion,
    quoteStrings,
    showItemCount,
    preset,
  } = props;

  if (!isJsonContainer(value)) {
    const kind = jsonValueKind(value);
    return (
      <div
        data-slot="json-viewer-node"
        className="whitespace-pre-wrap break-words"
      >
        <NodeKey name={name} isArrayItem={isArrayItem} />
        <span
          data-slot="json-viewer-value"
          data-kind={kind}
          className={jsonViewerValueVariants({
            kind: kind as "string" | "number" | "boolean" | "null",
          })}
        >
          {formatJsonPrimitive(value, quoteStrings)}
        </span>
        {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
      </div>
    );
  }

  const open = expansion.isOpen(path);
  const entries = jsonEntries(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];

  return (
    <div data-slot="json-viewer-node">
      <div className="flex items-start">
        <button
          type="button"
          data-slot="json-viewer-toggle"
          aria-expanded={open}
          className={zuiJsonViewerToggleBase}
          onClick={() => expansion.toggle(path)}
        >
          <span
            aria-hidden="true"
            className={cn("transition-transform", open && "rotate-90")}
          >
            ▸
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <span className="whitespace-pre-wrap break-words">
            <NodeKey name={name} isArrayItem={isArrayItem} />
            <span className={zuiJsonViewerPunctuation}>{openBracket}</span>
            {!open && (
              <>
                <span className={zuiJsonViewerPreview}> … </span>
                <span className={zuiJsonViewerPunctuation}>{closeBracket}</span>
                {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
                {showItemCount && (
                  <span
                    data-slot="json-viewer-count"
                    className={zuiJsonViewerPreview}
                  >
                    {"  "}
                    {jsonContainerSummary(value)}
                  </span>
                )}
              </>
            )}
          </span>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="children"
                className="overflow-hidden"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={preset.variants}
                transition={preset.transition}
              >
                <div className={cn("ml-1.5 pl-3", zuiJsonViewerGuide)}>
                  {entries.map(([key, child], index) => (
                    <AnimatedJsonNode
                      key={key}
                      name={key}
                      value={child}
                      path={`${path}/${key}`}
                      isLast={index === entries.length - 1}
                      isArrayItem={Array.isArray(value)}
                      expansion={expansion}
                      quoteStrings={quoteStrings}
                      showItemCount={showItemCount}
                      preset={preset}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {open && (
            <span className="whitespace-pre-wrap">
              <span className={zuiJsonViewerPunctuation}>{closeBracket}</span>
              {!isLast && <span className={zuiJsonViewerPunctuation}>,</span>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function JsonViewerAnimated({
  data,
  appearance,
  size,
  defaultExpandedDepth = Number.POSITIVE_INFINITY,
  showToolbar = true,
  enableClipboard = true,
  showItemCount = true,
  quoteStrings = true,
  animation = "collapse",
  labels,
  className,
  ref,
  ...rest
}: JsonViewerAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const expansion = useJsonExpansion(data, defaultExpandedDepth);
  const preset = jsonViewerAnimationPresets[animation];
  const getCopyText = useCallback(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  return (
    <div
      ref={ref}
      data-slot="json-viewer"
      className={cn(jsonViewerVariants({ appearance, size }), className)}
      {...rest}
    >
      {showToolbar && (
        <JsonViewerToolbar
          labels={mergedLabels}
          enableClipboard={enableClipboard}
          onExpandAll={expansion.expandAll}
          onCollapseAll={expansion.collapseAll}
          getCopyText={getCopyText}
        />
      )}
      <div data-slot="json-viewer-tree" className={zuiJsonViewerTreeBase}>
        <AnimatedJsonNode
          value={data}
          path="$"
          isLast
          isArrayItem={false}
          expansion={expansion}
          quoteStrings={quoteStrings}
          showItemCount={showItemCount}
          preset={preset}
        />
      </div>
    </div>
  );
}

JsonViewerAnimated.displayName = "JsonViewerAnimated";
