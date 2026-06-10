import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { useCookie } from "./useCookie";

describe("useCookie", () => {
  afterEach(() => {
    for (const row of document.cookie.split("; ")) {
      const name = row.split("=")[0];
      if (name) {
        document.cookie = `${name}=; path=/; max-age=0`;
      }
    }
  });

  it("should fall back to initialValue when the cookie is absent", () => {
    const { result } = renderHook(() => useCookie("zui-test", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });

  it("should read an existing cookie", () => {
    document.cookie = "zui-test=stored; path=/";
    const { result } = renderHook(() => useCookie("zui-test", "fallback"));
    expect(result.current[0]).toBe("stored");
  });

  it("should write the cookie and update state", () => {
    const { result } = renderHook(() => useCookie("zui-test"));
    act(() => {
      result.current[1]("hello world");
    });
    expect(result.current[0]).toBe("hello world");
    expect(document.cookie).toContain("zui-test=hello%20world");
  });

  it("should remove the cookie and reset state to null", () => {
    document.cookie = "zui-test=stored; path=/";
    const { result } = renderHook(() => useCookie("zui-test"));
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBeNull();
    expect(document.cookie).not.toContain("zui-test=stored");
  });

  it("should re-read when the cookie name changes", () => {
    document.cookie = "zui-a=alpha; path=/";
    document.cookie = "zui-b=beta; path=/";
    const { result, rerender } = renderHook(
      ({ name }: { name: string }) => useCookie(name),
      { initialProps: { name: "zui-a" } },
    );
    expect(result.current[0]).toBe("alpha");
    rerender({ name: "zui-b" });
    expect(result.current[0]).toBe("beta");
  });
});
