import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Customers]", () => {
  let id = "";
  let token = "";

  test(
    "Add new customer",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ customersListPage, customersListUIService, addCustomerUIService }) => {
      token = await customersListPage.getAuthToken();
      await customersListUIService.open();
      await customersListUIService.openAddCustomerPage();
      const createdCustomer = await addCustomerUIService.create();
      id = createdCustomer._id;
      await customersListUIService.open();
      await expect(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
      await expect(customersListPage.tableRowByName(createdCustomer.name)).toBeVisible();
    }
  );

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });
});
