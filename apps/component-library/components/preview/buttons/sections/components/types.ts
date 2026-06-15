import type { ButtonSharedStatic } from "@zentauri-ui/zentauri-components/ui/buttons";
import type { ButtonAnimation } from "@zentauri-ui/zentauri-components/ui/buttons/animated";

import {
  buttonAnimationPresets,
  sizeButtons,
  showcaseButtons,
} from "../../variants";

export type ShowcaseButtonRow = (typeof showcaseButtons)[number];
export type SizeButtonRow = (typeof sizeButtons)[number];
export type ButtonAnimationPreset = (typeof buttonAnimationPresets)[number];

export type ButtonAppearance = NonNullable<ButtonSharedStatic["appearance"]>;
export type ButtonSize = NonNullable<ButtonSharedStatic["size"]>;
export type { ButtonAnimation };
