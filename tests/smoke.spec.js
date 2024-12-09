// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  if (!process.env.PLAYWRIGHT_URL) {
    throw new Error(
      `PLAYWRIGHT_URL environment variable is missing, got "${process.env.AMAZON_URL}".`
    );
  }
  await page.goto(process.env.PLAYWRIGHT_URL);
});

test("see the main page", async ({ page }) => {
  await expect(page.locator(".hero__title.heroTitle_ohkl")).toBeVisible();
});
