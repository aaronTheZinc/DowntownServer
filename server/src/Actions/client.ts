import { createUser, fetchClient as FetchClient } from "../Database/client";
import { Connection } from "typeorm";
import { Client, DatabaseAction } from "../models/types";
import { User } from "../entity/user";

const insertUser = async (
  connection: Connection,
  data: Client
): Promise<DatabaseAction> => await createUser(connection, data);

const fetchClient = async(uid: string): Promise<DatabaseAction> => await FetchClient(uid)

export { insertUser, fetchClient };
