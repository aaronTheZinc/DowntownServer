import { Connection, createConnection } from "typeorm";
import express, { Application, Request, Response } from "express";
import router from "./Router/bundler";
import Database from "./Database/connect";
const app: Application = express();

const App = async () => {
  await Database.create();
  app.use("/", router);
  app.get('/', (req: Request, res: Response) => {
  })
  app.listen(5000, () => console.log("Downtown Is Listening..."));
};

App();
