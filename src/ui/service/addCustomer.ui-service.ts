import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import _ from "lodash";
import { AddCustomerPage, CustomersListPage } from "ui/pages/customers";

export class AddCustomerUIService {
  customersListPage: CustomersListPage;
  addCustomerPage: AddCustomerPage;

  constructor(private page: Page) {
    this.addCustomerPage = new AddCustomerPage(page);
    this.customersListPage = new CustomersListPage(page);
  }

  async open() {
    await this.addCustomerPage.open("customers/add");
    await this.addCustomerPage.waitForOpened();
  }

  async create(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addCustomerPage.fillForm(data);
    const response = await this.addCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addCustomerPage.clickSave.bind(this.addCustomerPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, "_id", "createdOn")).toEqual(data);

    await this.customersListPage.waitForOpened();
    return response.body.Customer;
  }
}
