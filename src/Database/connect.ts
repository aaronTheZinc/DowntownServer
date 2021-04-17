import { Connection, createConnection } from "typeorm";
import { DatabaseConnectionStatus } from "../models/types";
import { DatabaseConfig } from '../Config/config'
import { User } from '../entity/user'

class DatabaseConnection {
  databaseConnection: DatabaseConnectionStatus;
  constructor() {
    this.databaseConnection = {
      isConnect: false,
      timeStarted: 0,
      connection: undefined,
    };
  }
  create = async (): Promise<void> => {
    let retries = 5
    while (retries) {
      try {
        await createConnection({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "postgres",
          database: "downtown-db",
          synchronize: true,
          logging: true,
          entities: [User],
          migrations: [],
          subscribers: [],
          cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber",
          },
        })
        .then((connection) => {
          console.log("connection success...");
          this.databaseConnection = {
            isConnect: true,
            timeStarted: Date.now(),
            connection: connection,
          };
        })
        break;
      } catch (err) {
        console.log(err);
        retries -= 1;
        console.log(`retries left: ${retries}`);
        // wait 5 seconds
        await new Promise(res => setTimeout(res, 5000));
      }
    }
  };
}

const { databaseConnection, create } = new DatabaseConnection();

export default new DatabaseConnection();
