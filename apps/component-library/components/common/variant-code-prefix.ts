/** Prepended to preview snippet strings so “Show code” states which variant row is shown. */
export function variantLeadComment(detail: string): string {
  return `// Variant: ${detail}\n\n`;
}
