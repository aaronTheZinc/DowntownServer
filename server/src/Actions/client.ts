import { createUser, fetchClient as FetchClient } from "../Database/client";
import { Connection } from "typeorm";
import { Client, DataInsertion } from "../models/types";
import { User } from "../entity/user";

const insertUser = async (
  connection: Connection,
  data: Client
): Promise<DataInsertion> => await createUser(connection, data);

const fetchClient = async(uid: string): Promise<any> => await FetchClient(uid)

export { insertUser, fetchClient };
