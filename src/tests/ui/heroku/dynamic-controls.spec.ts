/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import test, { expect } from "playwright/test";

test.describe("[https://the-internet.herokuapp.com] [Dynamic Controls]", () => {
  test("Dynamic controls page validation", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const dynamicControlsLink = page.getByRole("link", { name: "Dynamic Controls" });
    const removeButton = page.getByRole("button", { name: "Remove" });
    const dynamicControlsHeading = page.getByRole("heading", { name: "Dynamic Controls" });
    const headingAdditionalText = page.locator("div.example > p");
    const checkboxWithoutId = page.locator("div#checkbox input");
    const checkboxWithId = page.locator("#checkbox");
    const loader = page.locator("#loading");
    const addButton = page.getByRole("button", { name: "Add" });
    const message = page.locator("#message");

    await page.goto(url);
    await dynamicControlsLink.click();
    await removeButton.waitFor({ state: "visible" });
    await expect(dynamicControlsHeading).toBeVisible();
    await expect(headingAdditionalText).toHaveText(
      "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously."
    );
    await checkboxWithoutId.check();
    await removeButton.click();
    await expect(loader).toBeVisible();
    await expect(loader).toBeHidden();
    await expect(checkboxWithoutId).toBeHidden();
    await addButton.waitFor({ state: "visible" });
    await expect(message).toBeVisible();
    await expect(message).toHaveText("It's gone!");
    await addButton.click();
    await expect(checkboxWithId).toBeVisible();
    await expect(message).toBeVisible();
    await expect(message).toHaveText("It's back!");
  });
});
