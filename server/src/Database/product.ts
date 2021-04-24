import { Connection, createQueryBuilder, getRepository } from "typeorm";
import { Product } from "../entity/product";
import { Product as product, ProductFeed } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { DatabaseAction } from "../models/responseTypes";

const createProduct = async (
  product: product,
  uid: string,
  connection: Connection
): Promise<DatabaseAction> => {
  console.log("meme");
  const createdProducted = new Product();

  createdProducted.id = uuidv4();
  createdProducted.title = product.title;
  createdProducted.price = product.price;
  createdProducted.thumbnail = product.thumbnail;
  createdProducted.description = product.description;
  createdProducted.images = product.images;
  createdProducted.shop = product.shop;

  const creationResult = await connection.manager
    .save(createdProducted)
    .then((product) => {
      return { data: product, didSucceed: true } as DatabaseAction;
    })
    .catch((err) => {
      return { error: err, didSucceed: false } as DatabaseAction;
    });

  console.log(creationResult);

  return creationResult;
};

// Fetch General Results Of Products

const generateFeed = async (): Promise<ProductFeed> => {
  console.log("Called!");
  let products = (await Product.getRepository()
    .createQueryBuilder()
    .select("Product")
    .orderBy("RANDOM()")
    .limit(150)
    .getMany()) as product[];

  let feed = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      shop: product.thumbnail,
    };
  });

  const ProductFeed = {
    authored: Date.now(),
    feed: feed,
  } as ProductFeed;

  return ProductFeed;
};

// Get Specific Product

const getOneProduct = async (product: string): Promise<DatabaseAction> => {
  const userRepo = getRepository(Product);

  const user = await userRepo
    .findOne({ where: { id: product } })
    .then((product) => {
      return { didSucceed: true, data: product as product } as DatabaseAction;
    })
    .catch((err) => {
      return { error: err, didSucceed: false } as DatabaseAction;
    });

  return user;
};
export { createProduct, generateFeed, getOneProduct };
