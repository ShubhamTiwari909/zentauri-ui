import { accordionCssVariables } from "./data/accordion";
import { alertCssVariables } from "./data/alert";
import { avatarCssVariables } from "./data/avatar";
import { badgeCssVariables } from "./data/badge";
import { breadcrumbCssVariables } from "./data/breadcrumb";
import { buttonsCssVariables } from "./data/buttons";
import { cardCssVariables } from "./data/card";
import { checkboxCssVariables } from "./data/checkbox";
import { dividerCssVariables } from "./data/divider";
import { drawerCssVariables } from "./data/drawer";
import { dropdownCssVariables } from "./data/dropdown";
import { dynamicStepperCssVariables } from "./data/dynamic-stepper";
import { emptyStateCssVariables } from "./data/empty-state";
import { fileUploadCssVariables } from "./data/file-upload";
import { inputsCssVariables } from "./data/inputs";
import { modalCssVariables } from "./data/modal";
import { otpInputCssVariables } from "./data/otp-input";
import { paginationCssVariables } from "./data/pagination";
import { popoverCssVariables } from "./data/popover";
import { progressCssVariables } from "./data/progress";
import { radioGroupCssVariables } from "./data/radio-group";
import { searchCssVariables } from "./data/search";
import { selectCssVariables } from "./data/select";
import { skeletonCssVariables } from "./data/skeleton";
import { sliderCssVariables } from "./data/slider";
import { spinnerCssVariables } from "./data/spinner";
import { stepperCssVariables } from "./data/stepper";
import { tableCssVariables } from "./data/table";
import { tabsCssVariables } from "./data/tabs";
import { toastCssVariables } from "./data/toast";
import { toggleCssVariables } from "./data/toggle";
import { tooltipCssVariables } from "./data/tooltip";
import { typographyCssVariables } from "./data/typography";

import type { CssVariableReference } from "./css-variable-reference-types";

export const cssVariableReferences = {
  accordion: accordionCssVariables,
  alert: alertCssVariables,
  avatar: avatarCssVariables,
  badge: badgeCssVariables,
  breadcrumb: breadcrumbCssVariables,
  buttons: buttonsCssVariables,
  card: cardCssVariables,
  checkbox: checkboxCssVariables,
  divider: dividerCssVariables,
  drawer: drawerCssVariables,
  dropdown: dropdownCssVariables,
  "dynamic-stepper": dynamicStepperCssVariables,
  "empty-state": emptyStateCssVariables,
  "file-upload": fileUploadCssVariables,
  inputs: inputsCssVariables,
  modal: modalCssVariables,
  "otp-input": otpInputCssVariables,
  pagination: paginationCssVariables,
  popover: popoverCssVariables,
  progress: progressCssVariables,
  "radio-group": radioGroupCssVariables,
  search: searchCssVariables,
  select: selectCssVariables,
  skeleton: skeletonCssVariables,
  slider: sliderCssVariables,
  spinner: spinnerCssVariables,
  stepper: stepperCssVariables,
  table: tableCssVariables,
  tabs: tabsCssVariables,
  toast: toastCssVariables,
  toggle: toggleCssVariables,
  tooltip: tooltipCssVariables,
  typography: typographyCssVariables,
} as const satisfies Record<string, CssVariableReference>;

export type CssVariableReferenceSlug = keyof typeof cssVariableReferences;
