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

import test from "playwright/test";

test.describe("[https://the-internet.herokuapp.com] [Dynamic Controls]", () => {
  test("Dynamic controls page validation", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const dynamicControlsLink = page.locator("//a[@href='/dynamic_controls']");
    const removeButton = page.locator("#checkbox-example > button");

    await page.goto(url);
    await dynamicControlsLink.click();
    await removeButton.waitFor({ state: "visible" });
  });
});
