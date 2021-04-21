import { Connection, getRepository } from "typeorm";
import { Shop } from "../entity/shop";
import { DataInsertion } from "../models/responseTypes";
import { Shop as shop } from "../models/types";

const appendProductToShop = async (
  id: string,
  product: string,
  connection: Connection
): Promise<DataInsertion> => {
  try {
    const result = await getRepository(Shop).findOne({ where: { id: id } });
    let updatedProductList = result!.products
    updatedProductList.push('')
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
    } as DataInsertion;
  } catch (e) {
    return {
        didSucceed: false,
        error: e
    } as DataInsertion;
  }
};

export { appendProductToShop };
