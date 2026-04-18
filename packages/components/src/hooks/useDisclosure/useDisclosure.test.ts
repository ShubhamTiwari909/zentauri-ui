import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("should start closed by default", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it("should respect defaultOpen when uncontrolled", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("should open close and toggle", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: false }));
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should call onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure({ defaultOpen: false, onOpenChange }),
    );
    act(() => {
      result.current.setOpen(true);
    });
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it("should be controlled when open prop is defined", () => {
    const onOpenChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ open }: { open: boolean }) =>
        useDisclosure({ open, onOpenChange }),
      { initialProps: { open: false } },
    );
    expect(result.current.isOpen).toBe(false);
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    rerender({ open: true });
    expect(result.current.isOpen).toBe(true);
  });
});
