"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

type CodeBlockProps = {
  codeString: string;
  language?: string;
};

export function Code({ codeString, language = "typescript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative my-4 text-xs md:text-sm">
      <SyntaxHighlighter
        customStyle={{
          borderRadius: "0.5rem",
          padding: "2.5rem 1.5rem 1.5rem 1rem",
        }}
        language={language}
        style={nightOwl}
        wrapLongLines
      >
        {codeString}
      </SyntaxHighlighter>
      <Button
        appearance="emerald"
        size="sm"
        type="button"
        className="absolute right-2 top-2"
        onClick={handleCopy}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
