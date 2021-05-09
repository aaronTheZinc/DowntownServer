import { BasicResponse } from "../models/responseTypes";
import { Client } from "../models";
import { mapAuthId } from "./client";
import { getEphimeral } from "../stripe/index";
import { fetchClient } from "./client";
const generateEphimeral = async (authId: string): Promise<BasicResponse> => {
  try {
    const { data } = await fetchClient(authId);
    console.log(data)
    const {
      stripe: { stripe_cus },
    } = data;
    const ephem_key = await getEphimeral(stripe_cus);

    return { data:ephem_key, didSucceed: true } as BasicResponse;
  } catch (e) {
    return { didSucceed: false, err: e } as BasicResponse;
  }
};

export { generateEphimeral };
