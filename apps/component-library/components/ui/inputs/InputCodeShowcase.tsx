"use client";

import { useState } from "react";

import { Button } from "@/components/ui/buttons/button";
import CodeHighlight from "@/components/CodeHighlight";

import { Input } from "./input";
import type { InputCodeShowcaseProps } from "./types";

type ShowcaseAs = NonNullable<InputCodeShowcaseProps["as"]>;
type ShowcaseExtraCtx = Pick<InputCodeShowcaseProps, "rows" | "type">;

const SHOWCASE_AS_TO_INPUT_PROPS: Record<
  ShowcaseAs,
  (ctx: ShowcaseExtraCtx) => Record<string, unknown>
> = {
  input: ({ type }) => ({ type, as: "input" as const }),
  textarea: ({ rows }) => ({ as: "textarea" as const, rows }),
  file: ({ type }) => ({ as: "file" as const, type: type ?? "file" }),
  checkbox: ({ type }) => ({ as: "checkbox" as const, type: type ?? "checkbox" }),
  radio: ({ type }) => ({ as: "radio" as const, type: type ?? "radio" }),
};

function resolveShowcaseInputSpread(
  as: InputCodeShowcaseProps["as"],
  ctx: ShowcaseExtraCtx,
) {
  if (as == null) {
    return { type: ctx.type };
  }
  return SHOWCASE_AS_TO_INPUT_PROPS[as](ctx);
}

const InputCodeShowcase = ({
  code,
  errorMessage,
  label,
  placeholder,
  appearance,
  size,
  as,
  rows,
  animation = "none",
  inputClassName,
  disabled,
  readOnly,
  type,
  defaultValue,
  preview,
  ring = true,
}: InputCodeShowcaseProps) => {
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
        <Button appearance="outline" size="sm" type="button" onClick={() => setShowCode(false)}>
          Show output
        </Button>
        <Button appearance="outline" size="sm" type="button" onClick={() => setShowCode(true)}>
          Show code
        </Button>
      </div>
      <hr className="my-5 border-white/10" />
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
      ) : preview ? (
        <div className="max-w-xl">{preview}</div>
      ) : (
        <Input
          appearance={appearance}
          size={size}
          animation={animation}
          ring={ring}
          className={inputClassName}
          disabled={disabled}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder ?? label}
          aria-label={label}
          errorMessage={errorMessage}
          {...resolveShowcaseInputSpread(as, { rows, type })}
        />
      )}
    </div>
  );
};

export default InputCodeShowcase;
