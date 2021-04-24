import { User } from "../entity/user";
import { Client, DataInsertion } from "../models/types";
import { Connection, getRepository } from "typeorm";
import { createStripeUser } from './operations'
import { v4 as createUid } from 'uuid'

// Insert New User
const createUser = async (
  connection: Connection,
  data: Client
): Promise<DataInsertion> => {
  const client = new User();
  const {connect, customer} = await createStripeUser(data)

  client.id = createUid()
  client.authId = data.authId
  client.firstName = data.firstName;
  client.lastName = data.lastName;
  client.shop = data.shop;
  client.purchased = new Array();
  client.bookMarked = new Array();
  client.stripe = data.stripe;
  client.address = data.address;
  client.stripe = {stripe_connect: connect, stripe_cus: customer}

  const savedStatus = (await connection.manager
    .save(client)
    .then((client) => client.id)
    .catch((err) => {
      return { error: err, didSucceed: false } as DataInsertion;
    })) as DataInsertion;

  return savedStatus;
};


// Pull Client Record

const fetchClient = async (uid: string): Promise<any> => {
  const userRepo = getRepository(User);

  const user = await userRepo
    .findOne({ where: { id: uid } })
    .catch((err) => {
      console.log(err);
    })
    
    return user
};


export { createUser, fetchClient };
