import express, { Application, Request, Response, Router } from "express";
import { createShop, getOneShop } from "../Actions/shop";
import Database from "../Database/connect";
import { generateShopFeed } from "../Database/shop";
import { authenticatedByAuthId } from "./middleware";

const router = Router();
router.use((req, res, next) => authenticatedByAuthId(req, res, next));
router.use(express.json())

/**
 * Initial Route
 */
router.get("/", (req: Request, res: Response) => res.send("Shop Route"));

/**
 * Get Singular Shop
 * @returns one shop
 */
router.get("/one_shop", async (req: Request, res: Response) => {
  const { shopId } = req.query;

  !shopId ? res.json({ error: "Requires Shop Id!" }) : null;
  const shop = await getOneShop(shopId as string);
  res.json({
    shop: shop,
  });
});
/**
 * Creates a shop
 * @returns Id of shop
 */
router.post("/create_shop", async (req: Request, res: Response) => {
    const { databaseConnection: {connection} } = Database
    const { data:{shop} } = req.body
    const { authId } = req.query 
    const result = await createShop(shop, authId as string, connection)
  res.json(result);
});

router.get('/feed', async(req: Request, res: Response) => {
   const feed = await generateShopFeed();

   res.json(feed)

})

export default router;
