import { Locator } from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

export type HomeModuleButton = "Products" | "Customers" | "Orders";

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator(".welcome-text");
  readonly productsButton = this.page.locator("#products-from-home");
  readonly customersButton = this.page.locator("#customers-from-home");
  readonly ordersButton = this.page.locator("#orders-from-home");
  readonly uniqueElement = this.welcomeText;
  readonly totalOrdersCount = this.page.locator("#total-orders-container div p");
  readonly newCustomersCount = this.page.locator("#total-customers-container div p");
  readonly cancelledOrdersCount = this.page.locator("#canceled-orders-container div p");
  readonly totalRevenueSum = this.page.locator("#total-revenue-container div p");
  readonly avgOrderValue = this.page.locator("#avg-orders-value-container div p");

  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton
    };

    await moduleButtons[module].click();
  }
}
