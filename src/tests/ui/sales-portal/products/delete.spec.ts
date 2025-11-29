import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { expect, test } from "fixtures/business.fixture";

test.describe("[Sales Portal] [Products]", () => {
  test(
    "Delete",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ productsListUIService, productsApiService, productsListPage, productsApi }) => {
      const token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.create(token);
      await productsListUIService.open();
      await productsListUIService.deleteProduct(createdProduct.name);
      const deleted = await productsApi.getById(createdProduct._id, token);
      expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();

      /*
    login => get token
    create product via api
    go to products list page
    open delete modal
    delete product
    verify deleted
    */
    }
  );
});
