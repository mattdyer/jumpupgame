import { test, expect } from '@playwright/test';

test('game loads and player is visible', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
});

test('score updates on game start', async ({ page }) => {
  await page.goto('/');
  // Debug: Print contents to see where the HUD went
  const content = await page.content();
  console.log('Page Content:', content);
  
  const scoreText = page.locator('#hud');
  // Use a longer timeout for the element appearing
  await expect(scoreText).toBeVisible({ timeout: 10000 });
  await expect(scoreText).toContainText('Score: 0');
});
