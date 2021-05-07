import stripe from "./stripe";
import { Client, StripeClient } from "../models";
import { fetchClient } from "../Database/client";
import * as dotenv from "dotenv";

dotenv.config();

// Init Customer
const createUser = async (customer: Client): Promise<StripeClient> => {
  const { email } = customer;

  try {
    const customerResult = await stripe.customers.create({
      description: `Created @ ${Date.now()}`,
      email: email,
      name: `${customer.firstName} ${customer.lastName}`,
      metadata: {
        zipcode: customer.address.zip,
      },
    });
    const { id: cus } = customerResult;

    return {
      connect: "DEFAULT",
      customer: cus,
    } as StripeClient;
  } catch (e) {
    return e;
  }
};

// Link to your account

const linkConnectShop = async (uid: string): Promise<String> => {
  try {
    const { data:{email} } = await fetchClient(uid);

    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email: email,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://example.com/reauth",
      return_url: "https://example.com/return",
      type: "account_onboarding",
    });

    return accountLink.url;
  } catch (e) {
    throw new Error(`Stripe Error Occured: ${e}`);
  }
};

const getEphimeral = async (customer: string) => {
  const key = await stripe.ephemeralKeys.create(
    { customer: customer },
    { apiVersion: "2020-08-27" }
  );
  return key;
};

const confirmConnect = async (account: string) => {};

export { createUser, linkConnectShop, getEphimeral };
