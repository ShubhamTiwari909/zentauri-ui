import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToastProvider } from "@zentauri-ui/zentauri-components/ui/toast";

import { DropdownPlayground } from "./dropdown/sections/components/playground";
import { ToastPlayground } from "./toast/sections/components/playground";
import { TooltipPlayground } from "./tooltip/sections/components/playground";

function getGalleryTiles(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>('[role="button"][aria-pressed]'),
  );
}

describe("preview appearance galleries", () => {
  it("names inert dropdown gallery tiles from the outer button surface", () => {
    const { container } = render(<DropdownPlayground />);

    const tiles = getGalleryTiles(container);

    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.every((tile) => tile.getAttribute("aria-label"))).toBe(true);
  });

  it("names inert toast gallery tiles from the outer button surface", () => {
    const { container } = render(
      <ToastProvider>
        <ToastPlayground />
      </ToastProvider>,
    );

    const tiles = getGalleryTiles(container);

    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.every((tile) => tile.getAttribute("aria-label"))).toBe(true);
  });

  it("names inert tooltip gallery tiles from the outer button surface", () => {
    const { container } = render(<TooltipPlayground />);

    const tiles = getGalleryTiles(container);

    expect(tiles.length).toBeGreaterThan(0);
    expect(tiles.every((tile) => tile.getAttribute("aria-label"))).toBe(true);
  });
});
