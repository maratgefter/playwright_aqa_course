import { test as base, expect } from "fixtures/pages.fixture";
import { adminCredentials, SALES_PORTAL_URL } from "config/env";

export const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, homePage }, use) => {
    await use(async () => {
      const emailInput = page.locator("#emailinput");
      const passwordInput = page.locator("#passwordinput");
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
      await emailInput.fill(adminCredentials.username);
      await passwordInput.fill(adminCredentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  }
});

export { expect };
