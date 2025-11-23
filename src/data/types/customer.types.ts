import { ID, IResponseFields } from "./core.types";
import { COUNTRIES } from "data/salesPortal/customers/countries";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export type CustomersTableHeader = "Email" | "Name" | "Country" | "Created On";

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}
