"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

import {
  zuiWizardFooterBase,
  zuiWizardProgressBarBase,
  zuiWizardProgressBase,
  zuiWizardProgressDotsBase,
  zuiWizardProgressDotBase,
  zuiWizardProgressDotActiveBase,
  zuiWizardProgressDotCompletedBase,
  zuiWizardProgressFillBase,
  zuiWizardSidebarBase,
  zuiWizardSidebarStepActiveBase,
  zuiWizardSidebarStepBase,
  zuiWizardSidebarStepCompletedBase,
  zuiWizardStepIndicatorBase,
  zuiWizardStepIndicatorStates,
} from "../../design-system/wizard";

import type {
  WizardBaseProps,
  WizardContentProps,
  WizardCtx,
  WizardFooterProps,
  WizardHeaderProps,
  WizardNavigationProps,
  WizardProgressProps,
  WizardSidebarProps,
  WizardStepProps,
} from "./types";
import {
  wizardContentVariants,
  wizardHeaderVariants,
  wizardNavigationVariants,
  wizardVariants,
} from "./variants";

export type WizardStepState = "upcoming" | "current" | "completed";

const WizardContext = createContext<WizardCtx | null>(null);
const WizardStepIdContext = createContext<string | null>(null);

function useWizardContext(component: string): WizardCtx {
  const ctx = useContext(WizardContext);
  if (!ctx) {
    throw new Error(`${component} must be used within <Wizard>`);
  }
  return ctx;
}

function isValidStoredState(
  data: unknown,
  maxStep: number,
): data is { currentStep: number; completedSteps: string[] } {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  if (
    typeof d.currentStep !== "number" ||
    !Number.isInteger(d.currentStep) ||
    d.currentStep < 0 ||
    d.currentStep > maxStep
  )
    return false;
  if (
    !Array.isArray(d.completedSteps) ||
    !d.completedSteps.every((s) => typeof s === "string")
  )
    return false;
  return true;
}

function readStorage(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, data: Record<string, unknown>): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* noop */
  }
}

function clearStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

export function WizardBase({
  defaultStep = 0,
  linear = true,
  persist = false,
  storageKey,
  onFinish,
  onStepChange,
  onStepComplete,
  onCancel,
  onReset,
  appearance = "default",
  size = "md",
  className,
  children,
}: WizardBaseProps) {
  const stepsRef = useRef<WizardStepProps[]>([]);
  const [registrationVersion, setRegistrationVersion] = useState(0);
  const [currentStep, setCurrentStep] = useState(() => {
    if (persist && storageKey) {
      const saved = readStorage(`zui-wizard-${storageKey}`);
      if (saved && isValidStoredState(saved, Infinity)) {
        return saved.currentStep as number;
      }
    }
    return defaultStep;
  });
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    if (persist && storageKey) {
      const saved = readStorage(`zui-wizard-${storageKey}`);
      if (saved && isValidStoredState(saved, Infinity)) {
        return new Set(saved.completedSteps as string[]);
      }
    }
    return new Set<string>();
  });

  const registerStep = useCallback((props: WizardStepProps): (() => void) => {
    const idx = stepsRef.current.findIndex((s) => s.id === props.id);
    if (idx >= 0) {
      stepsRef.current[idx] = props;
    } else {
      stepsRef.current = [...stepsRef.current, props];
    }
    setRegistrationVersion((v) => v + 1);
    return () => {
      stepsRef.current = stepsRef.current.filter((s) => s.id !== props.id);
      setRegistrationVersion((v) => v + 1);
    };
  }, []);

  const steps = useMemo(() => stepsRef.current, [registrationVersion]);
  const visibleSteps = useMemo(() => steps.filter((s) => !s.hidden), [steps]);

  const totalSteps = visibleSteps.length;

  const clampedIndex = useMemo(
    () => Math.max(0, Math.min(currentStep, Math.max(0, totalSteps - 1))),
    [currentStep, totalSteps],
  );

  const effectiveIndex = totalSteps === 0 ? 0 : clampedIndex;

  const isFirst = effectiveIndex === 0;
  const isLast = effectiveIndex >= totalSteps - 1;

  const visibleIndexToStepId = useMemo(() => {
    const map = new Map<number, string>();
    let idx = 0;
    for (const step of steps) {
      if (!step.hidden) {
        map.set(idx, step.id);
        idx++;
      }
    }
    return map;
  }, [steps]);

  const getStepState = useCallback(
    (index: number): WizardStepState => {
      const stepId = visibleIndexToStepId.get(index);
      if (!stepId) return "upcoming";
      if (completedSteps.has(stepId)) return "completed";
      if (index === effectiveIndex) return "current";
      return "upcoming";
    },
    [visibleIndexToStepId, completedSteps, effectiveIndex],
  );

  const stepStates = useMemo(
    () => visibleSteps.map((_, i) => getStepState(i)) as WizardStepState[],
    [visibleSteps, getStepState],
  );

  const progress = useMemo(
    () =>
      totalSteps > 0
        ? (stepStates.filter((s) => s === "completed").length / totalSteps) *
          100
        : 0,
    [stepStates, totalSteps],
  );

  const goTo = useCallback(
    (index: number) => {
      const target = visibleSteps[index];
      if (!target) return;
      if (target.disabled) return;
      if (linear) {
        const currentStepId = visibleIndexToStepId.get(effectiveIndex);
        const allPrevCompleted = visibleSteps
          .slice(0, index)
          .every(
            (s) =>
              s.id === currentStepId || completedSteps.has(s.id) || s.optional,
          );
        if (!allPrevCompleted) return;
      }
      const clamped = Math.max(0, Math.min(index, totalSteps - 1));
      setCurrentStep(clamped);
      onStepChange?.(clamped);
    },
    [
      totalSteps,
      visibleSteps,
      visibleIndexToStepId,
      effectiveIndex,
      completedSteps,
      linear,
      onStepChange,
    ],
  );

  const next = useCallback(() => {
    const currentStepId = visibleIndexToStepId.get(effectiveIndex);
    if (currentStepId && !completedSteps.has(currentStepId)) {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.add(currentStepId);
        return next;
      });
      onStepComplete?.(currentStepId);
    }
    const nextIndex = effectiveIndex + 1;
    if (nextIndex < totalSteps) {
      goTo(nextIndex);
    } else {
      onFinish?.();
    }
  }, [
    effectiveIndex,
    totalSteps,
    visibleIndexToStepId,
    completedSteps,
    goTo,
    onStepComplete,
    onFinish,
  ]);

  const previous = useCallback(() => {
    if (!isFirst) {
      goTo(effectiveIndex - 1);
    }
  }, [effectiveIndex, isFirst, goTo]);

  const finish = useCallback(() => {
    const currentStepId = visibleIndexToStepId.get(effectiveIndex);
    if (currentStepId && !completedSteps.has(currentStepId)) {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.add(currentStepId);
        return next;
      });
      onStepComplete?.(currentStepId);
    }
    onFinish?.();
  }, [
    effectiveIndex,
    visibleIndexToStepId,
    completedSteps,
    onStepComplete,
    onFinish,
  ]);

  const cancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const reset = useCallback(() => {
    setCurrentStep(defaultStep);
    setCompletedSteps(new Set());
    if (persist && storageKey) {
      clearStorage(`zui-wizard-${storageKey}`);
    }
    onReset?.();
  }, [defaultStep, persist, storageKey, onReset]);

  useEffect(() => {
    if (persist && storageKey) {
      writeStorage(`zui-wizard-${storageKey}`, {
        currentStep: effectiveIndex,
        completedSteps: [...completedSteps],
      });
    }
  }, [persist, storageKey, effectiveIndex, completedSteps]);

  const ctx = useMemo<WizardCtx>(
    () => ({
      steps,
      currentStep: effectiveIndex,
      stepStates,
      totalSteps,
      progress,
      isFirst,
      isLast,
      linear,
      goTo,
      next,
      previous,
      finish,
      cancel,
      reset,
      getStepState,
      registerStep,
    }),
    [
      steps,
      effectiveIndex,
      stepStates,
      totalSteps,
      progress,
      isFirst,
      isLast,
      linear,
      goTo,
      next,
      previous,
      finish,
      cancel,
      reset,
      getStepState,
    ],
  );

  return (
    <WizardContext.Provider value={ctx}>
      <div
        data-slot="wizard"
        className={cn(wizardVariants({ appearance, size }), className)}
      >
        {children}
      </div>
    </WizardContext.Provider>
  );
}

WizardBase.displayName = "Wizard";

export function WizardStep({
  id,
  title,
  description,
  optional,
  disabled,
  hidden,
  icon,
  children,
}: WizardStepProps) {
  const ctx = useWizardContext("WizardStep");

  useLayoutEffect(() => {
    return ctx.registerStep({
      id,
      title,
      description,
      optional,
      disabled,
      hidden,
      icon,
      children,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, title, description, optional, disabled, hidden, icon]);

  if (hidden) return null;

  const visibleIndex = getVisibleIndexForStepId(ctx.steps, id);
  const isActive = visibleIndex === ctx.currentStep;

  return (
    <WizardStepIdContext.Provider value={id}>
      {isActive && (
        <div data-slot="wizard-step" data-step-id={id}>
          {children}
        </div>
      )}
    </WizardStepIdContext.Provider>
  );
}

WizardStep.displayName = "WizardStep";

function getVisibleIndexForStepId(
  steps: WizardStepProps[],
  id: string,
): number {
  let idx = 0;
  for (const step of steps) {
    if (step.hidden) continue;
    if (step.id === id) return idx;
    idx++;
  }
  return -1;
}

export function WizardHeader({
  size = "md",
  className,
  children,
  ref,
  ...rest
}: WizardHeaderProps) {
  const { currentStep, totalSteps } = useWizardContext("WizardHeader");

  return (
    <div
      ref={ref}
      data-slot="wizard-header"
      className={cn(wizardHeaderVariants({ size }), "font-semibold", className)}
      {...rest}
    >
      {children ?? (
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
      )}
    </div>
  );
}

WizardHeader.displayName = "WizardHeader";

export function WizardContent({
  className,
  children,
  ref,
  ...rest
}: WizardContentProps) {
  return (
    <div
      ref={ref}
      data-slot="wizard-content"
      className={cn(wizardContentVariants(), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

WizardContent.displayName = "WizardContent";

export function WizardNavigation({
  size = "md",
  backLabel = "Back",
  nextLabel = "Next",
  finishLabel = "Finish",
  cancelLabel = "Cancel",
  showCancel = false,
  className,
  children,
}: WizardNavigationProps) {
  const {
    isFirst,
    isLast,
    previous,
    next,
    finish,
    cancel,
    linear,
    getStepState,
    currentStep,
  } = useWizardContext("WizardNavigation");

  const state = getStepState(currentStep);
  const canGoNext = !linear || state === "completed" || state === "current";

  return (
    <div
      data-slot="wizard-navigation"
      className={cn(wizardNavigationVariants({ size }), className)}
    >
      {children ?? (
        <>
          <div className="flex gap-2">
            {showCancel && (
              <button
                type="button"
                data-slot="wizard-cancel-btn"
                data-testid="wizard-cancel-btn"
                onClick={cancel}
                className="rounded-md px-4 py-2 text-sm font-medium text-[color:var(--zui-wizard-nav-cancel-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-nav-cancel-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))] transition-colors hover:bg-[var(--zui-wizard-nav-cancel-bg-hover,var(--zui-surface-hover,#0000000d))] dark:hover:bg-[var(--zui-wizard-nav-cancel-bg-hover-dark,var(--zui-surface-hover-dark,#ffffff0d))]"
              >
                {cancelLabel}
              </button>
            )}
            <button
              type="button"
              data-slot="wizard-back-btn"
              data-testid="wizard-back-btn"
              disabled={isFirst}
              onClick={previous}
              className="rounded-md border border-[color:var(--zui-wizard-nav-border,var(--zui-border,#0000001a))] dark:border-[color:var(--zui-wizard-nav-border-dark,var(--zui-border-dark,#ffffff1a))] px-4 py-2 text-sm font-medium text-[color:var(--zui-wizard-nav-fg,var(--zui-fg,oklch(37.2%_0.044_257.287)))] dark:text-[color:var(--zui-wizard-nav-fg-dark,var(--zui-fg-dark,oklch(92.9%_0.013_255.508)))] transition-colors hover:bg-[var(--zui-wizard-nav-bg-hover,var(--zui-surface-hover,#0000000d))] dark:hover:bg-[var(--zui-wizard-nav-bg-hover-dark,var(--zui-surface-hover-dark,#ffffff0d))] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {backLabel}
            </button>
          </div>
          <button
            type="button"
            data-slot="wizard-next-btn"
            data-testid="wizard-next-btn"
            disabled={!canGoNext}
            onClick={isLast ? finish : next}
            className="rounded-md bg-[var(--zui-wizard-nav-next-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-nav-next-bg-dark,var(--zui-color-blue-dark,#3b82f6))] px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? finishLabel : nextLabel}
          </button>
        </>
      )}
    </div>
  );
}

WizardNavigation.displayName = "WizardNavigation";

export function WizardProgress({
  variant = "bar",
  className,
}: WizardProgressProps) {
  const { stepStates } = useWizardContext("WizardProgress");

  if (variant === "bar") {
    const completed = stepStates.filter((s) => s === "completed").length;
    const percentage =
      stepStates.length > 0 ? (completed / stepStates.length) * 100 : 0;
    return (
      <div
        data-slot="wizard-progress"
        className={cn(zuiWizardProgressBase, className)}
      >
        <div className={zuiWizardProgressBarBase}>
          <div
            className={zuiWizardProgressFillBase}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        data-slot="wizard-progress"
        className={cn(zuiWizardProgressDotsBase, className)}
      >
        {stepStates.map((state, index) => (
          <div
            key={index}
            className={cn(
              zuiWizardProgressDotBase,
              state === "completed" && zuiWizardProgressDotCompletedBase,
              state === "current" && zuiWizardProgressDotActiveBase,
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "numbers") {
    return (
      <div
        data-slot="wizard-progress"
        className={cn("flex items-center gap-2", className)}
      >
        {stepStates.map((state, index) => (
          <div
            key={index}
            className={cn(
              "grid size-7 place-items-center rounded-full border text-xs font-semibold transition-colors",
              state === "completed" &&
                "border-[color:var(--zui-wizard-progress-num-completed-border,var(--zui-color-emerald,#059669))] dark:border-[color:var(--zui-wizard-progress-num-completed-border-dark,var(--zui-color-emerald-dark,#34d399))] bg-[var(--zui-wizard-progress-num-completed-bg,var(--zui-color-emerald,#059669))] dark:bg-[var(--zui-wizard-progress-num-completed-bg-dark,var(--zui-color-emerald-dark,#34d399))] text-white",
              state === "current" &&
                "border-[color:var(--zui-wizard-progress-num-current-border,var(--zui-color-blue,#2563eb))] dark:border-[color:var(--zui-wizard-progress-num-current-border-dark,var(--zui-color-blue-dark,#3b82f6))] bg-[var(--zui-wizard-progress-num-current-bg,var(--zui-color-blue,#2563eb))] dark:bg-[var(--zui-wizard-progress-num-current-bg-dark,var(--zui-color-blue-dark,#3b82f6))] text-white",
              state === "upcoming" &&
                "border-[color:var(--zui-wizard-progress-num-upcoming-border,var(--zui-border,#00000026))] dark:border-[color:var(--zui-wizard-progress-num-upcoming-border-dark,var(--zui-border-dark,#ffffff26))] bg-transparent text-[color:var(--zui-wizard-progress-num-upcoming-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-progress-num-upcoming-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))]",
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

WizardProgress.displayName = "WizardProgress";

export function WizardFooter({
  className,
  children,
  ref,
  ...rest
}: WizardFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="wizard-footer"
      className={cn(zuiWizardFooterBase, className)}
      {...rest}
    >
      {children}
    </div>
  );
}

WizardFooter.displayName = "WizardFooter";

export function WizardSidebar({ className }: WizardSidebarProps) {
  const { steps, currentStep, getStepState, goTo, linear } =
    useWizardContext("WizardSidebar");

  const visibleSteps = steps.filter((s) => !s.hidden);

  return (
    <div
      data-slot="wizard-sidebar"
      className={cn(zuiWizardSidebarBase, className)}
    >
      {visibleSteps.map((step, index) => {
        const state = getStepState(index);
        const isCurrent = index === currentStep;
        const canNavigate = !linear || state === "completed";

        return (
          <button
            key={step.id}
            type="button"
            data-slot="wizard-sidebar-step"
            data-state={state}
            disabled={!canNavigate && !isCurrent}
            onClick={() => goTo(index)}
            className={cn(
              zuiWizardSidebarStepBase,
              isCurrent && zuiWizardSidebarStepActiveBase,
              state === "completed" && zuiWizardSidebarStepCompletedBase,
              !canNavigate && !isCurrent && "cursor-not-allowed opacity-50",
            )}
          >
            <div
              className={cn(
                zuiWizardStepIndicatorBase,
                state === "completed" && zuiWizardStepIndicatorStates.completed,
                state === "current" && zuiWizardStepIndicatorStates.current,
                state === "upcoming" && zuiWizardStepIndicatorStates.upcoming,
              )}
            >
              {step.icon ?? index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{step.title}</div>
              {step.description && (
                <div className="mt-0.5 text-xs text-[color:var(--zui-wizard-sidebar-step-desc-fg,var(--zui-fg-muted,oklch(55.4%_0.046_257.417)))] dark:text-[color:var(--zui-wizard-sidebar-step-desc-fg-dark,var(--zui-fg-muted-dark,oklch(70.4%_0.04_256.788)))]">
                  {step.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

WizardSidebar.displayName = "WizardSidebar";

export function useWizard(): WizardCtx {
  return useWizardContext("useWizard");
}

export function useWizardStep(): {
  step: WizardStepProps | undefined;
  index: number;
  completed: boolean;
  visited: boolean;
  optional: boolean;
  state: WizardStepState;
} {
  const ctx = useWizardContext("useWizardStep");
  const stepId = useContext(WizardStepIdContext);
  const index = getVisibleIndexForStepId(ctx.steps, stepId ?? "");
  const step = ctx.steps.find((s) => s.id === stepId);
  const computedState = index >= 0 ? ctx.getStepState(index) : "upcoming";

  return {
    step,
    index,
    completed: computedState === "completed",
    visited: index >= 0 && index <= ctx.currentStep,
    optional: step?.optional ?? false,
    state: computedState,
  };
}

export function useWizardProgress(): {
  current: number;
  total: number;
  percentage: number;
} {
  const { currentStep, totalSteps, progress } =
    useWizardContext("useWizardProgress");
  return {
    current: currentStep + 1,
    total: totalSteps,
    percentage: progress,
  };
}
