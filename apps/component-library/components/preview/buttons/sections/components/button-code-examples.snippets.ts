import { variantLeadComment } from "@/components/common/variant-code-prefix";

import type {
  ButtonAnimationPreset,
  ShowcaseButtonRow,
  SizeButtonRow,
} from "./button-code-examples.types";

export function buttonAppearanceSnippet(button: ShowcaseButtonRow): string {
  return `${variantLeadComment(`appearance · ${button.appearance}`)}<Button appearance="${button.appearance}" className="w-full">${button.label}</Button>`;
}

export function buttonAnimationSnippet(preset: ButtonAnimationPreset): string {
  const [label, animation] = preset;
  return `${variantLeadComment(`animation · ${animation}`)}<ButtonAnimated appearance="glass" animation="${animation}" className="w-full">${label} animation</ButtonAnimated>`;
}

export function buttonSizeSnippet(button: SizeButtonRow): string {
  return `${variantLeadComment(`size · ${button.size}`)}<Button appearance="gradient-indigo" size="${button.size}" className="w-full ${button.size === "icon" ? "w-20" : ""}">${button.label} size</Button>`;
}
