"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";
import { useClipboard } from "../../../hooks/useClipboard";

import type { PackageInstallCommandLabels, PackageManager } from "../types";
import {
  PackageInstallCommandCode,
  PackageInstallCommandTabs,
  buildInstallCommand,
} from "../package-install-command-base";
import {
  packageInstallCommandActionVariants,
  packageInstallCommandBodyVariants,
  packageInstallCommandVariants,
} from "../variants";

import { packageInstallCommandAnimationPresets } from "./animations";
import type { PackageInstallCommandAnimatedProps } from "./types";

const DEFAULT_LABELS: Required<PackageInstallCommandLabels> = {
  copy: "Copy",
  copied: "Copied",
};

export function PackageInstallCommandAnimated({
  packageName,
  appearance,
  size,
  defaultManager = "npm",
  enableClipboard = true,
  labels,
  animation = "none",
  className,
  ref,
  ...rest
}: PackageInstallCommandAnimatedProps) {
  const [manager, setManager] = useState<PackageManager>(defaultManager);
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const { copied, copy } = useClipboard(2000);
  const preset = packageInstallCommandAnimationPresets[animation];

  const command = buildInstallCommand(packageName, manager);

  const handleCopy = useCallback(async () => {
    await copy(command);
  }, [copy, command]);

  return (
    <div
      ref={ref}
      data-slot="package-install-command"
      className={cn(
        packageInstallCommandVariants({ appearance, size }),
        className,
      )}
      {...rest}
    >
      <PackageInstallCommandTabs manager={manager} onSelect={setManager} />
      <motion.div
        data-slot="package-install-command-body"
        className={packageInstallCommandBodyVariants()}
        initial="hidden"
        animate="visible"
        variants={preset.variants}
        transition={preset.transition}
        key={command}
      >
        <PackageInstallCommandCode command={command} />
        {enableClipboard && (
          <button
            type="button"
            data-slot="package-install-command-copy"
            className={packageInstallCommandActionVariants()}
            onClick={handleCopy}
          >
            {copied ? mergedLabels.copied : mergedLabels.copy}
          </button>
        )}
      </motion.div>
    </div>
  );
}

PackageInstallCommandAnimated.displayName = "PackageInstallCommandAnimated";
