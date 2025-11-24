import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers]", () => {
  let id = "";
  let token = "";

  test("Add new customer", async ({ loginUIService, customersListPage, addCustomerUIService, homePage }) => {
    token = await loginUIService.loginAsAdmin();
    await homePage.clickOnViewModule("Customers");
    await customersListPage.clickAddNewCustomer();
    const createdCustomer = await addCustomerUIService.create();
    id = createdCustomer._id;
    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.tableRowByName(createdCustomer.name)).toBeVisible();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
});
