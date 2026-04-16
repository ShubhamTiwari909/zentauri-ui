import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { CardDemoProps } from "./card-code-examples.types";

export function cardSnippet(opts: CardDemoProps): string {
  const { appearance, size, rounded } = opts;
  const appearanceAttr =
    appearance === "default" ? "" : ` appearance="${appearance}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const roundedAttr = rounded === "md" ? "" : ` rounded="${rounded}"`;
  return `${variantLeadComment(`appearance · ${appearance}, size · ${size}, rounded · ${rounded}`)}<Card${appearanceAttr}${sizeAttr}${roundedAttr} animation="none">
  <CardHeader>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Brief supporting description.</CardDescription>
  </CardHeader>
</Card>`;
}
