import { Connection, createConnection } from "typeorm";
import express, { Application, Request, Response } from "express";
import { insertUser } from "./Actions/databaseActions";
import router from "./Router/bundler";
import ormconfig from "./ormconfig";
import {
  createDatabaseConnection as connect,
  Database,
} from "./Database/connect";
const app: Application = express();

const App = async () => {
  await connect();
  app.use("/", router);

  app.listen(5000, () => console.log('Downtown Is Listening...'));
};

App();
