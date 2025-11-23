import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Products]", async () => {
  let id = "";
  let token = "";

  test("Update new product with services", async ({
    loginUIService,
    productsApiService,
    productsListPage,
    productsListUIService,
    updateProductUIService
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await productsListUIService.open();
    await productsListUIService.clickEdit(createdProduct.name);
    const updatedProduct = await updateProductUIService.update();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
    await expect(productsListPage.tableRowByName(updatedProduct.name)).toBeVisible();
    await productsListUIService.openDetailsModal(updatedProduct.name);
    const actual = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsData(actual, updatedProduct);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});
