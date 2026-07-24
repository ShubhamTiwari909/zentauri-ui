import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef, ReactNode } from "react";

import type { WizardStepState } from "./wizard-base";
import type {
  wizardContentVariants,
  wizardHeaderVariants,
  wizardNavigationVariants,
  wizardVariants,
} from "./variants";

type WizardVariantProps = VariantProps<typeof wizardVariants>;
type WizardHeaderVariantProps = VariantProps<typeof wizardHeaderVariants>;
type WizardNavigationVariantProps = VariantProps<
  typeof wizardNavigationVariants
>;
type WizardContentVariantProps = VariantProps<typeof wizardContentVariants>;

export type WizardProgressVariant = "bar" | "dots" | "numbers";

export type WizardStepProps = {
  id: string;
  title: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
};

export type WizardBaseProps = WizardVariantProps & {
  defaultStep?: number;
  linear?: boolean;
  persist?: boolean;
  storageKey?: string;
  onFinish?: () => void;
  onStepChange?: (step: number) => void;
  onStepComplete?: (stepId: string) => void;
  onCancel?: () => void;
  onReset?: () => void;
  className?: string;
  children?: ReactNode;
};

export type WizardProps = WizardBaseProps;

export type WizardHeaderProps = WizardHeaderVariantProps &
  ComponentPropsWithRef<"div">;

export type WizardFooterProps = ComponentPropsWithRef<"div">;

export type WizardContentProps = WizardContentVariantProps &
  ComponentPropsWithRef<"div">;

export type WizardNavigationProps = WizardNavigationVariantProps & {
  backLabel?: ReactNode;
  nextLabel?: ReactNode;
  finishLabel?: ReactNode;
  cancelLabel?: ReactNode;
  showCancel?: boolean;
  className?: string;
  children?: ReactNode;
};

export type WizardProgressProps = {
  variant?: WizardProgressVariant;
  className?: string;
};

export type WizardSidebarProps = {
  className?: string;
};

export type WizardCtx = {
  steps: WizardStepProps[];
  currentStep: number;
  stepStates: WizardStepState[];
  totalSteps: number;
  progress: number;
  isFirst: boolean;
  isLast: boolean;
  linear: boolean;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  finish: () => void;
  cancel: () => void;
  reset: () => void;
  getStepState: (index: number) => WizardStepState;
  registerStep: (props: WizardStepProps) => () => void;
};

export type UseWizardResult = {
  currentStep: number;
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  finish: () => void;
  reset: () => void;
  cancel: () => void;
  steps: WizardStepProps[];
  isFirst: boolean;
  isLast: boolean;
  progress: number;
  stepStates: WizardStepState[];
  totalSteps: number;
};

export type UseWizardStepResult = {
  step: WizardStepProps | undefined;
  index: number;
  completed: boolean;
  visited: boolean;
  optional: boolean;
  state: WizardStepState;
};

export type UseWizardProgressResult = {
  current: number;
  total: number;
  percentage: number;
};

export type StorageAdapter = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};
