import { createRef } from "react";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PackageInstallCommand } from "./package-install-command";
import { buildInstallCommand } from "./package-install-command-base";

describe("PackageInstallCommand", () => {
  it("should set displayName", () => {
    expect(PackageInstallCommand.displayName).toBe("PackageInstallCommand");
  });

  it("should stamp data-slot on the root container", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    expect(
      container.querySelector('[data-slot="package-install-command"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="package-install-command-tabs"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="package-install-command-body"]'),
    ).toBeTruthy();
    expect(
      container.querySelector('[data-slot="package-install-command-code"]'),
    ).toBeTruthy();
  });

  it("should render the npm install command by default", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("npm install react");
  });

  it("should render pnpm command when switching to pnpm tab", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    const pnpmTab = [
      ...container.querySelectorAll(
        '[data-slot="package-install-command-tab"]',
      ),
    ].find((t) => t.textContent?.includes("pnpm")) as HTMLButtonElement;
    fireEvent.click(pnpmTab);
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("pnpm add react");
  });

  it("should render yarn command when switching to yarn tab", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    const yarnTab = [
      ...container.querySelectorAll(
        '[data-slot="package-install-command-tab"]',
      ),
    ].find((t) => t.textContent?.includes("yarn")) as HTMLButtonElement;
    fireEvent.click(yarnTab);
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("yarn add react");
  });

  it("should render bun command when switching to bun tab", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    const bunTab = [
      ...container.querySelectorAll(
        '[data-slot="package-install-command-tab"]',
      ),
    ].find((t) => t.textContent?.includes("bun")) as HTMLButtonElement;
    fireEvent.click(bunTab);
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("bun add react");
  });

  it("should set the active tab data-active attribute", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    const npmTab = [
      ...container.querySelectorAll(
        '[data-slot="package-install-command-tab"]',
      ),
    ].find((t) => t.textContent?.includes("npm")) as HTMLButtonElement;
    expect(npmTab.getAttribute("data-active")).toBe("true");
  });

  it("should render with a custom defaultManager", () => {
    const { container } = render(
      <PackageInstallCommand package="react" defaultManager="pnpm" />,
    );
    const pnpmTab = [
      ...container.querySelectorAll(
        '[data-slot="package-install-command-tab"]',
      ),
    ].find((t) => t.textContent?.includes("pnpm")) as HTMLButtonElement;
    expect(pnpmTab.getAttribute("data-active")).toBe("true");
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("pnpm add react");
  });

  it("should handle multiple packages", () => {
    const { container } = render(
      <PackageInstallCommand package="react react-dom" />,
    );
    const code = container.querySelector(
      '[data-slot="package-install-command-code"]',
    );
    expect(code?.textContent).toBe("npm install react react-dom");
  });

  it("should show the copy button by default", () => {
    const { container } = render(<PackageInstallCommand package="react" />);
    expect(
      container.querySelector('[data-slot="package-install-command-copy"]'),
    ).toBeTruthy();
  });

  it("should hide the copy button when enableClipboard is false", () => {
    const { container } = render(
      <PackageInstallCommand package="react" enableClipboard={false} />,
    );
    expect(
      container.querySelector('[data-slot="package-install-command-copy"]'),
    ).toBeFalsy();
  });

  it("should forward refs to the root element", () => {
    const ref = createRef<HTMLDivElement>();
    render(<PackageInstallCommand package="react" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.getAttribute("data-slot")).toBe(
      "package-install-command",
    );
  });

  it("should apply custom className", () => {
    const { container } = render(
      <PackageInstallCommand package="react" className="custom-class" />,
    );
    const root = container.querySelector(
      '[data-slot="package-install-command"]',
    );
    expect(root?.className).toMatch(/custom-class/);
  });
});

describe("package-install-command helpers", () => {
  it("should build the correct install command for each manager", () => {
    expect(buildInstallCommand("react", "npm")).toBe("npm install react");
    expect(buildInstallCommand("react", "pnpm")).toBe("pnpm add react");
    expect(buildInstallCommand("react", "yarn")).toBe("yarn add react");
    expect(buildInstallCommand("react", "bun")).toBe("bun add react");
  });

  it("should fall back to npm for unknown package managers", () => {
    expect(buildInstallCommand("react", "unknown" as "npm")).toBe(
      "npm install react",
    );
  });
});
