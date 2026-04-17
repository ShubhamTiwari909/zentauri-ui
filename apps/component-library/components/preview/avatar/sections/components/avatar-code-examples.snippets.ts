import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type { AvatarDemoAnimation, AvatarDemoAppearance, AvatarDemoSize } from "./avatar-code-examples.types";

export function avatarSnippetForSize(size: AvatarDemoSize): string {
  return `${variantLeadComment(`size · ${size}, animation · none`)}<Avatar size="${size}" animation="none">
  <AvatarFallback>ZU</AvatarFallback>
</Avatar>`;
}

export function avatarSnippetForAnimation(
  animation: AvatarDemoAnimation,
): string {
  return `${variantLeadComment(`size · md, animation · ${animation}`)}<Avatar size="md" animation="${animation}">
  <AvatarFallback>ZU</AvatarFallback>
</Avatar>`;
}

export function avatarSnippetForAppearance(
  appearance: AvatarDemoAppearance,
): string {
  return `${variantLeadComment(`appearance · ${appearance}`)}<Avatar appearance="${appearance}">
  <AvatarFallback>ZU</AvatarFallback>
</Avatar>`;
}