import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TerminalEmulator } from "./terminal-emulator";
import { buildTerminalCopyText } from "./terminal-emulator-base";
import type { TerminalLine } from "./types";

const SAMPLE: TerminalLine[] = [
  { type: "comment", text: "# install deps" },
  { type: "command", text: "npm install" },
  { type: "output", text: "added 312 packages in 4s" },
  { type: "command", text: "npm run build" },
  { type: "error", text: "Error: build failed" },
];

describe("TerminalEmulator", () => {
  it("should set displayName", () => {
    expect(TerminalEmulator.displayName).toBe("TerminalEmulator");
  });

  it("should stamp data-slot on the root and body", () => {
    const { container } = render(<TerminalEmulator lines={SAMPLE} />);
    expect(
      container.querySelector('[data-slot="terminal-emulator"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="terminal-emulator-body"]'),
    ).toBeTruthy();
  });

  it("should render the given line text", () => {
    const { container } = render(<TerminalEmulator lines={SAMPLE} />);
    expect(container.textContent).toContain("npm install");
    expect(container.textContent).toContain("added 312 packages in 4s");
    expect(container.textContent).toContain("Error: build failed");
  });

  it("should render the prompt before command lines", () => {
    const { container } = render(
      <TerminalEmulator lines={SAMPLE} prompt="❯" />,
    );
    const prompts = [
      ...container.querySelectorAll('[data-slot="terminal-emulator-prompt"]'),
    ];
    // one prompt per command line (2 commands in SAMPLE)
    expect(prompts.length).toBe(2);
    expect(prompts.every((p) => p.textContent === "❯")).toBe(true);
  });

  it("should mark error lines with data-type", () => {
    const { container } = render(<TerminalEmulator lines={SAMPLE} />);
    const error = container.querySelector(
      '[data-slot="terminal-emulator-line"][data-type="error"]',
    );
    expect(error?.textContent).toContain("Error: build failed");
  });

  it("should render the header by default and hide it when disabled", () => {
    const { container, rerender } = render(<TerminalEmulator lines={SAMPLE} />);
    expect(
      container.querySelector('[data-slot="terminal-emulator-header"]'),
    ).toBeTruthy();
    rerender(<TerminalEmulator lines={SAMPLE} showHeader={false} />);
    expect(
      container.querySelector('[data-slot="terminal-emulator-header"]'),
    ).toBeFalsy();
  });

  it("should hide the copy button when clipboard is disabled", () => {
    const { container } = render(
      <TerminalEmulator lines={SAMPLE} enableClipboard={false} />,
    );
    expect(
      container.querySelector('[data-slot="terminal-emulator-copy"]'),
    ).toBeFalsy();
  });

  it("should render the title in the header", () => {
    const { container } = render(
      <TerminalEmulator lines={SAMPLE} title="zsh — bash" />,
    );
    const titleEl = container.querySelector(
      '[data-slot="terminal-emulator-title"]',
    );
    expect(titleEl?.textContent).toBe("zsh — bash");
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<TerminalEmulator lines={SAMPLE} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe("terminal-emulator");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <TerminalEmulator lines={SAMPLE} className="custom-class" />,
    );
    const root = container.querySelector('[data-slot="terminal-emulator"]');
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("terminal-emulator helpers", () => {
  it("joins lines, prefixing commands with the prompt", () => {
    const text = buildTerminalCopyText(SAMPLE, "$");
    expect(text).toBe(
      [
        "# install deps",
        "$ npm install",
        "added 312 packages in 4s",
        "$ npm run build",
        "Error: build failed",
      ].join("\n"),
    );
  });
});
