import { test, expect } from '@playwright/test';

test('must login before use wish list', async ({ page }) => {
  await page.goto('https://nocnoc.com/pl/All?area=search&st=%E0%B9%80%E0%B8%84%E0%B8%A3%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B8%97%E0%B8%B3%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%AD%E0%B8%B8%E0%B9%88%E0%B8%99');
  await page.getByText('ค้นหาจากห้อง').click();
  await page.locator('#menu_group_855411').getByText('เครื่องทำน้ำอุ่นและน้ำร้อน').click();
  await page.getByRole('link', { name: 'ยอมรับทั้งหมด' }).click();
  const wishList = await page.waitForSelector("span.add-to-mywishlist")
  await wishList.click()
  await page.waitForTimeout(2000)
  const loginModal = await page.waitForSelector("div.modal-content")
  expect(loginModal).toBeDefined();
});