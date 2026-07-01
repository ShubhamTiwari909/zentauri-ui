"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import type { CodeBlockLabels } from "../types";
import { CodeBlockCode, CodeBlockHeader } from "../code-block-base";
import {
  codeBlockVariants,
  zuiCodeBlockBodyBase,
  zuiCodeBlockPre,
} from "../variants";

import { codeBlockAnimationPresets } from "./animations";
import type { CodeBlockAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<CodeBlockLabels> = {
  copy: "Copy",
  copied: "Copied",
};

export function CodeBlockAnimated({
  code,
  language,
  appearance,
  size,
  showLineNumbers = false,
  enableClipboard = true,
  showHeader = true,
  showLang = true,
  labels,
  animation = "none",
  className,
  ref,
  ...rest
}: CodeBlockAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const preset = codeBlockAnimationPresets[animation];

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
          getCopyText={() => code}
        />
      )}
      <motion.div
        data-slot="code-block-body"
        className={zuiCodeBlockBodyBase}
        initial="hidden"
        animate="visible"
        variants={preset.variants}
        transition={preset.transition}
      >
        <pre className={zuiCodeBlockPre}>
          <CodeBlockCode code={code} showLineNumbers={showLineNumbers} />
        </pre>
      </motion.div>
    </div>
  );
}

CodeBlockAnimated.displayName = "CodeBlockAnimated";
