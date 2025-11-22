import { test, expect } from "fixtures/business.fixture";
import { generateMetricsResponseData } from "data/salesPortal/products/generateMetrixData";
import numeral from "numeral";

test.describe("[Integration] [Sales Portal] [Home] [Metrix]", () => {
  const expectedProductResponse = generateMetricsResponseData();

  test.beforeEach(async ({ loginAsAdmin, mock }) => {
    await mock.metrixOnHomePage(expectedProductResponse);

    await loginAsAdmin();
  });

  test("Orders This Year", async ({ homePage }) => {
    expect(homePage.totalOrdersCount).toHaveText(expectedProductResponse.Metrics.orders.totalOrders.toString());
  });

  test("New Customers", async ({ homePage }) => {
    expect(homePage.newCustomersCount).toHaveText(
      expectedProductResponse.Metrics.customers.totalNewCustomers.toString()
    );
  });

  test("Cancelled Orders", async ({ homePage }) => {
    expect(homePage.newCustomersCount).toHaveText(
      expectedProductResponse.Metrics.customers.totalNewCustomers.toString()
    );
  });

  test("Total Revenue", async ({ homePage }) => {
    expect(homePage.totalRevenueSum).toHaveText(
      numeral(expectedProductResponse.Metrics.orders.totalRevenue).format("$0.0a")
    );
  });

  //numeral(value).format("$0.0a");

  test("Avg Order Value", async ({ homePage }) => {
    expect(homePage.avgOrderValue).toHaveText(
      numeral(expectedProductResponse.Metrics.orders.averageOrderValue).format("$0.0a")
    );
  });
});
