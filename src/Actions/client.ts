import { createUser, fetchClient as FetchClient } from "../Database/index";
import { Connection } from "typeorm";
import { Client } from "../models/types";
import { User } from "../entity/user";

const insertUser = async (
  connection: Connection,
  data: Client
): Promise<any> => await createUser(connection, data);

const fetchClient = async(uid: string): Promise<any> => await FetchClient(uid)

export { insertUser, fetchClient };
