import { DatabaseAction, DatabaseConnection } from "../models/responseTypes";
import { fetchClient } from "./client";
import { Client, Order } from "../models/types";
import { getManyProducts } from "../Database/product";
import { createOrder as CreateOrder } from "../Database/order";
import { Connection } from "typeorm";

// Purchase Everything in Shgopping Cart
const resolveCart = async (uid: string): Promise<DatabaseAction> => {
  const user = await fetchClient(uid);
  const { data, didSucceed, error } = user;
  if (didSucceed) {
    const { bookMarked } = data as Client;
    console.log('@@@@@@@@@@@@@',bookMarked)
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

const createOrder = async (
  connection: Connection,
  order: Order
) => {}

export { resolveCart, createOrder };
