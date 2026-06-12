import { render, screen } from "@testing-library/react";
import * as navigation from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ComponentDocNotes } from "./component-doc-notes";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("ComponentDocNotes", () => {
  beforeEach(() => {
    vi.mocked(navigation.usePathname).mockReturnValue(
      "/preview/components/rating",
    );
  });

  it("renders accessibility and dependency notes for component pages", () => {
    render(<ComponentDocNotes />);

    expect(
      screen.getByRole("heading", { name: "Accessibility notes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Dependency notes" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Keyboard accessible/i)).toBeInTheDocument();
    expect(screen.getByText(/No extra runtime dependency/i)).toBeInTheDocument();
  });

  it("calls out motion dependencies for animated component pages", () => {
    vi.mocked(navigation.usePathname).mockReturnValue(
      "/preview/components/spinner",
    );

    render(<ComponentDocNotes />);

    expect(screen.getByText(/Requires framer-motion/i)).toBeInTheDocument();
    expect(screen.getByText(/animated entry/i)).toBeInTheDocument();
  });

  it("does not render on component index pages", () => {
    vi.mocked(navigation.usePathname).mockReturnValue("/preview/components");

    const { container } = render(<ComponentDocNotes />);

    expect(container).toBeEmptyDOMElement();
  });
});
