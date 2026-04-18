import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useDocumentTitle } from "./useDocumentTitle";

describe("useDocumentTitle", () => {
  it("should set document title from title prop", () => {
    document.title = "Original";
    const { unmount } = renderHook(() =>
      useDocumentTitle({ title: "Page A" }),
    );
    expect(document.title).toBe("Page A");
    unmount();
    expect(document.title).toBe("Original");
  });

  it("should update title when title prop changes", () => {
    document.title = "Start";
    const { rerender, unmount } = renderHook(
      ({ title }: { title: string }) => useDocumentTitle({ title }),
      { initialProps: { title: "One" } },
    );
    expect(document.title).toBe("One");
    rerender({ title: "Two" });
    expect(document.title).toBe("Two");
    unmount();
    expect(document.title).toBe("Start");
  });

  it("should not restore when restoreOnUnmount is false", () => {
    document.title = "KeepMe";
    const { unmount } = renderHook(() =>
      useDocumentTitle({ title: "Temp", restoreOnUnmount: false }),
    );
    expect(document.title).toBe("Temp");
    unmount();
    expect(document.title).toBe("Temp");
    document.title = "KeepMe";
  });
});
