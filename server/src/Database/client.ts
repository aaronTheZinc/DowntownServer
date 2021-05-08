import { User } from "../entity/user";
import type { Client, DatabaseAction, AppendShop } from "../models";
import { shopExist } from "./shop";
import { Connection, getRepository } from "typeorm";
import { createStripeUser } from "./operations";
import { v4 as createUid } from "uuid";

// Insert New User
const createUser = async (
  connection: Connection,
  data: Client
): Promise<DatabaseAction> => {
  const client = new User();
  const { connect, customer } = await createStripeUser(data);
  const uid = createUid();
  client.id = uid;
  client.email = data.email;
  client.authId = data.authId;
  client.firstName = data.firstName;
  client.lastName = data.lastName;
  client.shop = data.shop;
  client.purchased = new Array();
  client.bookMarked = new Array();
  client.stripe = data.stripe;
  client.address = data.address;
  client.stripe = { stripe_connect: connect, stripe_cus: customer };

  const savedStatus = (await connection.manager
    .save(client)
    .then((client) => {
      return { didSucceed: false, data: client.id } as DatabaseAction;
    })
    .catch((err) => {
      return { error: err, didSucceed: false } as DatabaseAction;
    })) as DatabaseAction;

  return savedStatus;
};

// Pull Client Record

const fetchClient = async (uid: string): Promise<DatabaseAction> => {
  const userRepo = getRepository(User);

  const user = await userRepo
    .findOne({ where: { id: uid } })
    .then((user) =>
      user
        ? ({
            data: user,
            didSucceed: true,
          } as DatabaseAction)
        : ({ error: "Account Not Found", didSucceed: false } as DatabaseAction)
    )
    .catch((err) => {
      return {
        error: err,
        didSucceed: false,
      } as DatabaseAction;
    });

  return user;
};
const mapAuthId = async (authId: string): Promise<string> => {
  const userRepo = getRepository(User);
  const user = await userRepo
    .findOne({ where: { authId: authId } })
    .then((user) => {
      return {
        data: user,
        didSucceed: true,
      } as DatabaseAction;
    })
    .catch((err) => {
      return {
        error: err,
        didSucceed: false,
      } as DatabaseAction;
    });
  return user.data?.id!;
};

// Binds Shop To Client
const bindShopToClient = async (
  authId: string,
  shopName: string
): Promise<DatabaseAction> => {
  const uuid = await mapAuthId(authId);
  const shopIsValid = await shopExist(shopName);
  if (shopIsValid) {
  }
  const client = await fetchClient(uuid);
  return {
    data: {},
    didSucceed: true,
  };
};
export { createUser, fetchClient, mapAuthId, bindShopToClient };
