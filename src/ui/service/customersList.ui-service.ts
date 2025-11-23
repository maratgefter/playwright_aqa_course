import { expect, Page } from "@playwright/test";
import { IProductDetails } from "data/types/product.types";
import _ from "lodash";
import { AddCustomerPage, CustomersListPage } from "ui/pages/customers";
import { convertToFullDateAndTime } from "utils/date.utils";

export class CustomersListUIService {
  customersListPage: CustomersListPage;
  addCustomerPage: AddCustomerPage;

  constructor(private page: Page) {
    this.customersListPage = new CustomersListPage(page);
    this.addCustomerPage = new AddCustomerPage(page);
  }

  async openAddCustomerPage() {
    await this.customersListPage.clickAddNewCustomer();
    await this.addCustomerPage.waitForOpened();
  }

  async openDeleteModal(productName: string) {
    await this.customersListPage.clickAction(productName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
  }

  async deleteProduct(productName: string) {
    await this.customersListPage.clickAction(productName, "delete");
    await this.customersListPage.deleteModal.waitForOpened();
    await this.customersListPage.deleteModal.clickConfirm();
    await this.customersListPage.deleteModal.waitForClosed();
  }

  async search(text: string) {
    await this.customersListPage.fillSearchInput(text);
    await this.customersListPage.clickSearch();
    await this.customersListPage.waitForOpened();
  }

  async open() {
    await this.customersListPage.open("customers");
    await this.customersListPage.waitForOpened();
  }

  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn)
    });
  }

  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(this.customersListPage.tableRowByName(productName)).toBeVisible({ visible });
  }
}
