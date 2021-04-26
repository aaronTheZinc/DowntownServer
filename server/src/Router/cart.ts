import express, { Router, Request, Response, NextFunction } from "express";
import { In } from "typeorm";
import { DatabaseConfig } from "../Config/config";
import Database from "../Database/connect";
import { isConnected } from "./middleware/middlewares";
import { resolveCart } from "../Actions/order";

const router = Router();
router.use(express.json());
router.use((req: Request, res: Response, next: NextFunction) =>
  isConnected(req, res, next)
);

router.get("/get_cart", async (req: Request, res: Response) => {
  const {
    databaseConnection: { isConnect, connection },
  } = Database;
  const { uid } = req.query;

  !uid ? res.json({ error: "Must Include Uid." }).status(500).end() : null;

  try {
    if (isConnect) {
      const clientCart = await resolveCart(uid as string);
      console.log(clientCart)
      res.json({ data: clientCart }).status(201);
    } else {
      res.json({
        error: "An error occured",
        message: "Database Connection Failed... Please Retry",
      });
    }
  } catch (e) {
    return res.json({
      error: "An Error Occured!",
      message: 'E',
    });
  }
});

router.get('/', (req: Request, res: Response) => {
    res.json('Cart Route....')
})

export default router;
