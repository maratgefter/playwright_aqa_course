import { ProductsTableHeader } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { ConfirmationModal } from "../confirmation.modal";
import { ICustomerInTable } from "data/types/customer.types";
import { COUNTRIES } from "data/salesPortal/customers/countries";

export class CustomersListPage extends SalesPortalPage {
  readonly deleteModal = new ConfirmationModal(this.page);

  readonly customersPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByName = (customerName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: customerName }) });
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly nameCell = (customerName: string) => this.tableRowByName(customerName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  readonly createdOnCell = (nameOrIndex: string | number) =>
    typeof nameOrIndex === "string"
      ? this.tableRowByName(nameOrIndex).locator("td").nth(3)
      : this.tableRowByIndex(nameOrIndex).locator("td").nth(3);
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: ProductsTableHeader) => this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (name: ProductsTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-products");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(customerName: string): Promise<ICustomerInTable> {
    const [email, name, country, createdOn] = await this.tableRowByName(customerName).locator("td").allInnerTexts();
    return {
      email: email!,
      name: name!,
      country: country! as COUNTRIES,
      createdOn: createdOn!
    };
  }

  async getTableData(): Promise<ICustomerInTable[]> {
    const data: ICustomerInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        email: email!,
        name: name!,
        country: country! as COUNTRIES,
        createdOn: createdOn!
      });
    }
    return data;
  }

  async clickAction(productName: string, button: "edit" | "delete" | "details") {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}
