import Stripe from "stripe";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2020-08-27",
});
export const publishableKey = process.env.STRIPE_PUBLISHABLE!;
export default stripe;
