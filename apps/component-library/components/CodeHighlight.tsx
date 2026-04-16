"use client";
import { Button } from "@zentauri-ui/zentauri-components/ui";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeHighlightProps = {
  codeString: string;
  language?: string;
};

const CodeHighlight = ({
  codeString,
  language = "typescript",
}: CodeHighlightProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  return (
    <div className="relative text-xs md:text-sm">
      <SyntaxHighlighter
        customStyle={{ padding: "1.5rem 1.25rem 1.5rem 1rem" }}
        language={language}
        style={nightOwl}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
      <Button
        appearance="emerald"
        size="sm"
        type="button"
        className="absolute bottom-2 right-2 md:top-2"
        onClick={handleCopy}
      >
        {copySuccess ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

export default CodeHighlight;
