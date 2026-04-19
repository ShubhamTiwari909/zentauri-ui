import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import { ButtonAnimated } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

import type {
  ButtonAnimationPreset,
  ShowcaseButtonRow,
  SizeButtonRow,
} from "./button-code-examples.types";

export function ButtonAppearanceDemo({ appearance, label }: ShowcaseButtonRow) {
  return (
    <Button appearance={appearance} className="w-40">
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
    <ButtonAnimated appearance="glass" animation={animation} className="w-40">
      {`${label} animation`}
    </ButtonAnimated>
  );
}

export function ButtonSizeDemo({ label, size }: SizeButtonRow) {
  return (
    <Button appearance="gradient-indigo" size={size} className="w-40">
      {`${label} size`}
    </Button>
  );
}
