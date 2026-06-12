import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import homeSeo from "@/content/seo/home.json";
import type { PreviewSeoDocument } from "@/lib/preview-seo";

import { HomeHero } from "./hero";

vi.mock("next/image", () => ({
  default: ({
    alt,
    fill: _fill,
    preload: _preload,
    ...props
  }: {
    alt: string;
    fill?: boolean;
    preload?: boolean;
    [key: string]: unknown;
  }) => <img alt={alt} {...props} />,
}));

describe("HomeHero", () => {
  it("publishes the token-first Tailwind v4 product story", () => {
    render(<HomeHero seo={homeSeo as PreviewSeoDocument} />);

    expect(
      screen.getByRole("heading", {
        name: "React + Tailwind v4 UI kit with token-first theming and optional motion",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Token-first theming")).toBeInTheDocument();
    expect(screen.getByText("Optional motion")).toBeInTheDocument();
  });
});
