import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", async () => {
  test("crud product e2e", async ({ loginAsUser, homePage, productsListPage, addNewProductPage }) => {
    const productData = generateProductData();

    await loginAsUser();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    const productFromTable = await productsListPage.getProductData(productData.name);
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);
    await productsListPage.clickDeleteProduct(productData.name);
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();
    await deleteModal.clickYesDeleteButton();
    await productsListPage.waitForOpened();
    expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});
