import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HashGenerator } from "./hash-generator";

// Mock crypto.subtle.digest for jsdom
vi.stubGlobal("crypto", {
  subtle: {
    digest: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3, 4]).buffer),
  },
});

describe("HashGenerator", () => {
  it("should expose displayName", () => {
    expect(HashGenerator.displayName).toBe("HashGenerator");
  });

  it("should stamp data-slot", () => {
    render(<HashGenerator />);
    const root = document.querySelector('[data-slot="hash-generator"]');
    expect(root).toBeTruthy();
    expect(root?.getAttribute("data-slot")).toBe("hash-generator");
  });

  it("should render algorithm label", () => {
    render(<HashGenerator algorithm="sha256" />);
    expect(screen.getByText("SHA-256")).toBeInTheDocument();
  });

  it("should render with sha512 algorithm", () => {
    render(<HashGenerator algorithm="sha512" />);
    expect(screen.getByText("SHA-512")).toBeInTheDocument();
  });

  it("should render textarea for input", () => {
    render(<HashGenerator />);
    expect(
      screen.getByPlaceholderText("Enter text to hash..."),
    ).toBeInTheDocument();
  });

  it("should display hash output", async () => {
    render(<HashGenerator />);
    const textarea = screen.getByPlaceholderText("Enter text to hash...");
    await userEvent.type(textarea, "hello");
    const output = document.querySelector(
      '[data-slot="hash-generator-output"]',
    );
    expect(output).toBeTruthy();
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<HashGenerator ref={ref} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("hash-generator");
  });

  it("should accept controlled value via value prop", () => {
    render(<HashGenerator value="test text" readOnly />);
    const textarea = screen.getByPlaceholderText("Enter text to hash...");
    expect(textarea).toHaveValue("test text");
  });

  it("should call onValueChange when typing", async () => {
    const handleChange = vi.fn();
    render(<HashGenerator onValueChange={handleChange} />);
    const textarea = screen.getByPlaceholderText("Enter text to hash...");
    await userEvent.type(textarea, "a");
    expect(handleChange).toHaveBeenCalledWith("a");
  });
});
