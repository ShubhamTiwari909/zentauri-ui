// @vitest-environment node
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";

it("imports and server-renders without DOM globals and retains content", async () => {
  expect(typeof window).toBe("undefined");
  expect(typeof document).toBe("undefined");
  expect(typeof requestAnimationFrame).toBe("undefined");
  expect(typeof IntersectionObserver).toBe("undefined");
  const { ZuiGlassCard } = await import("./index");
  expect(
    renderToString(
      <ZuiGlassCard floating glow>
        <ZuiGlassCard.Content>Server content</ZuiGlassCard.Content>
      </ZuiGlassCard>,
    ),
  ).toContain("Server content");
});
