import { Router, Request, Response } from "express";
import { createProduct } from "../Database/product";
import Database from "../Database/connect";
import { Product } from "../entity/product";
import path from "path";

const { connection, isConnect } = Database.databaseConnection;

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("Products");
});

router.post("/create_product", (req: Request, res: Response) => {
  const { uid } = req.query;
  const { product } = req.body;
  if (isConnect) {
    createProduct(product!, String(uid), connection);
  }
});

export default router;
