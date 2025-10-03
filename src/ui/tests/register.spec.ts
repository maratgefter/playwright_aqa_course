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
        password: "Qwertyui"
    }

    enum NOTIFICATIONS {
        REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page"
    }

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        const registerButtonOnLogin = page.locator('#registerOnLogin');
        const registerFormTitle = page.locator('#registerForm');
        await page.goto(url);
        await registerButtonOnLogin.click();
        await expect(registerFormTitle).toBeVisible();
    });

    test("Should be registered with valid credentials", async ({ page }) => {
        const usernameInput = page.locator("#userNameOnRegister");
        const passwordInput = page.locator("#passwordOnRegister");
        const registerButtonOnRegiser = page.locator("#passwordOnRegister");
        const errorMessageOnRegister = page.locator("#errorMessageOnRegister");

        await usernameInput.fill(validCredentials.username);
        await passwordInput.fill(validCredentials.password);
        await registerButtonOnRegiser.click();
        await expect(errorMessageOnRegister).toBeVisible();
        await expect(errorMessageOnRegister).toContainText(NOTIFICATIONS.REGISTER_SUCCESS);
    });
});