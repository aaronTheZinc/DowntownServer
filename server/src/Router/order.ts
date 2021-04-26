import exrpess, { Request, Response, Router } from "express";
import { createOrder } from '../Actions/order'
import Database from "../Database/connect";
import { Order as order } from '../models/types'
import { Order } from "../entity/order";
import { argv } from "node:process";

const router = Router();

router.get("/get_order", (req: Request, res: Response) => {
  const { order: order_id } = req.query;
  !order_id ? res.json({ error: "Please provide order id" }) : null;

  const { databaseConnection } = Database;
  try {
    if (databaseConnection.connection) {
    } else {
      res.json({
        error: "An Error Occured",
        message: "Database Connection Error",
      });
    }
  } catch (e) {
    res.json({
      error: "An Error Occured",
      message: e,
    });
  }
});

router.post("/create_order", async(req: Request, res: Response) => {
  const { databaseConnection } = Database;
  const { data } = req.body

    !data? res.json({error: 'Please Include A Body'}): null

  try {
    if (databaseConnection.isConnect) {
      const createdOrder = await createOrder(databaseConnection.connection, data as order)

    }
  } catch (err) {
    res.json({
      error: "An Error Occured",
      message: err,
    });
  }
});
