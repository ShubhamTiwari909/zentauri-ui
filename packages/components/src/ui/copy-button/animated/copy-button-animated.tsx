"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CopyButtonBase } from "../copy-button-base";
import type { CopyButtonIconRenderer } from "../types";

import { copyButtonAnimationPresets } from "./animations";
import type { CopyButtonAnimatedProps } from "./types";

export function CopyButtonAnimated({
  animation = "swap",
  ...props
}: CopyButtonAnimatedProps) {
  const preset = copyButtonAnimationPresets[animation];

  const renderIcon: CopyButtonIconRenderer = ({
    copied,
    copyIcon,
    copiedIcon,
  }) => (
    <AnimatePresence initial={false} mode="wait">
      <motion.span
        key={copied ? "copied" : "idle"}
        className="inline-flex items-center justify-center"
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={preset.transition}
      >
        {copied ? copiedIcon : copyIcon}
      </motion.span>
    </AnimatePresence>
  );

  return <CopyButtonBase {...props} renderIcon={renderIcon} />;
}

CopyButtonAnimated.displayName = "CopyButtonAnimated";
