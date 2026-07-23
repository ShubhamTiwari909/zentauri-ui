"use client";

import {
  WizardBase,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardNavigation,
  WizardProgress,
  WizardSidebar,
  WizardStep,
} from "./wizard-base";
import type { WizardProps } from "./types";

export function Wizard(props: WizardProps) {
  return <WizardBase {...props} />;
}
Wizard.displayName = "Wizard";

export {
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardNavigation,
  WizardProgress,
  WizardSidebar,
  WizardStep,
};
