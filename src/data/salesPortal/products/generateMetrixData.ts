import { faker } from "@faker-js/faker";
import { IMetrics, IMetricsResponse } from "data/types/metrics.types";

export function generateOrdersData(params?: Partial<IMetrics["orders"]>): IMetrics["orders"] {
  return {
    totalRevenue: faker.number.int({ min: 1000, max: 100000 }),
    totalOrders: faker.number.int({ min: 1, max: 1000 }),
    averageOrderValue: faker.number.int({ min: 100, max: 10000 }),
    totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
    recentOrders: [],
    ordersCountPerDay: [],
    ...params
  };
}

export function generateCustomersData(params?: Partial<IMetrics["customers"]>): IMetrics["customers"] {
  return {
    totalNewCustomers: faker.number.int({ min: 1, max: 500 }),
    topCustomers: [],
    customerGrowth: [],
    ...params
  };
}

export function generateProductsData(params?: Partial<IMetrics["products"]>): IMetrics["products"] {
  return {
    topProducts: [],
    ...params
  };
}

export function generateMetricsResponseData(params?: Partial<IMetrics>): IMetricsResponse {
  return {
    Metrics: {
      orders: generateOrdersData(params?.orders),
      customers: generateCustomersData(params?.customers),
      products: generateProductsData(params?.products),
      ...params
    },
    IsSuccess: true,
    ErrorMessage: null
  };
}
