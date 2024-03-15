import { test, expect } from "@playwright/test";

test("when compare product the compare panel will be defined", async ({
  page,
}) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  const labelElement = await page.waitForSelector(
    "label.custom-control-label.add-to-compare"
  );
  if (labelElement) {
    await labelElement.click();
    console.log("Clicked on the label within the div");
  }

  await page.waitForSelector("div.compare-panel.product-listing-compare");
  const comparePanel = await page.$(
    "div.compare-panel.product-listing-compare"
  );

  expect(comparePanel).toBeDefined();
  await page.getByText("ยอมรับทั้งหมด").click();
  await page.getByText("ลบทั้งหมด").click();
  const comparePanelAfter = await page.$(
    "div.compare-panel.product-listing-compare"
  );
  expect(comparePanelAfter).toBeNull();
});
