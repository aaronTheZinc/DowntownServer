import { User } from "../entities/user";
import { Client, DataInsertion } from "../models/types";
import { Connection, getRepository } from "typeorm";

const createUser = async (
  connection: Connection,
  data: Client
): Promise<DataInsertion> => {
  const client = new User();

  client.firstName = data.firstName;
  client.lastName = data.lastName;
  client.shop = data.shop;
  client.purchased = new Array();
  client.bookMarked = new Array();
  client.stripe = data.stripe;
  client.address = data.address;

  const savedStatus = (await connection.manager
    .save(client)
    .then((client) => client.id)
    .catch((err) => {
      return { error: err, didSucceed: false } as DataInsertion;
    })) as DataInsertion;

  return savedStatus;
};

const fetchClient = async (uid: string): Promise<any> => {
  const userRepo = getRepository(User);

  const user = await userRepo
    .findOne({ where: { id: uid } })
    .catch((err) => {
      console.log(err);
    });

    return user
};



export { createUser, fetchClient };
