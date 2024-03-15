import { expect, test } from "@playwright/test";

test("correct sorted price before discount", async ({ page }) => {
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
    console.log(prices);
    if (prices[0]) {
      if (prices[1]) {
        prices[0] = prices[1];
      }
      if (min > parseInt(prices[0])) {
        check = false;
        break;
      }
      min = parseInt(prices[0]);
    }
  }
  console.log("Sorted : ", check);
  const expectedCorrectSorted = true;
  await expect(check).toBe(expectedCorrectSorted);
});

test("Check searching value", async ({ page }) => {
  await page.goto(
    "https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99"
  );

  const urlP = await page.url();
  const url = new URL(urlP);
  const params = new URLSearchParams(url.search);
  const stValue = params.get("st");
  await page.waitForSelector("h1"); // Wait for the heading element to be available
  const headingText = await page.textContent("h1");
    
  if (stValue !== null) {
    await expect(page.getByRole("heading", { name: stValue })).toBeVisible();
  } else {
    throw new Error("st parameter is null");
  }
});
