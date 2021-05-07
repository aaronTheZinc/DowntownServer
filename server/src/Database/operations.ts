import axios from "axios";
import { Client, DatabaseAction, StripeClient } from "../models";
import { createUser } from "../stripe/index";
import { appendProductToShop } from './shop'

const url = "https://api.cloudinary.com/v1_1/dtus-us/upload";

const postImage = (stringedData: string) => {
  const config = {
    upload_preset: "downtown",
    file: stringedData,
    folder: "downtown",
  };
  axios.post(url, config);
};


const createStripeUser = async (client: Client): Promise<StripeClient> =>
  createUser(client);
 

export { createStripeUser, appendProductToShop };
