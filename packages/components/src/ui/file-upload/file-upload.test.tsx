import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUpload } from "./file-upload";

describe("FileUpload", () => {
  it("should expose displayName", () => {
    expect(FileUpload.displayName).toBe("FileUpload");
  });

  it("should stamp data-slot", () => {
    render(<FileUpload />);
    expect(document.querySelector('[data-slot="file-upload"]')).toBeTruthy();
  });

  it("should call onFiles when user selects a file", async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();
    render(<FileUpload onFiles={onFiles} />);
    const input = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["hello"], "notes.txt", { type: "text/plain" });
    await user.upload(input, file);
    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0]?.[0]?.[0]?.name).toBe("notes.txt");
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<FileUpload ref={ref} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("file-upload");
  });
});
