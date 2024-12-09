// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("see the reqular main page", async ({ page }) => {
  await expect(page.locator(".hero__title.heroTitle_ohk")).toBeVisible();
});
