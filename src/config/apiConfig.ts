import { SALES_PORTAL_URL } from "./env";

export const apiConfig = {
  baseURL: SALES_PORTAL_URL,
  endpoints: {
    products: "/api/products",
    productById: (id: string) => `/api/products/${id}/`,
    productsAll: "/api/products/all",
    login: "/api/login"
  }
};
