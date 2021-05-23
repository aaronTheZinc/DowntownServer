import {
    DatabaseAction,
    DatabaseConnection,
    StripeClient,
  } from "./responseTypes";
  import { Countries } from "./enums";  // Address Schema
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
    purchased?: Array<string>;
    bookMarked?: Array<string>;
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
  
  // Orders
  export interface Order {
    transaction: string
    product: string
    customer: string
    address: {
      street: string;
      city: string;
      state: string;
      country: Countries;
      zip: string;
    };
  }
  export interface ShopLite {
    title: string
    profileImageUrl: string
  }
  
  // Interactives
  export interface ProductFeed {
    authored: number;
    feed: ProductLite[];
  }
  export interface ShopFeed {
    authored: number
    feed: ShopLite[]
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
  