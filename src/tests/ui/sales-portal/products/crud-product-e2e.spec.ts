import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products]", async () => {
  test(
    "crud product e2e",
    {
      tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
    },
    async ({ productsListUIService, productsListPage, addNewProductPage }) => {
      const productData = generateProductData();

      await productsListUIService.open();
      await productsListPage.clickAddNewProduct();
      await addNewProductPage.waitForOpened();
      await addNewProductPage.fillForm(productData);
      await addNewProductPage.clickSave();
      await productsListPage.waitForOpened();
      expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED);
      await productsListPage.closeToastMessage();
      await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
      const productFromTable = await productsListPage.getProductData(productData.name);
      const expectedProduct = _.omit(productData, ["notes", "amount"]);
      const actualProduct = _.omit(productFromTable, ["createdOn"]);
      expect(actualProduct).toEqual(expectedProduct);
      await productsListPage.clickAction(productData.name, "delete");
      const { deleteModal } = productsListPage;
      await deleteModal.waitForOpened();
      await deleteModal.clickConfirm();
      expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED);
      await productsListPage.closeToastMessage();
      await productsListPage.waitForOpened();
      await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
    }
  );
});
