import {
  DatabaseAction,
  DatabaseConnection,
  StripeClient,
} from "./responseTypes";
import { Countries } from "./enums";
import { Connection } from "typeorm";
// Address Schema
export interface Address {
  street: string;
  city: string;
  state: string;
  country: Countries;
  zip: string;
}
// Client Schema
export interface Client {
  id: string;
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
  shop: string;
  purchased: Array<string>;
  bookedMarked?: Array<String>;
  stripe: {
    stripe_connect: string;
    stripe_cus: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: Countries;
    zip: string;
  };
}
// Shop
export interface Shop {
  title: string;
  profileImageUrl: string;
  shop_owner: string;
  products: string[];
}

// Product Schema
export interface Product {
  id?: string;
  title: string;
  price: string;
  thumbnail: string
  description: string;
  images: Array<string>;
  shop: string;
}
// Light Weight Cell Data

export interface ProductLite {
  id: string
  title: string
  price: string
  thumbnail: string
  shop: string
}

// Interactives
export interface ProductFeed {
  authored: number;
  feed: ProductLite[];
}

// Under the hood
// Database Connection Schema
export interface DatabaseConnectionStatus {
  isConnect: boolean;
  timeStarted: number;
  err?: any;
  connection?: any;
}

// Product Feed

export { DatabaseAction, DatabaseConnection, StripeClient };
