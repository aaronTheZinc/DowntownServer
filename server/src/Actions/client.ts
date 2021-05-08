import { createUser, fetchClient as FetchClient } from "../Database/client";
import { Connection } from "typeorm";
import { Client, DatabaseAction, ClientProfile, UserMutation } from "../models";
import { getManyProducts } from "../Database/product";
import { User } from "../entity/user";
import { mapAuthId, bookMark } from "../Database/client";

const insertUser = async (
  connection: Connection,
  data: Client
): Promise<DatabaseAction> => await createUser(connection, data);

/*
!Mutates Current Book
? Gets Users Profile 
*/
const getUserProfile = async (authId: string): Promise<ClientProfile> => {
  const queryUser = await fetchClient(authId);
  const { data } = queryUser;
  const { purchased, bookMarked, firstName, lastName } = data as Client;
  const purchasedResultQuery: DatabaseAction = await getManyProducts(
    purchased!
  );
  const purchasedResult = purchasedResultQuery.data as DatabaseAction[];
  const purchasedList = purchasedResult.map((product) => product.data);

  return ({
    firstName: firstName,
    lastName: lastName,
    purchased: purchasedList,
    purchasedCount: purchased?.length,
    bookmarkedCount: bookMarked?.length,
    account404: false,
  } as unknown) as ClientProfile;
};

/*
!Mutates Current Book
? Bookmarked Feature
*/
const AppendBookMark = async (
  authId: string,
  product: string
): Promise<DatabaseAction> => {
  const uid = await mapAuthId(authId);
  const mutation: UserMutation = {
    uid: uid,
    entries: { key: "bookMarked", value: product },
  };
  try {
    return await bookMark(mutation).then(() => {
      return {
        didSucceed: true,
      } as DatabaseAction;
    });
  } catch (e) {
    return {
      didSucceed: false,
      error: e,
    };
  }
};

const fetchClient = async (authId: string): Promise<DatabaseAction> => {
  const uid = await mapAuthId(authId);
  return await FetchClient(uid);
};

export { insertUser, fetchClient, getUserProfile, mapAuthId, AppendBookMark };
