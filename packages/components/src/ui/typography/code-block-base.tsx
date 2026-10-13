import {
  zuiTypographyCodeBlockBase,
  zuiTypographyCodeContent,
} from "../../design-system/typography";
import { cn } from "../../lib/utils";

import type { CodeBlockProps } from "./types";
import { typographyToneVariants } from "./variants";

export const CodeBlockBase = (props: CodeBlockProps) => {
  const { tone, language, className, children, ref, ...rest } = props;

  const ariaLabel = language ? `Code sample (${language})` : "Code sample";

  return (
    <pre
      ref={ref}
      data-slot="typography-code-block"
      aria-label={ariaLabel}
      className={cn(
        typographyToneVariants({ tone }),
        zuiTypographyCodeBlockBase,
        className,
      )}
      {...rest}
    >
      <code className={zuiTypographyCodeContent}>{children}</code>
    </pre>
  );
};

CodeBlockBase.displayName = "CodeBlock";
