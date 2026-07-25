"use client";

import { WizardBase } from "../wizard-base";
import type { WizardAnimatedProps } from "./types";

export function Wizard(props: WizardAnimatedProps) {
  return <WizardBase {...props} />;
}
Wizard.displayName = "Wizard";
