"use client";

import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import {
  buildTerminalCopyText,
  TerminalEmulatorHeader,
} from "../terminal-emulator-base";
import type { TerminalEmulatorLabels } from "../types";
import {
  terminalEmulatorLineVariants,
  terminalEmulatorVariants,
  zuiTerminalEmulatorBodyBase,
  zuiTerminalEmulatorPrompt,
} from "../variants";

import {
  terminalEmulatorAnimationPresets,
  terminalEmulatorLineChildVariants,
} from "./animations";
import type { TerminalEmulatorAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<TerminalEmulatorLabels> = {
  copy: "Copy",
  copied: "Copied",
};

export function TerminalEmulatorAnimated({
  lines = [],
  appearance,
  size,
  prompt = "$",
  title,
  showHeader = true,
  showTrafficLights = true,
  enableClipboard = true,
  animation = "stagger",
  labels,
  className,
  ref,
  ...rest
}: TerminalEmulatorAnimatedProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const preset = terminalEmulatorAnimationPresets[animation];
  const isStagger = animation === "stagger";
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
      <motion.div
        data-slot="terminal-emulator-body"
        className={zuiTerminalEmulatorBodyBase}
        initial="hidden"
        animate="visible"
        variants={preset.variants}
        transition={preset.transition}
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            data-slot="terminal-emulator-line"
            data-type={line.type}
            className={cn(
              "whitespace-pre-wrap break-words",
              terminalEmulatorLineVariants({ tone: line.type }),
            )}
            variants={isStagger ? terminalEmulatorLineChildVariants : undefined}
            transition={preset.transition}
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
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

TerminalEmulatorAnimated.displayName = "TerminalEmulatorAnimated";
