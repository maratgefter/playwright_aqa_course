import { expect, test } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";
import _ from "lodash";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

test.describe(
  "[Sales Portal] [Products]",
  {
    tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.VISUAL_REGRESSION]
  },
  () => {
    test("Table parsing", async ({ page, productsListUIService }) => {
      const productsListPage = new ProductsListPage(page);
      const addNewProductPage = new AddNewProductPage(page);

      await productsListUIService.open();
      await productsListPage.clickAddNewProduct();
      await addNewProductPage.waitForOpened();
      const productData = generateProductData();
      await addNewProductPage.fillForm(productData);
      await addNewProductPage.clickSave();
      await productsListPage.waitForOpened();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

      await expect.soft(productsListPage.nameCell(productData.name)).toHaveText(productData.name);
      await expect.soft(productsListPage.priceCell(productData.name)).toHaveText(`$${productData.price.toString()}`);
      await expect.soft(productsListPage.manufacturerCell(productData.name)).toHaveText(productData.manufacturer);
      // await expect.soft(productsListPage.createdOnCell(productData.name)).toHaveText("");

      const productFromTable = await productsListPage.getProductData(productData.name);
      const expectedProduct = _.omit(productData, ["notes", "amount"]);
      const actualProduct = _.omit(productFromTable, ["createdOn"]);
      expect(actualProduct).toEqual(expectedProduct);

      const tableData = await productsListPage.getTableData();
      console.log(tableData);
    });
  }
);
