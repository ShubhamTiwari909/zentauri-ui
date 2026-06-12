import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as navigation from "next/navigation";

import { PreviewInstallCommandBar } from "./install-command-bar";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("PreviewInstallCommandBar", () => {
  beforeEach(() => {
    vi.mocked(navigation.usePathname).mockReturnValue(
      "/preview/components/buttons",
    );
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("renders the zentauri add command for component preview pages", () => {
    render(<PreviewInstallCommandBar />);

    expect(
      screen.getByText("npx zentauri-ui add buttons"),
    ).toBeInTheDocument();
  });

  it("does not render on the component index route", () => {
    vi.mocked(navigation.usePathname).mockReturnValue("/preview/components");

    const { container } = render(<PreviewInstallCommandBar />);

    expect(container).toBeEmptyDOMElement();
  });

  it("copies the command", () => {
    render(<PreviewInstallCommandBar />);

    fireEvent.click(screen.getByRole("button", { name: "Copy command" }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "npx zentauri-ui add buttons",
    );
  });

  it("uses --animated for animated-only component pages", () => {
    vi.mocked(navigation.usePathname).mockReturnValue(
      "/preview/components/spinner",
    );

    render(<PreviewInstallCommandBar />);

    expect(
      screen.getByText("npx zentauri-ui add --animated spinner"),
    ).toBeInTheDocument();
  });
});
