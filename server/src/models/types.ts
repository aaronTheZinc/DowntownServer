import { DataInsertion, DatabaseConnection, StripeClient } from "./responseTypes";
import { Countries } from "./enums";
import {Connection} from 'typeorm'
// Address Schema
export interface Address {
  street: string;
  city: string;
  state: string;
  country: Countries;
  zip: string
}
// Client Schema
export interface Client {
  id: string,
  firstName: string;
  lastName: string;
  email: string
  shop: string;
  purchased: Array<string>;
  bookedMarked?: Array<String>;
  stripe: {
    stripe_connect: string
    stripe_cus: string
  }
  address: {
    street: string;
    city: string;
    state: string;
    country: Countries;
    zip: string
  }
}
// Product Schema
export interface Product {
  id?: string
  title: string;
  price: string;
  description: string;
  images: Array<string>;
  shop: string;
}

// Under the hood
// Database Connection Schema
export interface DatabaseConnectionStatus {
  isConnect: boolean;
  timeStarted: number;
  err?: any;
  connection?: any
}

export { DataInsertion, DatabaseConnection, StripeClient };
