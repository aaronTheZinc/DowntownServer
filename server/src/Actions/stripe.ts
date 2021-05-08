import { BasicResponse } from "../models/responseTypes";
import { Client } from "../models";
import { mapAuthId } from "./client";
import { getEphimeral } from "../stripe/index";
import { fetchClient } from "./client";
const generateEphimeral = async (authId: string): Promise<BasicResponse> => {
  try {
    const uid: string = await mapAuthId(authId);
    const { data: client } = await fetchClient(uid);
    const {
      stripe: { stripe_cus },
    } = client;
    const ephim_key = await getEphimeral(stripe_cus);

    return { data: ephim_key, didSucceed: true } as BasicResponse;
  } catch (e) {
    return { didSucceed: false, err: e } as BasicResponse;
  }
};

export { generateEphimeral };
