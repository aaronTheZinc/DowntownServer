import {
  BasicResponse,
  DatabaseAction,
  DatabaseConnection,
} from "../models/responseTypes";
import { fetchClient, mapAuthId } from "./client";
import { Client, Order, ProductLite, Cart } from "../models";
import { getManyProducts } from "../Database/product";
import { createOrder as CreateOrder } from "../Database/order";
import { Connection } from "typeorm";
import { Product } from "../entity/product";

// Purchase Everything in Shgopping Cart
const resolveCart = async (authId: string): Promise<DatabaseAction> => {
  const uid = await mapAuthId(authId);
  const user = await fetchClient(uid);
  const { data, didSucceed, error } = user;
  if (didSucceed) {
    const { bookMarked } = data as Client;
    if (bookMarked!.length > 0) {
      const List = await getManyProducts(bookMarked!);
      return {
        didSucceed: true,
        data: List,
      } as DatabaseAction;
    } else {
      return {
        error: "No Products To Be Purchased",
        didSucceed: false,
      } as DatabaseAction;
    }
  } else {
    return error;
  }
};


/**
 * Generate Feed For All Client Bookmarks 
 * @param authId 
 * @returns Basic Response
 */
const createCartSession = async (authId: string): Promise<BasicResponse> => {
  const { data, error } = await fetchClient(authId);
  const { bookMarked } = data as Client;

  if (!error && bookMarked?.length! >= 1) {
    let totalCost: number = 0.00;
    const { data: allMarkedProductsQuery } = await getManyProducts(bookMarked!);
    const products: ProductLite[] = allMarkedProductsQuery;

    //Calculate Total Cost
    products.forEach(({price}) => {
      totalCost += Number(Number(price).toFixed(2))
    })
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });


    const cartObj: Cart = {
      totalSavedCount: bookMarked?.length!,
      products: products,
      totalCost: formatter.format(totalCost)
    };

    return {
      data: cartObj,
      didSucceed: true,
    };
  } else {
    return {
      data: "No Bookmarked",
      didSucceed: true,
    };
  }
};

const createOrder = async (connection: Connection, order: Order) => {};

export { resolveCart, createOrder, createCartSession };
