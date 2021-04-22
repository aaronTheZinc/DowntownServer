import { Connection, createConnection } from "typeorm";
import express, { Application, Request, Response } from "express";
import router from "./Router/bundler";
import Database from "./Database/connect";
const app: Application = express();

const App = async () => {
  await Database.create();
  app.use("/", router);
  app.listen(5001, () => console.log("Downtown Is Listening..."));
};

App();
