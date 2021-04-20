import { User } from "../entity/user";
import { Client, DataInsertion } from "../models/types";
import { Connection, getRepository } from "typeorm";
import { createStripeUser } from './operations'

const createUser = async (
  connection: Connection,
  data: Client
): Promise<DataInsertion> => {
  const client = new User();
  const stripeConfig = await createStripeUser(data)

  client.firstName = data.firstName;
  client.lastName = data.lastName;
  client.shop = data.shop;
  client.purchased = new Array();
  client.bookMarked = new Array();
  client.stripe = data.stripe;
  client.address = data.address;
  client.stripe = stripeConfig

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
