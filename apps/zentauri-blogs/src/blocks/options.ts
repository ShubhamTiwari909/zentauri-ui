import { DesignSystem } from "@zentauri-ui/zentauri-components/design-system/facade";
import type { Option } from "payload";

const toOptions = (values: string[]): Option[] =>
  values.map((value) => ({ label: value, value }));

const getComponent = (slug: string) => {
  const component = DesignSystem.getComponent(slug);
  if (!component) {
    throw new Error(`Unknown design-system component slug: ${slug}`);
  }
  return component;
};

/**
 * Appearance select options derived from the component's design-system
 * tokens. Pass `slot` for components whose appearance tokens live on a
 * sub-slot rather than the root (e.g. Drawer/Modal's "trigger"/"content",
 * Kbd's "key", Timeline's "indicator").
 */
export const appearanceOptions = (slug: string, slot?: string): Option[] =>
  toOptions(getComponent(slug).appearances(slot));

/** Size select options derived from the component's design-system tokens. */
export const sizeOptions = (slug: string, slot?: string): Option[] =>
  toOptions(getComponent(slug).sizes(slot));

/** Options for any other variant group (e.g. "shape", "rounded", "orientation"). */
export const variantOptions = (
  slug: string,
  group: string,
  slot?: string,
): Option[] =>
  toOptions(
    getComponent(slug)
      .variants(group, slot ? { slot } : undefined)
      .map((variant) => variant.key),
  );

export const pxOptions = (values: number[]): Option[] =>
  values.map((value) => ({ label: `${value}px`, value: String(value) }));

export const SPACER_SIZES = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 64, 80, 90, 100, 120, 140, 160, 180,
  200,
];

export const GAP_SIZES = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 64, 80, 90, 100,
];
