/*  Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/
import test, { expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

test.describe("[https://anatoly-karpovich.github.io/demo-login-form/] [Form Registration]", () => {
  const validCredentials: ICredentials = {
    username: "Vasya",
    password: "Qwerty!2"
  };

  enum NOTIFICATIONS {
    REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    USERNAME_IS_REQUIRED = "Username is required",
    PASSWORD_IS_REQIURED = "Password is required"
  }

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const registerFormTitle = page.locator("#registerForm");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await expect(registerFormTitle).toBeVisible();
  });

  test("Should be registered with valid credentials", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButtonOnRegiser = page.locator("#register");
    const errorMessageOnRegister = page.locator("#errorMessageOnRegister");
    const backButtonOnRegister = page.locator("#backOnRegister");
    const usernameInputOnLogin = page.locator("#userName");
    const passwordInputOnLogin = page.locator("#password");
    const submitButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegiser.click();
    await expect(errorMessageOnRegister).toBeVisible();
    await expect(errorMessageOnRegister).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    await backButtonOnRegister.click();
    await usernameInputOnLogin.fill(validCredentials.username);
    await passwordInputOnLogin.fill(validCredentials.password);
    await submitButton.click();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(`Hello, ${validCredentials.username}!`);
  });

  test("Password should be required", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const registerButtonOnRegiser = page.locator("#register");
    const errorMessageOnRegister = page.locator("#errorMessageOnRegister");

    await usernameInput.fill(validCredentials.username);
    await registerButtonOnRegiser.click();
    await expect(errorMessageOnRegister).toBeVisible();
    await expect(errorMessageOnRegister).toContainText(NOTIFICATIONS.PASSWORD_IS_REQIURED);
  });

  test("Username should be required", async ({ page }) => {
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButtonOnRegiser = page.locator("#register");
    const errorMessageOnRegister = page.locator("#errorMessageOnRegister");

    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegiser.click();
    await expect(errorMessageOnRegister).toBeVisible();
    await expect(errorMessageOnRegister).toContainText(NOTIFICATIONS.USERNAME_IS_REQUIRED);
  });
});
