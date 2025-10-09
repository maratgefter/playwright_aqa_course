/*
Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован
*/

import test, { expect } from "@playwright/test";

test.describe("[https://anatoly-karpovich.github.io/demo-registration-form/] [Form Registration]", () => {
  const validUserData = {
    firstName: "Vasya",
    lastName: "Vasin",
    password: "Qwerty!2",
    address: "Belarus, Polotsk",
    email: "vasya.vasin@test.com",
    phone: "+375333333333",
    country: "USA",
    gender: "male",
    language: "English",
    skills: "JavaScript",
    birth: {
      year: "1984",
      month: "May",
      day: "15"
    }
  };

  test("Should be registered with valid credentials", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const firstNameInput = page.locator("#firstName");
    const lastNameInput = page.locator("#lastName");
    const addressTextArea = page.locator("#address");
    const emailInput = page.locator("#email");
    const phoneInput = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const maleRadio = page.locator(`//input[@value='${validUserData.gender}']`);
    const languageInput = page.locator("#language");
    const skillsOption = page.locator("//option[@value='Python']");
    const yearOfBirth = page.locator("#year");
    const monthOfBirth = page.locator("#month");
    const dayOfBirth = page.locator("#day");
    const passwordInput = page.locator("#password");
    const confirmPasswordInput = page.locator("#password-confirm");
    const pageTitle = page.locator("//h2");
    const submitButton = page.locator("//button[@type='submit']");

    await page.goto(url);
    await expect(pageTitle).toBeVisible();
    await firstNameInput.fill(validUserData.firstName);
    await lastNameInput.fill(validUserData.lastName);
    await addressTextArea.fill(validUserData.address);
    await emailInput.fill(validUserData.email);
    await phoneInput.fill(validUserData.phone);
    await countryDropdown.selectOption(validUserData.country);
    await maleRadio.click();
    await languageInput.fill(validUserData.language);
    await skillsOption.click();
    await yearOfBirth.selectOption(validUserData.birth.year);
    await monthOfBirth.selectOption(validUserData.birth.month);
    await dayOfBirth.selectOption(validUserData.birth.day);
    await passwordInput.fill(validUserData.password);
    await confirmPasswordInput.fill(validUserData.password);
    await submitButton.click();
    await expect(pageTitle).toBeVisible();
    await expect(pageTitle).toContainText("Registration Details");
  });
});
