import { test, expect } from "@playwright/test";

test("compare more than 5 products will alert the warning", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  await page.waitForTimeout(2000);
  const productListContainer = await page.$$(".product-list div a ");

  for (const div of productListContainer) {
    const labelElement = await div.$(
      "label.custom-control-label.add-to-compare"
    );
    if (labelElement) {
      await labelElement.click();
      console.log("Clicked on the label within the div");
    } else {
      console.log("Label not found within the div");
    }
  }
  await page.waitForSelector('div.toast.warning-toast[role="alert"]');
  const warning = await page.$('div.toast.warning-toast[role="alert"]');

  expect(warning).toBeDefined();
  if (warning) {
    const innerText = await warning.innerText();
    expect(innerText).toContain(
      "คุณสามารถเปรียบเทียบสินค้าได้พร้อมกัน 5 สินค้า"
    );
  }
});
