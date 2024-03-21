import { test, expect } from "@playwright/test";
import { stringify } from "querystring";

test("correct sorted ascending price before discount", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  await page.getByTitle("สินค้าแนะนำ").click();
  await page.getByText("ราคา:จากน้อย-มาก").click();
  await page.waitForTimeout(2000);

  const productListContainer = await page.$$(".product-list div a ");
  let min = 0;
  let check = true;
  for (const div of productListContainer) {
    const innerText = await div.innerText();
    const regex = /฿(\d+(?:,\d{3})*)/g;

    const prices: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(innerText)) !== null) {
      prices.push(match[1]);
    }
    if (prices[0]) {
      if (prices[1]) {
        prices[0] = prices[1];
      }
      if (min > parseInt(prices[0].replace(/,/g, ""))) {
        check = false;
        break;
      }
      min = parseInt(prices[0].replace(/,/g, ""));
    }
  }
  const expectedCorrectSorted = true;
  expect(check).toBe(expectedCorrectSorted);
});

test("correct sorted ascending price after discount", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  await page.getByTitle("สินค้าแนะนำ").click();
  await page.getByText("ราคา:จากน้อย-มาก").click();
  await page.waitForTimeout(2000);

  const productListContainer = await page.$$(".product-list div a ");
  let min = 0;
  let check = true;
  for (const div of productListContainer) {
    const innerText = await div.innerText();
    const regex = /฿(\d+(?:,\d{3})*)/g;

    const prices: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(innerText)) !== null) {
      prices.push(match[1]);
    }
    if (prices[0]) {
      if (min > parseInt(prices[0].replace(/,/g, ""))) {
        check = false;
        break;
      }
      min = parseInt(prices[0].replace(/,/g, ""));
    }
  }
  const expectedCorrectSorted = true;
  expect(check).toBe(expectedCorrectSorted);
});
