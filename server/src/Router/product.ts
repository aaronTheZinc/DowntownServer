import express, { Router, Request, Response, NextFunction } from "express";
import { createProduct, generateFeed } from "../Database/product";
import { createFeed } from "../Actions/products";
import Database from "../Database/connect";
import {} from "../Actions/products";
import { Product } from "../entity/product";
import path from "path";
import { isConnected } from "./middleware/middlewares";

const { connection, isConnect } = Database.databaseConnection;

const router = Router();
router.use((req: Request, res: Response, next: NextFunction) =>
  isConnected(req, res, next)
);
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  res.send("Products");
});

router.post("/create_product", (req: Request, res: Response) => {
  const { databaseConnection } = Database;
  try {
    console.log(isConnect);
    const { uid } = req.query;
    const { product } = req.body;
    console.log(product);
    console.log(isConnect);
    createProduct(product!, String(uid), databaseConnection.connection);
  } catch (e) {
    console.error(e);
    res.json({
      error: "An Error Occured",
      message: e,
    });
  }
});

router.get("/feed", async (req: Request, res: Response) => {
  const { databaseConnection } = Database;
  try {
    if (databaseConnection.isConnect) {
      const feed = await generateFeed();
      res.json(feed);
    } else {
      console.log('error')
    }
  } catch (e) {
    console.error(e);
    res.json({
      error: "An Error Occured",
      message: e,
    });
  }
});

export default router;
