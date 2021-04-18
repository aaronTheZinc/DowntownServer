import {ConnectionOptions} from "typeorm";
import path from "path";
import * as dotenv from 'dotenv'
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
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "dXUrZEcVrYqn3j7wGAYAEveJGAy4LdZ3Tk2NX6r3YyBMTbuXNVpA4G3MerXpnaLV",
  database: process.env.DB_NAME || "downtown-db",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    `src/Entitys/**/*.${isCompiled ? "js" : "ts"}`
  ],
  migrations: [
    `src/migration/**/*.${isCompiled ? "js" : "ts"}`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;
