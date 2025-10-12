/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating

*/

import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

test.describe("[https://anatoly-karpovich.github.io/demo-login-form/] [Form Auth]", () => {
  const validCredentials: ICredentials = {
    username: "test@gmail.com",
    password: "SecretPw123!@#"
  };

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginFormTitle = page.locator("#loginForm");
    await page.goto(url);
    await expect(loginFormTitle).toBeVisible();
  });

  test("Should be registered with valid credentials", async ({ page }) => {
    const usernameInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const registerButtonOnRegiser = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegiser.click();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(`Hello, ${validCredentials.username}`);
  });
});
