import express, { Router, Request, Response, NextFunction } from "express";
import {
  createProduct,
  generateFeed,
  getOneProduct,
} from "../Database/product";
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

router.post("/create_product", async (req: Request, res: Response) => {
  const { databaseConnection } = Database;
  try {
    console.log(isConnect);
    const { uid } = req.query;
    const { product } = req.body;
    console.log(product);
    console.log(isConnect);
    const productInsertion = await createProduct(
      product!,
      String(uid),
      databaseConnection.connection
    );
    res.json(productInsertion);
  } catch (e) {
    console.error(e);
    res.json({
      error: "An Error Occured",
      message: e,
    });
  }
});

//Pulls Product From Database

router.get("/get_one", async (req: Request, res: Response) => {
  console.log('trieggered')
  const { databaseConnection } = Database;
  const { product: product_id } = req.query;

  !product_id
    ? res.json({ error: "Must Provide Product" }).status(500).end()
    : null;

  try {
    if (databaseConnection.isConnect) {
      const product = await getOneProduct(product_id as string);
      res
        .json({
          data: product.data,
        })
        .status(200);
    } else {
      res
        .json({
          error: "An Error Occured",
        })
        .status(550);
    }
  } catch (e) {
    res.json({
      error: " An Error Occured",
      message: e,
    });
  }
});

// Gets Clients Product Feed
router.get("/feed", async (req: Request, res: Response) => {
  const { databaseConnection } = Database;
  try {
    if (databaseConnection.isConnect) {
      const feed = await generateFeed();
      res.json(feed);
    } else {
      console.log("error");
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
