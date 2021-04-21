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
        await createConnection(DatabaseConfig)
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



export default new DatabaseConnection();
