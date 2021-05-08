import { createUser, fetchClient as FetchClient } from "../Database/client";
import { Connection } from "typeorm";
import { Client, DatabaseAction, ClientProfile } from "../models";
import { getManyProducts } from "../Database/product";
import { User } from "../entity/user";
import { mapAuthId } from '../Database/client'

const insertUser = async (
  connection: Connection,
  data: Client
): Promise<DatabaseAction> => await createUser(connection, data);

const getUserProfile = async (authId: string): Promise<ClientProfile> => {
  const uuid = await mapAuthId(authId);
  const queryUser = await fetchClient(uuid);
  const { data } = queryUser.data;
  const { purchased, bookMarked } = data as Client;
  const purchasedResult = await getManyProducts(purchased!);

  return ({
    purchased: purchasedResult,
    purchasedCount: purchased?.length,
    bookmarkedCount: bookMarked?.length,
    account404: false,
  } as unknown) as ClientProfile;
};

const fetchClient = async (authId: string): Promise<DatabaseAction> => {
  const uid = await mapAuthId(authId)
  return await FetchClient(uid);
}
  

export { insertUser, fetchClient, getUserProfile, mapAuthId };
