import { test, expect } from "@playwright/test";

test("should have correct sorted descending by sold ", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );
  await page.getByText("ค้นหาจากห้อง").click();
  await page
    .locator("#menu_group_855411")
    .getByText("เครื่องทำน้ำอุ่นและน้ำร้อน")
    .click();
  await page.getByTitle("สินค้าแนะนำ").click();
  await page.getByText("สินค้าขายดี").click();
  await page.waitForTimeout(2000);

  const productListContainer = await page.$$(
    ".product-list div.item-sold.tw-typography-body-3"
  );
  let max = -1;
  let check = true;
  for (const div of productListContainer) {
    const innerText = await div.innerText();
    const regex = /([\d.]+)K?/; // Regular expression to match digits and optional 'K'

    const match = innerText.match(regex);
    if (match) {
      let number = parseFloat(match[1].replace(",", "")); // Convert matched string to float and remove comma if present
      if (innerText.includes("K")) {
        number *= 1000;
      }
      if (max == -1) {
        max = number;
      } else if (max < number) {
        check = false;
        break;
      }
      max = number;

      console.log("Number:", number);
    } else {
      if (max == -1) {
        max = 0;
      } else if (max < 0) {
        check = false;
        break;
      }
      max = 0;
      console.log("Number:", 0);
    }
  }
  const expectedCorrectSorted = true;
  expect(check).toBe(expectedCorrectSorted);
  
});
