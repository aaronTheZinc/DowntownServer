import stripe from "./stripe";
import { Client, StripeClient } from "../models/types";

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
    const connectResult = await stripe.accounts.create({
      type: "express",
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

    const { id: cus } = customerResult;
    const { id: connect } = connectResult;

    return {
      connect: cus,
      customer: connect,
    } as StripeClient;
  } catch (e) {
    return e;
  }
};

export { createUser };
