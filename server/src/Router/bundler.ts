import express, { Router, Request, Response } from "express";
import { Product } from "../entity/product";
import Client from "./client";
import Products from "./product";
import Cart from './cart'
import Shop from './shop'

const router = Router();

router.use("/client", Client);
router.use("/products", Products);
router.use('/cart', Cart )
router.use('/shop', Shop)
router.get("/", (req: Request, res: Response) => {
  res.send(
    "<body style='background-color: black'> <h1 style='color:white'> Welcome To Downtown! </h1> </body>"
  );
});

export default router;
