import { render, screen } from "@testing-library/react";
import * as navigation from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PageWrapper from "./PageWrapper";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

function renderPageWrapper(pathname: string) {
  vi.mocked(navigation.usePathname).mockReturnValue(pathname);

  return render(
    <PageWrapper>
      <main>Page content</main>
    </PageWrapper>,
  );
}

describe("PageWrapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    "/preview/components/accordion",
    "/preview/installation",
    "/preview/tokens",
    "/preview/typography/headings",
    "/preview/charts/area",
  ])("shows the theme toggle on theme-aware preview route %s", (pathname) => {
    renderPageWrapper(pathname);

    expect(
      screen.getByRole("switch", { name: "Demo toggle" }),
    ).toBeInTheDocument();
  });

  it.each([
    "/",
    "/preview/animations",
    "/preview/components",
    "/preview/typography",
    "/preview/charts",
    "/contact-us",
  ])("hides the theme toggle on non-theme route %s", (pathname) => {
    renderPageWrapper(pathname);

    expect(
      screen.queryByRole("switch", { name: "Demo toggle" }),
    ).not.toBeInTheDocument();
  });
});
