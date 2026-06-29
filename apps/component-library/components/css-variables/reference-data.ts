import { accordionCssVariables } from "./data/accordion";
import { alertCssVariables } from "./data/alert";
import { animatedNumberCssVariables } from "./data/animated-number";
import { avatarCssVariables } from "./data/avatar";
import { badgeCssVariables } from "./data/badge";
import { breadcrumbCssVariables } from "./data/breadcrumb";
import { buttonsCssVariables } from "./data/buttons";
import { cardCssVariables } from "./data/card";
import { checkboxCssVariables } from "./data/checkbox";
import { codeDiffCssVariables } from "./data/code-diff";
import { comboboxCssVariables } from "./data/combobox";
import { commandCssVariables } from "./data/command";
import { contextMenuCssVariables } from "./data/context-menu";
import { copyButtonCssVariables } from "./data/copy-button";
import { dividerCssVariables } from "./data/divider";
import { drawerCssVariables } from "./data/drawer";
import { dropdownCssVariables } from "./data/dropdown";
import { dynamicStepperCssVariables } from "./data/dynamic-stepper";
import { emptyStateCssVariables } from "./data/empty-state";
import { fileUploadCssVariables } from "./data/file-upload";
import { hashGeneratorCssVariables } from "./data/hash-generator";
import { inputsCssVariables } from "./data/inputs";
import { kbdCssVariables } from "./data/kbd";
import { marqueeCssVariables } from "./data/marquee";
import { modalCssVariables } from "./data/modal";
import { networkStatusCssVariables } from "./data/network-status";
import { otpInputCssVariables } from "./data/otp-input";
import { paginationCssVariables } from "./data/pagination";
import { passwordStrengthMeterCssVariables } from "./data/password-strength-meter";
import { popoverCssVariables } from "./data/popover";
import { progressCssVariables } from "./data/progress";
import { qrCodeCssVariables } from "./data/qr-code";
import { qrScannerCssVariables } from "./data/qr-scanner";
import { radioGroupCssVariables } from "./data/radio-group";
import { ratingCssVariables } from "./data/rating";
import { scrollAreaCssVariables } from "./data/scroll-area";
import { secretRevealCssVariables } from "./data/secret-reveal";
import { searchCssVariables } from "./data/search";
import { selectCssVariables } from "./data/select";
import { skeletonCssVariables } from "./data/skeleton";
import { sliderCssVariables } from "./data/slider";
import { speechRecognitionCssVariables } from "./data/speech-recognition";
import { speechSynthesizerCssVariables } from "./data/speech-synthesizer";
import { spinnerCssVariables } from "./data/spinner";
import { tableCssVariables } from "./data/table";
import { tabsCssVariables } from "./data/tabs";
import { timelineCssVariables } from "./data/timeline";
import { toastCssVariables } from "./data/toast";
import { toggleCssVariables } from "./data/toggle";
import { tooltipCssVariables } from "./data/tooltip";
import { treeViewCssVariables } from "./data/tree-view";
import { typingIndicatorCssVariables } from "./data/typing-indicator";
import { typographyCssVariables } from "./data/typography";

import type { CssVariableReference } from "./reference-types";

export const cssVariableReferences = {
  accordion: accordionCssVariables,
  alert: alertCssVariables,
  "animated-number": animatedNumberCssVariables,
  avatar: avatarCssVariables,
  badge: badgeCssVariables,
  breadcrumb: breadcrumbCssVariables,
  buttons: buttonsCssVariables,
  card: cardCssVariables,
  checkbox: checkboxCssVariables,
  "code-diff": codeDiffCssVariables,
  combobox: comboboxCssVariables,
  command: commandCssVariables,
  "context-menu": contextMenuCssVariables,
  "copy-button": copyButtonCssVariables,
  divider: dividerCssVariables,
  drawer: drawerCssVariables,
  dropdown: dropdownCssVariables,
  "dynamic-stepper": dynamicStepperCssVariables,
  "empty-state": emptyStateCssVariables,
  "file-upload": fileUploadCssVariables,
  "hash-generator": hashGeneratorCssVariables,
  inputs: inputsCssVariables,
  kbd: kbdCssVariables,
  marquee: marqueeCssVariables,
  modal: modalCssVariables,
  "network-status": networkStatusCssVariables,
  "otp-input": otpInputCssVariables,
  pagination: paginationCssVariables,
  "password-strength-meter": passwordStrengthMeterCssVariables,
  popover: popoverCssVariables,
  progress: progressCssVariables,
  "qr-code": qrCodeCssVariables,
  "qr-scanner": qrScannerCssVariables,
  "radio-group": radioGroupCssVariables,
  rating: ratingCssVariables,
  "scroll-area": scrollAreaCssVariables,
  "secret-reveal": secretRevealCssVariables,
  search: searchCssVariables,
  select: selectCssVariables,
  skeleton: skeletonCssVariables,
  slider: sliderCssVariables,
  "speech-recognition": speechRecognitionCssVariables,
  "speech-synthesizer": speechSynthesizerCssVariables,
  spinner: spinnerCssVariables,
  table: tableCssVariables,
  tabs: tabsCssVariables,
  timeline: timelineCssVariables,
  toast: toastCssVariables,
  toggle: toggleCssVariables,
  tooltip: tooltipCssVariables,
  "tree-view": treeViewCssVariables,
  "typing-indicator": typingIndicatorCssVariables,
  typography: typographyCssVariables,
} as const satisfies Record<string, CssVariableReference>;

export type CssVariableReferenceSlug = keyof typeof cssVariableReferences;
