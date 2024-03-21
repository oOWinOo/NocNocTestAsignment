import { test, expect } from "@playwright/test";

test("should have correct filter the price before discount", async ({
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
  await page.getByPlaceholder("Max").click();
  await page.getByPlaceholder("Max").fill("2000");
  await page.getByPlaceholder("Max").press("Enter");
  await page.getByPlaceholder("Min").click();
  await page.getByPlaceholder("Min").fill("300");
  await page.getByPlaceholder("Min").press("Enter");

  await page.waitForTimeout(2000);

  const productListContainer = await page.$$(".product-list div a ");
  let min = 300;
  let max = 2000;
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
      console.log(prices[0]);
      if (min > parseInt(prices[0].replace(/,/g, "")) || max < parseInt(prices[0].replace(/,/g, ""))) {
        check = false;
        break;
      }
      min = parseInt(prices[0]);
    }
  }
  const expectedCorrectFiltered = true;
  expect(check).toBe(expectedCorrectFiltered);
});

test("should have correct filter the price after discount", async ({
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
  await page.getByPlaceholder("Max").click();
  await page.getByPlaceholder("Max").fill("2000");
  await page.getByPlaceholder("Max").press("Enter");
  await page.getByPlaceholder("Min").click();
  await page.getByPlaceholder("Min").fill("300");
  await page.getByPlaceholder("Min").press("Enter");

  await page.waitForTimeout(2000);

  const productListContainer = await page.$$(".product-list div a ");
  let min = 300;
  let max = 2000;
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
      console.log(prices[0]);
      if (min > parseInt(prices[0].replace(/,/g, "")) || max < parseInt(prices[0].replace(/,/g, ""))) {
        check = false;
        break;
      }

    }
  }
  const expectedCorrectFiltered = true;
  expect(check).toBe(expectedCorrectFiltered);
});
