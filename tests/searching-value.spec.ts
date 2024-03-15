import { test, expect } from "@playwright/test";

test("Check searching value", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );

  const urlP = await page.url();
  const url = new URL(urlP);
  const params = new URLSearchParams(url.search);
  const stValue = params.get("st");
  await page.waitForSelector("h1"); // Wait for the heading element to be available
    
  if (stValue !== null) {
    await expect(page.getByRole("heading", { name: stValue })).toBeVisible();
  } else {
    throw new Error("st parameter is null");
  }
  
});
