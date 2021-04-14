import { Connection, createConnection } from "typeorm";
import ormConfig from "../ormconfig";
import { DatabaseConnection } from "../models/responseTypes";
import { DatabaseConnectionStatus } from "../models/types";

export let Database = {
  isConnect: false,
  timeStarted: 0,
} as DatabaseConnectionStatus;

export const createDatabaseConnection = async (): Promise<DatabaseConnection> => {
  const connectionAttempt = (await createConnection(ormConfig)
    .then((connection) => {
      Database.isConnect = true;
      Database.timeStarted = Date.now();
      return { connection: connection } as DatabaseConnection;
    })
    .catch((err) => {
      return { error: err } as DatabaseConnection;
    })) as DatabaseConnection;

  if (connectionAttempt.connection) {
    return { connection: connectionAttempt.connection };
  } else {
    return { error: connectionAttempt.error };
  }
};
