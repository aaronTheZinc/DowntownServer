import Stripe from "stripe";
import * as dotenv from "dotenv";
import { StripeConfig } from '../Config/config'
dotenv.config({ path: __dirname + "/.env" });
console.log('stripe secret ===>',process.env.STRIPE_SECRET! )
const stripe = new Stripe(StripeConfig.secret, {
  apiVersion: "2020-08-27",
});
export const publishableKey = process.env.STRIPE_PUBLISHABLE!;
export default stripe;
