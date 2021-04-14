import { User } from "../entities/user";
import { Client, DataInsertion } from "../models/types";
import { Connection } from "typeorm";

const createUser = async (
  connection: Connection,
  data?: Client
): Promise<DataInsertion> => {
  const client = new User();
  client.age = "19";
  client.firstName = "Aaron";
  client.lastName = "Marsh";
  client.id = 1
  

  const savedStatus = (await connection.manager
    .save(client)
    .then((client) => client.id)
    .catch((err) => {
      return { error: err, didSucceed: false } as DataInsertion;
    })) as DataInsertion;

  return savedStatus;
};


export {createUser}