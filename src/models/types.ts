import { DataInsertion, DatabaseConnection } from "./responseTypes";
import { Countries } from "./enums";
import {Connection} from 'typeorm'
export interface Address {
  street: string;
  city: string;
  state: string;
  country: Countries;
  zip: string
}

export interface Client {
  id: string,
  firstName: string;
  lastName: string;
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

export interface Product {
  id?: string
  title: string;
  price: string;
  description: string;
  images: Array<string>;
  shop: string;
}

// Under the hood

export interface DatabaseConnectionStatus {
  isConnect: boolean;
  timeStarted: number;
  err?: any;
  connection?: any
}

export { DataInsertion, DatabaseConnection };
