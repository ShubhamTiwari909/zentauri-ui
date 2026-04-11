"use client";
import { useState } from "react";
import CodeHighlight from "../../CodeHighlight";
import { Button } from "./button";
import { CodeShowcaseProps } from "./types";

const CodeShowcase = ({
  code,
  appearance,
  animation,
  label,
  buttonClassName,
  size
}: CodeShowcaseProps) => {
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
      <div className="flex gap-4 items-center mb-5">
        <Button
          appearance="outline"
          size="sm"
          onClick={() => setShowCode(false)}
        >
          Show output
        </Button>
        <Button
          appearance="outline"
          size="sm"
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
            className="absolute bottom-2 md:top-2 right-2"
            onClick={handleCopy}
          >
            {isCopied ? "Copied" : "Copy"}
          </Button>
        </div>
      ) : (
        <Button appearance={appearance} animation={animation} className={buttonClassName} size={size}>
          {label}
        </Button>
      )}
    </div>
  );
};

export default CodeShowcase;
