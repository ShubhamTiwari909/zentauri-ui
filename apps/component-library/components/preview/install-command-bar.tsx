"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

const COMPONENT_PREVIEW_PREFIX = "/preview/components/";
const ANIMATED_ONLY_COMPONENTS = new Set(["spinner"]);

function getComponentSlug(pathname: string): string | undefined {
  if (!pathname.startsWith(COMPONENT_PREVIEW_PREFIX)) {
    return undefined;
  }
  const slug = pathname.slice(COMPONENT_PREVIEW_PREFIX.length).split("/")[0];
  return slug || undefined;
}

export function PreviewInstallCommandBar() {
  const pathname = usePathname();
  const slug = getComponentSlug(pathname ?? "");
  const [copied, setCopied] = useState(false);

  const command = slug
    ? `npx zentauri-ui add ${
        ANIMATED_ONLY_COMPONENTS.has(slug) ? "--animated " : ""
      }${slug}`
    : undefined;

  if (!command) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="rounded-lg border border-cyan-400/20 bg-slate-950/80 px-4 py-3 shadow-lg shadow-cyan-950/30 backdrop-blur sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase text-cyan-300">
          Add this component
        </p>
        <code className="mt-1 block overflow-x-auto whitespace-nowrap rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100">
          {command}
        </code>
      </div>
      <Button
        appearance="cyan"
        className="mt-3 w-full shrink-0 sm:mt-0 sm:w-auto"
        size="sm"
        type="button"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy command"}
      </Button>
    </section>
  );
}
