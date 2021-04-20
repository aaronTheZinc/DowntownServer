import { uploadMany } from "../imagekit/index";
import axios from "axios";
import { Client, StripeClient } from "../models/types";
import { createUser } from "../stripe/index";

const url = "https://api.cloudinary.com/v1_1/dtus-us/upload";

const postImage = (stringedData: string) => {
  const config = {
    upload_preset: "downtown",
    file: stringedData,
    folder: "downtown",
  };
  axios.post(url, config);
};

const pushNewImages = (images: string) => uploadMany([]);

const createStripeUser = async (client: Client): Promise<StripeClient> =>
  createUser(client);

export { pushNewImages, createStripeUser };
