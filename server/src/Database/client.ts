import { User } from "../entity/user";
import type {
  Client,
  DatabaseAction,
  AppendShop,
  UserMutation,
} from "../models";
import { shopExist } from "./shop";
import { Connection, getRepository, getConnection } from "typeorm";
import { createStripeUser } from "./operations";
import { v4 as createUid } from "uuid";
import { runInNewContext } from "node:vm";

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
    .then((user) => {
      return {
        data: user,
        didSucceed: true,
      };
    })
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
  shopId: string
): Promise<DatabaseAction> => {
  const uuid = await mapAuthId(authId);
  const shopIsValid = await shopExist(shopId);
  const uid = await mapAuthId(authId)
  if (shopIsValid) {
    await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({ shop: shopId })
    .where("id = :id", { id: uid })
    .execute();
  }
  const client = await fetchClient(uuid);
  return {
  data: client,
    didSucceed: true,
  };
};

/*
!Mutates User BookMarks
? Can be used to update values in users book
*/
const bookMark = async (
  mutationData: UserMutation
): Promise<DatabaseAction> => {
  const { uid, entries } = mutationData;
  try {
    const { data } = await fetchClient(uid);
    let { bookMarked } = data as Client;
    bookMarked?.push(entries.value);

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ [entries.key]: bookMarked })
      .where("id = :id", { id: uid })
      .execute();
    return {
      didSucceed: true,
      data: "Mutation Success",
    };
  } catch (e) {
    return {
      didSucceed: false,
      error: e,
    };
  }
};
/**
 * ! Mutates Bookmarked With Above Func
 * ? Removes Bookmark
 * @param product
 * @param uid
 */
const removeBookmark = async (
  product: string,
  uid: string
): Promise<DatabaseAction> => {
  const { data } = await fetchClient(uid);
  const { bookMarked } = data as Client;
  const markedIndex = bookMarked?.indexOf(product);
  if (markedIndex === -1) {
    return {
      didSucceed: false,
      error: "Item Not Bookmarked!",
    };
  } else {
    bookMarked?.splice(markedIndex!);
    try {
      await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ 'bookMarked': bookMarked })
      .where("id = :id", { id: uid })
      .execute();
      return {
        didSucceed:true
      }
    } catch (e) {
      return {
        didSucceed: false,
        error: e,
      };
    }
  }
};
export {
  createUser,
  fetchClient,
  mapAuthId,
  bindShopToClient,
  bookMark,
  removeBookmark,
};
