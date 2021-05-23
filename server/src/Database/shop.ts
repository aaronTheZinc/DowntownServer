import { Connection, getRepository } from "typeorm";
import { Shop } from "../entity/shop";
import { DatabaseAction } from "../models/responseTypes";
import { Shop as shop } from "../models";
import { Shop as ShopType } from "../models";
import { v4 as generateUUID } from 'uuid'
import { bindShopToClient } from './client'

import Database from "./connect";
import { ShopFeed, ShopLite } from "../models/core";

/**
 * 
 * @param shop 
 * @param authId 
 * @param connection 
 * @returns Id
 */
const createShop = async (
  shop: ShopType,
  authId: string,
  connection: Connection
): Promise<DatabaseAction> => {

  const createdShop = new Shop();
    createdShop.id = generateUUID()
    createdShop.title = shop.title
    createdShop.profileImageUrl = shop.profileImageUrl
    createdShop.products = new Array();
    createdShop.orders = new Array();
    createdShop.availableBal = 1
    createdShop.shop_owner = authId

  const creationResult = await connection.manager
    .save(createdShop)
    .then(async(shop) => {
      if(shop.id) {
        await bindShopToClient(authId,shop.id);
        return { data: shop.id, didSucceed: true } as DatabaseAction;
      } else {
         throw new Error('Shop did not create...')
      }
    })
    .catch((err) => {
      return { error: err, didSucceed: false } as DatabaseAction;
    });

  return creationResult;
};
/**
 * Adds product to shop
 * @param id 
 * @param product 
 * @param connection 
 * @returns 
 */
const appendProductToShop = async (
  id: string,
  product: string,
  connection: Connection
): Promise<DatabaseAction> => {
  try {
    const result = await getRepository(Shop).findOne({ where: { id: id } });
    let updatedProductList = result!.products;
    updatedProductList.push("");
    const updatedShop = {
      id: result?.id,
      title: result?.title,
      profileImageUrl: result?.profileImageUrl,
      products: updatedProductList,
      shop_owner: result?.shop_owner,
    } as shop;

    const update = await connection
      .createQueryBuilder()
      .update(Shop)
      .set(updatedShop)
      .where(`id = ${id}`, { id: id })
      .execute();
    return {
      data: update.raw,
      didSucceed: true,
    } as DatabaseAction;
  } catch (e) {
    return {
      didSucceed: false,
      error: e,
    } as DatabaseAction;
  }
};

/**
 * Get Single Shop
 * @param id 
 * @returns Shop
 */
const getOneShop = async (id: string): Promise<any> => {
  const shopRepo = getRepository(Shop);
  const result = await shopRepo
    .findOne({ where: { id: id } })
    .then((user) => user as ShopType)
    .catch((err) => err);

  return result;
};

const shopExist = async (id: string): Promise<boolean> => {
  const shopRepo = getRepository(Shop);
  const shopExist = await shopRepo
    .findOne({ where: { id: id } })
    .then((user) => (user ? true : false));

  return shopExist;
};
const generateShopFeed = async(): Promise<ShopFeed> => {
  const ShopFeedResult = await Shop.getRepository()
    .createQueryBuilder()
    .select("Shop")
    .orderBy("RANDOM()")
    .limit(150)
    .getMany() as shop[];

   const ShopFeed: ShopLite[] = ShopFeedResult.map(({title, profileImageUrl}) => ({
      title,
      profileImageUrl
    }))

    return {
      feed: ShopFeed,
      authored: Date.now()
    }
}
export { appendProductToShop, shopExist, getOneShop, shop, createShop, generateShopFeed };
