import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByLabel("breadcrumb").locator("a").click();
  const homeURL = page.url();
  await expect(homeURL).toBe("https://nocnoc.com/");
});
