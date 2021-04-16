import {ConnectionOptions} from "typeorm";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "../../.env" });
const isCompiled = path.extname(__filename).includes('js');

export default {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DB_NAME || "downtown-db",
  synchronize: true,
  logging: !process.env.DB_NO_LOGS,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [
    `src/entities/**/*.${isCompiled ? "js" : "ts"}`
  ],
  migrations: [
    `src/migration/**/*.${isCompiled ? "js" : "ts"}`
  ],
  cli: {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
  },
} as ConnectionOptions;


