import { expect, test, type VisualGuardFixture } from "visualguard/playwright";
import type { Page } from "@playwright/test";
import { typographyRoutes, type DocsTheme } from "./routes";

test.use({ visualguardOptions: { collectHealth: true, failOn: "review" } });

async function openExample(page: Page, path: string, theme: DocsTheme) {
  await page.clock.setFixedTime(new Date("2026-10-13T00:00:00Z"));
  // Vercel supplies this telemetry script only in deployment. It renders no UI.
  await page.route("**/_vercel/insights/script.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1").first()).toBeVisible();
  const toggle = page.getByRole("switch", { name: "Demo toggle", exact: true });
  // The controlled toggle also acts as a hydration readiness check.
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "false");
  if (theme === "dark") await toggle.click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", theme);
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(0, 0);
}

async function expectReflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.width);
}

async function capture(
  page: Page,
  visualguard: VisualGuardFixture,
  name: string,
) {
  const result = await visualguard.check(page, { name });
  expect(result.captures.staging?.truncated).toBe(false);
  expect(result.captures.staging?.unstable).toBe(false);
  // VisualGuard returns capture evidence without a diff during explicit updates.
  // Only a subsequent comparison can verify that these references match.
  if (test.info().config.updateSnapshots !== "all") {
    expect(result.diff).toBeDefined();
    // Every changed pixel above the sensitivity needs review, including changes
    // that the heuristics classify as content or noise.
    expect(result.diff?.diffPixels).toBe(0);
    expect(result.diff?.diffRatio).toBe(0);
  }
  return result;
}

for (const [slug, path] of Object.entries(typographyRoutes)) {
  test(`${slug} page`, async ({ page, visualguard }, testInfo) => {
    test.skip(
      testInfo.project.metadata.size === "narrow" &&
        !["truncation", "editorial"].includes(slug),
      "320px coverage focuses on clipping and editorial reflow",
    );
    await openExample(page, path, testInfo.project.metadata.theme as DocsTheme);
    await expectReflow(page);
    await capture(page, visualguard, "page");
  });
}

test("expansion retains disclosure focus", async ({
  page,
  visualguard,
}, testInfo) => {
  test.skip(
    testInfo.project.metadata.size === "narrow",
    "Covered at mobile and desktop sizes",
  );
  await openExample(
    page,
    typographyRoutes.truncation,
    testInfo.project.metadata.theme as DocsTheme,
  );
  const button = page
    .locator('[data-slot="typography-expandable-text"] button')
    .first();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).toBeFocused();
  await capture(page, visualguard, "expanded");
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
  await capture(page, visualguard, "collapsed-focused");
});

test("footnote and permalink keyboard focus", async ({
  page,
  visualguard,
}, testInfo) => {
  test.skip(
    testInfo.project.metadata.size === "narrow",
    "Covered at mobile and desktop sizes",
  );
  await openExample(
    page,
    typographyRoutes.editorial,
    testInfo.project.metadata.theme as DocsTheme,
  );
  const reference = page
    .getByRole("link", { name: "Footnote 1", exact: true })
    .first();
  const target = await reference.getAttribute("href");
  expect(target).toBeTruthy();
  const note = page.locator(`[id="${decodeURIComponent(target!.slice(1))}"]`);
  await reference.focus();
  await page.keyboard.press("Enter");
  await expect(note).toBeFocused();
  expect(
    await note.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe("solid");
  await capture(page, visualguard, "note-focused");
  await note
    .getByRole("link", { name: "Back to opening reference", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(reference).toBeFocused();
  const permalink = page
    .getByRole("link", { name: "Link to Readable content", exact: true })
    .first();
  await permalink.focus();
  await expect(permalink).toBeFocused();
  await expect(permalink).toHaveCSS("opacity", "1");
  await capture(page, visualguard, "permalink-focused");
});

test.describe("Enlarged text", () => {
  test.use({
    visualguardOptions: {
      collectHealth: true,
      failOn: "review",
      config: { screenshot: { fullPage: false } },
    },
  });
  test("editorial enlarged text and RTL", async ({
    page,
    visualguard,
  }, testInfo) => {
    test.skip(
      testInfo.project.metadata.size === "narrow",
      "Covered at mobile and desktop sizes",
    );
    await openExample(
      page,
      typographyRoutes.editorial,
      testInfo.project.metadata.theme as DocsTheme,
    );
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    await expectReflow(page);
    const rtl = page.locator('p[dir="rtl"]');
    await expect(rtl).toHaveCSS("direction", "rtl");
    expect(
      await rtl.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await expect(page.locator("html")).toHaveCSS("font-size", "32px");
    for (const [name, region] of [
      ["enlarged-article", page.locator('[data-demo="drop-cap"]').first()],
      ["enlarged-rtl", rtl],
    ] as const) {
      const header = page.locator('[data-slot="site-header"]').first();
      const headerHeight = (await header.boundingBox())?.height ?? 0;
      await region.evaluate((element, offset) => {
        window.scrollTo({
          top: window.scrollY + element.getBoundingClientRect().top - offset,
          behavior: "instant",
        });
      }, headerHeight + 32);
      const result = await capture(page, visualguard, name);
      expect(result.captures.staging?.size).toEqual(page.viewportSize());
    }
  });
});
