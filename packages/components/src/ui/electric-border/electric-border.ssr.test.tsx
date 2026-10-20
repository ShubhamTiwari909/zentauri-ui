// @vitest-environment node
import { renderToString } from "react-dom/server";
import { expect, it } from "vitest";
import { ZuiElectricBorder } from "./index";

it("server-renders a static rim and essential content without browser APIs", () => {
  expect(typeof window).toBe("undefined");
  expect(typeof requestAnimationFrame).toBe("undefined");
  const html = renderToString(
    <ZuiElectricBorder>
      <button>Launch</button>
      {0}
    </ZuiElectricBorder>,
  );
  expect(html).toContain("Launch</button>0");
  expect(html).toContain('data-motion="static"');
  expect(html).toContain('data-slot="electric-border-rim"');
  expect(html).toContain('aria-hidden="true"');
});
