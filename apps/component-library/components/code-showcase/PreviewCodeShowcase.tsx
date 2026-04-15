"use client";

import { useState } from "react";
import CodeHighlight from "@/components/CodeHighlight";
import { Button } from "@repo/components/ui";
import type { PreviewCodeShowcaseProps } from "./types";

export default function PreviewCodeShowcase({
  code,
  children,
}: PreviewCodeShowcaseProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-5 flex items-center gap-4">
        <Button
          appearance="outline"
          size="sm"
          type="button"
          onClick={() => setShowCode(false)}
        >
          Show output
        </Button>
        <Button
          appearance="outline"
          size="sm"
          type="button"
          onClick={() => setShowCode(true)}
        >
          Show code
        </Button>
      </div>
      <hr className="my-5" />
      {showCode ? (
        <div className="relative text-xs md:text-base">
          <CodeHighlight codeString={code} />
          <Button
            appearance="emerald"
            size="sm"
            type="button"
            className="absolute bottom-2 right-2 md:top-2"
            onClick={handleCopy}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      ) : (
        <div className="min-h-px">{children}</div>
      )}
    </div>
  );
}
