import { test, expect } from "@playwright/test";

test("after refresh min and max value should be null", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&registration=success&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  const maxPlaceHolder = page.getByPlaceholder("Max");
  const minPlaceHolder = page.getByPlaceholder("Min");
  await maxPlaceHolder.click();
  await maxPlaceHolder.fill("5000");
  await maxPlaceHolder.press("Enter");
  await minPlaceHolder.click();
  await minPlaceHolder.fill("300");
  await minPlaceHolder.press("Enter");
  await page.waitForTimeout(2000);
  const refreshNew = page
    .locator("p")
    .filter({ hasText: "ฟิลเตอร์" })
    .locator("a");
  await refreshNew.click();
  await page.waitForTimeout(2000);

  const minElement = await page.$('[placeholder="Min"]');
  if (minElement) {
    const minValue = await minElement.evaluate((element) => {
      if (element instanceof HTMLInputElement) {
        return element.value;
      }
      return "";
    });
    expect(minValue).toBeNull();
  } else {
    expect(true).toBeFalsy();
  }

  const maxElement = await page.$('[placeholder="Max"]');
  if (maxElement) {
    const maxValue = await maxElement.evaluate((element) => {
      if (element instanceof HTMLInputElement) {
        return element.value;
      }
      return "";
    });
    expect(maxValue).toBeNull();
  } else {
    expect(true).toBeFalsy();
  }
});
