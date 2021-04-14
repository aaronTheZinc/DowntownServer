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
  firstName: string;
  lastName: string;
  shop: string;
  purchased: Array<Product>;
  bookedMarked: Array<String>;
  address: Address;
}

export interface Product {
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
  connection?: Connection
}

export { DataInsertion, DatabaseConnection };
