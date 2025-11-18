import { IDate, IResponseFields } from "./core.types";
import { ITopProduct } from "./product.types";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrders;
  customers: ICustomers;
  products: IProductMetricsData;
}

//TODO: describe orders correctly after add interfaces for them
export interface IOrders {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any;
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface IOrdersCountPerDay {
  count: number;
  date: IDate;
}

export interface ICustomers {
  totalNewCustomers: number;
  customerGrowth: ICustomersGrowth[];
  topCustomers: ITopCustomers[];
}

export interface ITopCustomers {
  _id: string;
  totalSpent: number;
  ordersCount: number;
  customerName: string;
  customerEmail: string;
}

export interface ICustomersGrowth {
  count: number;
  date: IDate;
}

export interface IProductMetricsData {
  topProducts: ITopProduct[];
}
