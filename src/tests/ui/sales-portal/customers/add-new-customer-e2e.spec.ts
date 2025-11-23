import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers]", () => {
  let id = "";
  let token = "";

  test("Add new customer", async ({
    loginUIService,
    customersListPage,
    customersListUIService,
    addCustomerUIService
  }) => {
    token = await loginUIService.loginAsAdmin();
    await customersListUIService.open();
    await customersListUIService.openAddCustomerPage();
    const createdCustomer = await addCustomerUIService.create();
    id = createdCustomer._id;
    await customersListUIService.open();
    await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect(customersListPage.tableRowByName(createdCustomer.name)).toBeVisible();
  });

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
});
