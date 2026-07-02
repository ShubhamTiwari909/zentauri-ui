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

/** Appearance select options derived from the component's design-system tokens. */
export const appearanceOptions = (slug: string): Option[] =>
  toOptions(getComponent(slug).appearances());

/** Size select options derived from the component's design-system tokens. */
export const sizeOptions = (slug: string): Option[] =>
  toOptions(getComponent(slug).sizes());

/** Options for any other variant group (e.g. "shape", "rounded", "orientation"). */
export const variantOptions = (slug: string, group: string): Option[] =>
  toOptions(
    getComponent(slug)
      .variants(group)
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
