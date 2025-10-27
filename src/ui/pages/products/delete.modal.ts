import { SalesPortalPage } from "../salesPortal.page";

export class ProductDeleteModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator(".modal-content");

  readonly title = this.uniqueElement.locator("h5");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly yesDeleteButton = this.uniqueElement.locator("button[type = submit]");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  async clickClose() {
    await this.closeButton.click();
  }

  async clickYesDeleteButton() {
    await this.cancelButton.click();
  }

  async clickEdit() {
    await this.yesDeleteButton.click();
  }
}
