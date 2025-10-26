import { IProductTableRow } from "data/types/products-table-row";
import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getProductTableRow(): Promise<IProductTableRow> {
    const firstRow = this.page.locator("table tbody tr").first();
    const cells = firstRow.locator("td");

    const name = (await cells.nth(0).textContent())!;
    const rawPrice = (await cells.nth(1).textContent())!;
    const manufacturer = (await cells.nth(2).textContent())!;

    return {
      name,
      price: `$${rawPrice.replace(/^\$/, "")}`,
      manufacturer
    };
  }
}
