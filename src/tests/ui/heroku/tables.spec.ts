/*
Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
*/

import test, { expect, Page } from "@playwright/test";

test.describe("[https://the-internet.herokuapp.com/tables] [Tables]", () => {
  interface ITableRow {
    "Last Name": string;
    "First Name": string;
    Email: string;
    Due: string;
    "Web Site": string;
  }

  const expectedTable: ITableRow[] = [
    {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com"
    },
    {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com"
    },
    {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com"
    },
    {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com"
    }
  ];

  test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/tables";
    const title = page.locator("h3");
    await page.goto(url);
    await expect(title).toBeVisible();
  });

  async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
    const row = page.getByRole("row").filter({ hasText: email });
    const headers = page.locator("#table2 thead tr th");
    const cells = row.locator("td");

    const headerCount = await headers.count();
    const result: Record<string, string> = {};

    for (let i = 0; i < headerCount - 1; i++) {
      const key = (await headers.nth(i).textContent())?.trim() || `Column ${i}`;
      const value = (await cells.nth(i).textContent())?.trim() || "";
      result[key] = value;
    }

    return result;
  }

  for (let i = 0; i < expectedTable.length; i++) {
    test(`Check function getTableRow() with ${expectedTable[i]?.Email}`, async ({ page }) => {
      const rowFromPage = await getTableRow(page, `${expectedTable[i]?.Email}`);
      expect(rowFromPage).toEqual(expectedTable[i]);
    });
  }
});
