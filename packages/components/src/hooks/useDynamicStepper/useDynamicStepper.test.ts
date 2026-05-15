import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDynamicStepper } from "./useDynamicStepper";

describe("useDynamicStepper", () => {
  it("should use internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useDynamicStepper({ stepCount: 3, defaultActiveStep: 1 }),
    );
    expect(result.current.activeStep).toBe(1);
    expect(result.current.canGoPrevious).toBe(true);
    expect(result.current.canGoNext).toBe(true);
    act(() => {
      result.current.goNext();
    });
    expect(result.current.activeStep).toBe(2);
    act(() => {
      result.current.goPrevious();
    });
    expect(result.current.activeStep).toBe(1);
  });

  it("should clamp defaultActiveStep when uncontrolled", () => {
    const { result } = renderHook(() =>
      useDynamicStepper({ stepCount: 2, defaultActiveStep: 99 }),
    );
    expect(result.current.activeStep).toBe(1);
  });

  it("should not navigate past bounds", () => {
    const { result } = renderHook(() =>
      useDynamicStepper({ stepCount: 2, defaultActiveStep: 0 }),
    );
    expect(result.current.canGoPrevious).toBe(false);
    act(() => {
      result.current.goPrevious();
    });
    expect(result.current.activeStep).toBe(0);
    act(() => {
      result.current.goNext();
    });
    act(() => {
      result.current.goNext();
    });
    expect(result.current.activeStep).toBe(1);
    expect(result.current.canGoNext).toBe(false);
  });

  it("should respect controlled activeStep", () => {
    const { result, rerender } = renderHook(
      ({ step }: { step: number }) =>
        useDynamicStepper({ stepCount: 3, activeStep: step }),
      { initialProps: { step: 0 } },
    );
    expect(result.current.activeStep).toBe(0);
    rerender({ step: 2 });
    expect(result.current.activeStep).toBe(2);
  });

  it("should call onActiveStepChange when navigating uncontrolled", () => {
    const onActiveStepChange = vi.fn();
    const onNext = vi.fn();
    const { result } = renderHook(() =>
      useDynamicStepper({
        stepCount: 3,
        defaultActiveStep: 0,
        onActiveStepChange,
        onNext,
      }),
    );
    act(() => {
      result.current.goNext();
    });
    expect(onActiveStepChange).toHaveBeenCalledWith(1);
    expect(onNext).toHaveBeenCalledWith(1);
  });

  it("should call onPrevious when going back", () => {
    const onPrevious = vi.fn();
    const { result } = renderHook(() =>
      useDynamicStepper({
        stepCount: 3,
        defaultActiveStep: 1,
        onPrevious,
      }),
    );
    act(() => {
      result.current.goPrevious();
    });
    expect(onPrevious).toHaveBeenCalledWith(0);
  });

  it("should expose safe flags when stepCount is zero", () => {
    const { result } = renderHook(() =>
      useDynamicStepper({ stepCount: 0, defaultActiveStep: 0 }),
    );
    expect(result.current.activeStep).toBe(0);
    expect(result.current.canGoPrevious).toBe(false);
    expect(result.current.canGoNext).toBe(false);
    act(() => {
      result.current.goNext();
      result.current.goPrevious();
    });
    expect(result.current.activeStep).toBe(0);
  });
});
