import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";

import type {
  ButtonAnimationPreset,
  ShowcaseButtonRow,
  SizeButtonRow,
} from "./button-code-examples.types";

export function ButtonAppearanceDemo({ appearance, label }: ShowcaseButtonRow) {
  return (
    <Button appearance={appearance} animation="none" className="w-40">
      {label}
    </Button>
  );
}

export function ButtonAnimationDemo({
  preset,
}: {
  preset: ButtonAnimationPreset;
}) {
  const [label, animation] = preset;
  return (
    <Button appearance="glass" animation={animation} className="w-40">
      {`${label} animation`}
    </Button>
  );
}

export function ButtonSizeDemo({ label, size }: SizeButtonRow) {
  return (
    <Button
      appearance="gradient-indigo"
      animation="none"
      size={size}
      className="w-40"
    >
      {`${label} size`}
    </Button>
  );
}
