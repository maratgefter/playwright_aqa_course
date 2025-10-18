/*
Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

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
  name: string;
  password: string;
}

interface ICase {
  name: string;
  password: string;
  message: string;
  description: string;
}

enum MESSAGES {
  loginRequired = "Username is required",
  passwordRequired = "Password is required",
  credentialsAreRequired = "Credentials are required",
  pleaseProvideValidData = "Please, provide valid data",
  shortUsername = "Username should contain at least 3 characters",
  longUsername = "Username should contain less than 40 characters",
  prefixPostfixSpaces = "Prefix and postfix spaces are not allowed is username",
  shortPassword = "Password should contain at least 8 characters",
  passwordWithoutLowerCase = "Password should contain at least one character in lower case"
}

test.describe("[https://anatoly-karpovich.github.io/demo-login-form/] [Form Auth]", () => {
  const validCredentials: ICredentials = {
    name: "test@gmail.com",
    password: "SecretPw123!@#"
  };

  const invalidCredentialsLogin: ICase[] = [
    {
      name: `${validCredentials.name}`,
      password: ``,
      message: `${MESSAGES.passwordRequired}`,
      description: "empty password"
    },
    {
      name: ``,
      password: `${validCredentials.password}`,
      message: `${MESSAGES.loginRequired}`,
      description: "empty username"
    },
    {
      name: "",
      password: "",
      message: `${MESSAGES.credentialsAreRequired}`,
      description: "empty username and password"
    }
  ];

  const invalidCredentialsRegister: ICase[] = [
    {
      name: `${validCredentials.name}`,
      password: ``,
      message: `${MESSAGES.passwordRequired}`,
      description: "empty password"
    },
    {
      name: ``,
      password: `${validCredentials.password}`,
      message: `${MESSAGES.loginRequired}`,
      description: "empty username"
    },
    {
      name: "",
      password: "",
      message: `${MESSAGES.pleaseProvideValidData}`,
      description: "empty username and password"
    },
    {
      name: "ab",
      password: `${validCredentials.password}`,
      message: `${MESSAGES.shortUsername}`,
      description: "short username"
    },
    {
      name: "testRandomName40symbolstestRandomName40sy",
      password: `${validCredentials.password}`,
      message: `${MESSAGES.longUsername}`,
      description: "long username"
    },
    {
      name: ` ${validCredentials.name}`,
      password: `${validCredentials.password}`,
      message: `${MESSAGES.prefixPostfixSpaces}`,
      description: "prefix spaces in username"
    },
    {
      name: `${validCredentials.name} `,
      password: `${validCredentials.password}`,
      message: `${MESSAGES.prefixPostfixSpaces}`,
      description: "postfix spaces in username"
    },
    {
      name: `   `,
      password: `${validCredentials.password}`,
      message: `${MESSAGES.prefixPostfixSpaces}`,
      description: "only spaces in username"
    },
    {
      name: `${validCredentials.name}`,
      password: `Aafffff`,
      message: `${MESSAGES.shortPassword}`,
      description: "short password"
    },
    {
      name: `${validCredentials.name}`,
      password: `testRandomName40symbolstestRandomName40sy`,
      message: `${MESSAGES.pleaseProvideValidData}`,
      description: "long password"
    },
    {
      name: `${validCredentials.name}`,
      password: `aafffffa`,
      message: `${MESSAGES.pleaseProvideValidData}`,
      description: "password without upper case"
    },
    {
      name: `${validCredentials.name}`,
      password: `AAFFFFFA`,
      message: `${MESSAGES.passwordWithoutLowerCase}`,
      description: "password without lower case"
    },
    {
      name: `${validCredentials.name}`,
      password: `        `,
      message: `${MESSAGES.passwordRequired}`,
      description: "password with only spaces"
    }
  ];

  test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginFormTitle = page.locator("#loginForm");
    await page.goto(url);
    await expect(loginFormTitle).toBeVisible();
  });

  for (const { name, password, message } of invalidCredentialsLogin) {
    test(`Check validation message on Login form with login ${name} and password ${password}`, async ({ page }) => {
      const usernameInput = page.locator("#userName");
      const passwordInput = page.locator("#password");
      const submitrButton = page.locator("#submit");
      const errorMessage = page.locator("#errorMessage");
      await usernameInput.fill(name);
      await passwordInput.fill(password);
      await submitrButton.click();
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(`${message}`);
    });
  }

  for (const { name, password, message, description } of invalidCredentialsRegister) {
    test(`Check validation message on Register form with ${description}`, async ({ page }) => {
      const registerButtonOnLogin = page.locator("#registerOnLogin");
      const registerFormTitle = page.locator("#registerForm");
      const usernameInputOnRegister = page.locator("#userNameOnRegister");
      const passwordInputOnRegister = page.locator("#passwordOnRegister");
      const registerButtonOnRegiser = page.locator("#register");
      const errorMessageOnRegister = page.locator("#errorMessageOnRegister");

      await registerButtonOnLogin.click();
      await expect(registerFormTitle).toBeVisible();
      await usernameInputOnRegister.fill(name);
      await passwordInputOnRegister.fill(password);
      await registerButtonOnRegiser.click();
      await expect(errorMessageOnRegister).toBeVisible();
      await expect(errorMessageOnRegister).toHaveText(`${message}`);
    });
  }
});
