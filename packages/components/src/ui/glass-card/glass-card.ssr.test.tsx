import { renderToString } from "react-dom/server";
import { expect, it, vi } from "vitest";

it("imports and server-renders without DOM globals and retains content", async () => {
  vi.stubGlobal("window", undefined);
  vi.stubGlobal("document", undefined);
  vi.stubGlobal("navigator", undefined);
  try {
    const { ZuiGlassCard } = await import("./index");
    expect(
      renderToString(
        <ZuiGlassCard floating glow>
          <ZuiGlassCard.Content>Server content</ZuiGlassCard.Content>
        </ZuiGlassCard>,
      ),
    ).toContain("Server content");
  } finally {
    vi.unstubAllGlobals();
  }
});
