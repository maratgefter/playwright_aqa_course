import { ICredentials } from "data/types/credentials.types";

export const SALES_PORTAL_URL = process.env.SALES_PORTAL_URL!;
export const adminCredentials: ICredentials = {
  username: process.env.ADMIN_NAME!,
  password: process.env.ADMIN_PASSWORD!
};
export const userCredentials: ICredentials = {
  username: process.env.USER_NAME!,
  password: process.env.USER_PASSWORD!
};
