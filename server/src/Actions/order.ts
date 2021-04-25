import { DatabaseAction } from "../models/responseTypes";
import { fetchClient } from "./client";
import { Client } from '../models/types'
// Purchase Everything in Shgopping Cart
const resolveCart = async (uid: string): Promise<DatabaseAction> => {
  const user = await fetchClient(uid);

  const { data, didSucceed, error } = user;
  if (didSucceed) {
      const { bookedMarked } = data as Client
  } else {
    return error;
  }
};
