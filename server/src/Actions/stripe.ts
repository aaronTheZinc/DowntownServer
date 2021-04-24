import { BasicResponse } from "../models/responseTypes";
import { Client } from "../models/types";
import { getEphimeral } from "../stripe/index";
import { fetchClient } from "./client";
const generateEphimeral = async (uid: string): Promise<BasicResponse> => {
  try {
    const client: Client = (await fetchClient(uid)) as Client;
    const {
      stripe: { stripe_cus },
    } = client;
    const ephim_key = await getEphimeral(stripe_cus);

    return { data: ephim_key, didSucceed: true } as BasicResponse;
  } catch (e) {
      return { didSucceed: false, err: e } as BasicResponse
  }
};

export { generateEphimeral }