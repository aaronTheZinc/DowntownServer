import {ConnectionOptions} from "typeorm";
import { User } from '../entity/user'
import { Product } from '../entity/product'
import path from "path";
import * as dotenv from 'dotenv'
import { publishableKey } from "../stripe/stripe";
dotenv.config()

console.log({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME,
})
const isCompiled = path.extname(__filename).includes('js');
export const DatabaseConfig = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || "downtown-admin",
  password: process.env.DB_PASSWORD || "dXUrZEcVrYqn3j7wGAYAEveJGAy4LdZ3Tk2NX6r3YyBMTbuXNVpA4G3MerXpnaLV",
  database: process.env.DB_NAME || "downtown-db",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    User,
    Product
  ],
  migrations: [
    `src/migration/**/*.${isCompiled ? "js" : "ts"}`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;



export const StripeConfig = {
  secret: process.env.STRIPE_SECRET || 'sk_test_hgHDQOYRrTlk581vcW1cvNmT',
  publishableKey: process.env.STRIPE_PUBLISHABLE  || 'pk_test_51EC8ySL8Gx6rf2qzgh8aZ9SeEKhbwKM5yNzkRd05Hak5rjgn5JlUlRwnNuRBDEuAuRHTFGlhgCxQWIW1zPMH77ys004It6mfDQ'
}
