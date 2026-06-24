import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CodeDiff } from "./code-diff";

const oldCode = "line one\nline two\nline three";
const newCode = "line one\nline two modified\nline three\nline four";

describe("CodeDiff", () => {
  it("should expose displayName", () => {
    expect(CodeDiff.displayName).toBe("CodeDiff");
  });

  it("should stamp data-slot", () => {
    render(<CodeDiff oldCode={oldCode} newCode={newCode} />);
    const root = document.querySelector('[data-slot="code-diff"]');
    expect(root).toBeTruthy();
    expect(root?.getAttribute("data-slot")).toBe("code-diff");
  });

  it("should render diff lines", () => {
    render(<CodeDiff oldCode={oldCode} newCode={newCode} />);
    expect(screen.getByText("line one")).toBeInTheDocument();
    expect(screen.getByText("line two modified")).toBeInTheDocument();
    expect(screen.getByText("line four")).toBeInTheDocument();
  });

  it("should show additions and deletions count", () => {
    render(<CodeDiff oldCode={oldCode} newCode={newCode} />);
    expect(screen.getByText(/additions/)).toBeInTheDocument();
    expect(screen.getByText(/deletions/)).toBeInTheDocument();
  });

  it("should render unchanged code when no changes", () => {
    render(<CodeDiff oldCode="same" newCode="same" />);
    expect(screen.getByText("same")).toBeInTheDocument();
  });

  it("should forward ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CodeDiff ref={ref} oldCode={oldCode} newCode={newCode} />);
    expect(ref.current?.getAttribute("data-slot")).toBe("code-diff");
  });

  it("should render in split view", () => {
    render(<CodeDiff oldCode={oldCode} newCode={newCode} viewType="split" />);
    expect(screen.getAllByText("line one").length).toBeGreaterThanOrEqual(1);
  });
});
