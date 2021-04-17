import { Connection, getRepository } from "typeorm";
import { Product } from "../entity/product";
import { Product as product } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { DataInsertion } from "../models/responseTypes";

const createProduct = async (
  product: product,
  connection: Connection
): Promise<DataInsertion> => {
  try {
  
    const createdProducted = new Product();

    createdProducted.id = uuidv4();
    createdProducted.title = product.title
    createdProducted.price = product.price
    createdProducted.description = product.description
    createdProducted.images = product.images

    const creationResult = await connection.manager
      .save(product)
      .then((product) => product);

    return {
      didSucceed: true,
      data: creationResult.id,
    };
  } catch (error) {
    return {
      didSucceed: false,
      error: error,
    };
  }
};

export { createProduct };
