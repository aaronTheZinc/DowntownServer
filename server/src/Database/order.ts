import { Connection, getRepository } from "typeorm";
import { Order } from "../entity/order";
import { Order as order } from "../models";
import { DatabaseAction } from "../models/responseTypes";
import { v4 as generateUid } from "uuid";

const createOrder = async (
  connection: Connection,
  order: order
): Promise<DatabaseAction> => {
  const createdOrder = new Order();

  createdOrder.id = generateUid();
  createdOrder.customer = order.customer;
  createdOrder.address = order.address;

  const result = await connection.manager
    .save(createdOrder)
    .then((order) => {
      return { didSucceed: true, data: order.id } as DatabaseAction;
    })
    .catch((err) => {
      return { didSucceed: false, error: err } as DatabaseAction;
    });

  return result;
};

const fetchOrder = async (orderId: string): Promise<DatabaseAction> => {
  const orderRepo = getRepository(Order);
  const order = orderRepo
    .findOne({ where: { id: orderId } })
    .then((order) => {
      return {
        data: order,
        didSucceed: true,
      } as DatabaseAction;
    })
    .catch((err) => {
      return {
        error: err,
        didSucceed: false,
      } as DatabaseAction;
    });

  return await order;
};

export { createOrder, fetchOrder };
