import { Connection, createConnection } from "typeorm";
import ormConfig from "../ormconfig";
import { DatabaseConnectionStatus } from "../models/types";

class DatabaseConnection {
  databaseConnection: DatabaseConnectionStatus;
  constructor() {
    this.databaseConnection = {
      isConnect: false,
      timeStarted: 0,
      connection: undefined,
    };
  }
  create = async (): Promise<any> => {

    await createConnection(ormConfig)
      .then((connection) => {
        console.log('connection success...')
        this.databaseConnection = {
          isConnect: true,
          timeStarted: Date.now(),
          connection: connection,
        };
      })
      .catch((err) => {
        console.log(err)
        return { error: err };
      });


   
  };
}

const { databaseConnection, create } = new DatabaseConnection();

export default new DatabaseConnection();

