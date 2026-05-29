import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { OTPInput } from "./otp-input";

describe("OTPInput", () => {
  it("should expose displayName", () => {
    expect(OTPInput.displayName).toBe("OTPInput");
  });

  it("should stamp data-slot", () => {
    render(<OTPInput label="Verification code" />);
    expect(document.querySelector('[data-slot="otp-input"]')).toBeTruthy();
    expect(
      document.querySelectorAll('[data-slot="otp-input-cell"]'),
    ).toHaveLength(6);
  });

  it("should type numeric values across cells", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<OTPInput label="Code" onValueChange={onValueChange} />);

    await user.type(screen.getByLabelText("Digit 1 of 6"), "123");

    expect(screen.getByLabelText("Digit 1 of 6")).toHaveValue("1");
    expect(screen.getByLabelText("Digit 2 of 6")).toHaveValue("2");
    expect(screen.getByLabelText("Digit 3 of 6")).toHaveValue("3");
    expect(onValueChange).toHaveBeenLastCalledWith("123");
  });

  it("should ignore non-numeric characters by default", async () => {
    const user = userEvent.setup();
    render(<OTPInput label="Code" />);

    await user.type(screen.getByLabelText("Digit 1 of 6"), "a1b2");

    expect(screen.getByLabelText("Digit 1 of 6")).toHaveValue("1");
    expect(screen.getByLabelText("Digit 2 of 6")).toHaveValue("2");
  });

  it("should support alphanumeric values", async () => {
    const user = userEvent.setup();
    render(<OTPInput allowedCharacters="alphanumeric" label="Invite code" />);

    await user.type(screen.getByLabelText("Digit 1 of 6"), "A7Z");

    expect(screen.getByLabelText("Digit 1 of 6")).toHaveValue("A");
    expect(screen.getByLabelText("Digit 2 of 6")).toHaveValue("7");
    expect(screen.getByLabelText("Digit 3 of 6")).toHaveValue("Z");
  });

  it("should fill cells from paste and call onComplete", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OTPInput label="Code" onComplete={onComplete} />);

    await user.click(screen.getByLabelText("Digit 1 of 6"));
    await user.paste("12-34 56");

    expect(screen.getByLabelText("Digit 6 of 6")).toHaveValue("6");
    expect(onComplete).toHaveBeenLastCalledWith("123456");
  });

  it("should clear the previous cell when backspacing from an empty cell", async () => {
    const user = userEvent.setup();
    render(<OTPInput defaultValue="12" label="Code" />);

    await user.click(screen.getByLabelText("Digit 3 of 6"));
    await user.keyboard("{Backspace}");

    expect(screen.getByLabelText("Digit 2 of 6")).toHaveValue("");
  });

  it("should support controlled state", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<OTPInput label="Code" value="98" onValueChange={onValueChange} />);

    await user.type(screen.getByLabelText("Digit 3 of 6"), "7");

    expect(screen.getByLabelText("Digit 1 of 6")).toHaveValue("9");
    expect(screen.getByLabelText("Digit 2 of 6")).toHaveValue("8");
    expect(onValueChange).toHaveBeenLastCalledWith("987");
  });

  it("should forward ref to the root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<OTPInput ref={ref} label="Code" />);
    expect(ref.current?.getAttribute("data-slot")).toBe("otp-input");
  });

  it("should render a hidden input when name is provided", () => {
    render(<OTPInput defaultValue="123456" label="Code" name="otp" />);
    expect(document.querySelector('input[name="otp"]')).toHaveValue("123456");
  });
});
