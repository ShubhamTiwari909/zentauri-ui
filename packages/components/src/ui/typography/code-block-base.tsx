import { forwardRef } from "react";

import { cn } from "../../lib/utils";

import type { CodeBlockProps } from "./types";
import { typographyToneVariants } from "./variants";

export const CodeBlockBase = (props: CodeBlockProps) => {
    const {
      tone,
      language,
      className,
      children,
      ref,
      ...rest
    } = props;

    const ariaLabel = language ? `Code sample (${language})` : "Code sample";

    return (
      <pre
        ref={ref}
        data-slot="typography-code-block"
        aria-label={ariaLabel}
        className={cn(
          typographyToneVariants({ tone }),
          "overflow-x-auto rounded-xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-relaxed shadow-inner shadow-slate-950/40",
          className,
        )}
        {...rest}
      >
        <code className="font-mono text-[0.95em]">{children}</code>
      </pre>
    );
};

CodeBlockBase.displayName = "CodeBlock";
