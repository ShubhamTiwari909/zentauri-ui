"use client";

import { useCallback, useState } from "react";

import { cn } from "../../lib/utils";
import { useClipboard } from "../../hooks/useClipboard";

import type {
  PackageInstallCommandBaseProps,
  PackageInstallCommandLabels,
  PackageManager,
  PackageManagerConfig,
} from "./types";
import {
  packageInstallCommandActionVariants,
  packageInstallCommandBodyVariants,
  packageInstallCommandCodeVariants,
  packageInstallCommandTabVariants,
  packageInstallCommandTabsVariants,
  packageInstallCommandVariants,
} from "./variants";

const DEFAULT_LABELS: Required<PackageInstallCommandLabels> = {
  copy: "Copy",
  copied: "Copied",
};

export const PACKAGE_MANAGERS: PackageManagerConfig[] = [
  { name: "npm", command: "npm install", icon: "npm" },
  { name: "pnpm", command: "pnpm add", icon: "pnpm" },
  { name: "yarn", command: "yarn add", icon: "yarn" },
  { name: "bun", command: "bun add", icon: "bun" },
];

export function buildInstallCommand(
  pkg: string,
  manager: PackageManager,
): string {
  const config = PACKAGE_MANAGERS.find((m) => m.name === manager);
  if (!config) return `npm install ${pkg}`;
  return `${config.command} ${pkg}`;
}

export function PackageInstallCommandTabs({
  manager,
  onSelect,
}: {
  manager: PackageManager;
  onSelect: (manager: PackageManager) => void;
}) {
  return (
    <div
      data-slot="package-install-command-tabs"
      className={packageInstallCommandTabsVariants()}
    >
      {PACKAGE_MANAGERS.map((pm) => {
        const active = manager === pm.name;
        return (
          <button
            key={pm.name}
            type="button"
            data-slot="package-install-command-tab"
            data-active={active}
            className={packageInstallCommandTabVariants({
              state: active ? "active" : "inactive",
            })}
            onClick={() => onSelect(pm.name)}
          >
            {pm.icon} {pm.name}
          </button>
        );
      })}
    </div>
  );
}

export function PackageInstallCommandCode({ command }: { command: string }) {
  return (
    <code
      data-slot="package-install-command-code"
      className={packageInstallCommandCodeVariants()}
    >
      {command}
    </code>
  );
}

export function PackageInstallCommandBase({
  package: pkg,
  appearance,
  size,
  defaultManager = "npm",
  enableClipboard = true,
  labels,
  className,
  ref,
  ...rest
}: PackageInstallCommandBaseProps) {
  const [manager, setManager] = useState<PackageManager>(defaultManager);
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const { copied, copy } = useClipboard(2000);

  const command = buildInstallCommand(pkg, manager);

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
      <div
        data-slot="package-install-command-body"
        className={packageInstallCommandBodyVariants()}
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
      </div>
    </div>
  );
}

PackageInstallCommandBase.displayName = "PackageInstallCommand";
