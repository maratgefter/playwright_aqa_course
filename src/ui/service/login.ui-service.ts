import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentials.types";
import { HomePage } from "ui/pages/home.page";
import { SignInPage } from "ui/pages/signin.page";

export class LoginUIService {
  homePage: HomePage;
  signInPage: SignInPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.signInPage = new SignInPage(page);
  }

  async loginAsAdmin() {
    return await this.login(credentials);
  }

  async login(credentials: ICredentials) {
    await this.signInPage.open();
    await this.signInPage.fillCredentials(credentials);
    await this.signInPage.clickOnLoginButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}
