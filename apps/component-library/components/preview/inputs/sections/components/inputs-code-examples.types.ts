import {
  animationPresets,
  appearanceInputsExtended,
  sizeInputs,
} from "../../variants";

export type AppearanceInputRow = (typeof appearanceInputsExtended)[number];
export type SizeInputRow = (typeof sizeInputs)[number];
export type AnimationPreset = (typeof animationPresets)[number];
