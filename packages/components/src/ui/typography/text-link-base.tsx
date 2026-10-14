import { cn } from "../../lib/utils";
import { zuiTypographyLinkIndicator } from "../../design-system/typography";
import type { TextLinkProps } from "./types";
import {
  textLinkVariants,
  textSizeVariants,
  typographyStyleVariants,
} from "./variants";

export const TextLinkBase = ({
  tone,
  underline,
  size,
  externalIndicator = false,
  target,
  rel,
  align,
  weight,
  leading,
  tracking,
  wrap,
  measure,
  className,
  children,
  ...props
}: TextLinkProps) => {
  const relTokens = rel?.split(/\s+/).filter(Boolean) ?? [];
  if (
    target?.toLowerCase() === "_blank" &&
    !relTokens.some((token) => token.toLowerCase() === "noopener")
  )
    relTokens.push("noopener");
  return (
    <a
      {...props}
      data-slot="typography-text-link"
      target={target}
      rel={relTokens.length > 0 ? relTokens.join(" ") : undefined}
      className={cn(
        textLinkVariants({ tone, underline }),
        textSizeVariants({ size }),
        typographyStyleVariants({
          align,
          weight,
          leading,
          tracking,
          wrap,
          measure,
        }),
        className,
      )}
    >
      {children}
      {externalIndicator && (
        <svg
          aria-hidden="true"
          focusable="false"
          className={zuiTypographyLinkIndicator}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path d="M14 4h6v6M20 4l-9 9M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" />
        </svg>
      )}
    </a>
  );
};
TextLinkBase.displayName = "TextLink";
